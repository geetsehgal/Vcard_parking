# Car ID Card

A tiny, free, static webpage you scan-to-contact. Put a QR code on your car's
front and back glass; scanning it opens this page with your photo, vehicle
numbers, a two-line bio, a **Call Me** button, and a **Save Contact**
(vCard) button.

No backend, no database, no cost. It's just three files hosted on GitHub Pages.

## 1. Customize your details

Open `script.js` and edit the `PROFILE` object at the top:

```js
const PROFILE = {
  name: "Your Name",
  phone: "+910000000000",   // include country code, no spaces
  carNumber: "KA 00 XX 0000",
  bikeNumber: "KA 00 XX 0000",
  bio1: "Line one about you goes here.",
  bio2: "Line two about you goes here.",
  photo: "photo.jpg",
  email: "",                // optional
};
```

Add a square photo of yourself named `photo.jpg` in this same folder
(next to `index.html`). If you skip this, the page automatically shows
your initials instead — nothing breaks.

Don't have a bike, or want a different second line item? Just edit
`index.html` directly — the two "plate" rows and their labels (`CAR` /
`BIKE`) are plain HTML you can rename or duplicate.

## 2. Put it on GitHub

```bash
cd car-id-card
git init
git add .
git commit -m "My scan-to-contact card"
gh repo create car-id-card --public --source=. --push
```

(No `gh` CLI? Create an empty public repo on github.com named e.g.
`car-id-card`, then `git remote add origin <your-repo-url>`,
`git branch -M main`, `git push -u origin main`.)

## 3. Turn on GitHub Pages (free hosting)

1. On your repo, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~1 minute. Your live URL will be:
   `https://<your-github-username>.github.io/<repo-name>/`

## 4. Generate your permanent QR code

Visit `https://<your-github-username>.github.io/<repo-name>/qr.html`
on the live site. It auto-fills your live URL, shows a live QR preview,
and gives you a **Download QR PNG** button (powered by the free
[api.qrserver.com](https://goqr.me/api/) QR service — no account needed).

Because the QR code just encodes your page's URL, it stays valid
**forever** as long as the GitHub repo and Pages stay up — you can keep
editing `script.js` any time (new phone number, new car) without ever
reprinting the code.

## 5. Print and stick it on

- Print the PNG at roughly 4–5 cm square, ideally on sticker paper.
- **Laminate it** (or use a clear adhesive sticker pouch) before sticking
  it on the glass — this is what makes it survive sun, rain, and car washes.
- Test-scan it with your own phone camera before you stick it down for good.

## Files

| File         | Purpose                                              |
|--------------|-------------------------------------------------------|
| `index.html` | The profile page people land on after scanning        |
| `style.css`  | All styling                                            |
| `script.js`  | Your editable details + Save Contact (vCard) logic     |
| `qr.html`    | One-time helper to generate & download your QR code    |
| `photo.jpg`  | Your photo (add this yourself, not included)           |

## Privacy note

This page is public on the internet to anyone who has (or guesses) the
link — that's what makes scanning work without an app. Only put
information on it you're comfortable strangers seeing (most people use
just a first name, phone number, and vehicle numbers).
