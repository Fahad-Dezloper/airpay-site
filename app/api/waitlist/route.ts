import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Takes an email address for the "be the first to know" list.
 *
 * Where it is kept is a setting, not a decision made here:
 *
 *  - WAITLIST_WEBHOOK_URL set: the address is POSTed there as JSON (`{ email, at, source }`),
 *    which is how it reaches a sheet, a form tool or a mailing list.
 *  - Not set, and not in production: it is appended to `.data/waitlist.jsonl` in this folder,
 *    so the form can be tried on a laptop.
 *  - Not set, in production: refused with 503. A host's disk is thrown away between runs, and
 *    saying "you are on the list" while keeping nothing would be a lie.
 */
export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: "bad_email" }, { status: 400 });
  }
  const entry = { email, at: new Date().toISOString(), source: "landing" };

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) return Response.json({ error: "not_saved" }, { status: 502 });
      return Response.json({ ok: true });
    } catch {
      return Response.json({ error: "not_saved" }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify(entry) + "\n", "utf8");
  return Response.json({ ok: true });
}
