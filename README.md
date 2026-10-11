# AirPay website

The landing page for [AirPay](https://github.com/Fahad-Dezloper/AirPay), served at https://airpayy.com.

Next.js (App Router) and Tailwind CSS. The page is in `app/page.tsx`, the brand guidelines in
`app/brand/page.tsx`, and shared pieces in `components/`.

## Run it

```bash
bun install
bun --bun next dev -p 3111     # http://localhost:3111
```

## Settings

All optional. Set them in the host's environment settings.

| Name | What it does |
|---|---|
| `WAITLIST_WEBHOOK_URL` | Where early-access emails are sent, as a JSON POST of `{ email, at, source }`. Without it the live site refuses sign-ups instead of pretending to save them. |
| `NEXT_PUBLIC_APP_URL` | Where "Get the app" goes. Defaults to the newest APK on the app's GitHub releases. |
| `NEXT_PUBLIC_SITE_URL` | The site's own address, for link previews. Defaults to https://airpayy.com. |
| `AIRPAY_SERVER_URL` | The AirPay server, to show the live count of services. Without it a counted figure is used. |
