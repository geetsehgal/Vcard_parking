=========================================================
   EDIT YOUR DETAILS HERE — this is the only section you need
   to touch to make this your own card.
   ============================================================ */
const PROFILE = {
  name: "Geet Sehgal",
  phone: "+91-7838338058",     // include country code, no spaces, used for the Call button + vCard
  carNumber: "DL 10CY 4640",
  bikeNumber: "DL 8S DJ0745",
  bio1: "Scan works for parking issues, questi9ns or just saying hi!",
  bio2: "If I've parked awkwardly or you need me, just tap Call.",
  photo: "photo.jpg",         // put a square photo with this filename next to index.html
  email: "geetsehgal@gmail.com",                  // optional, leave blank to skip in vCard
};
/* ============================================================ */

(function render() {
  document.title = PROFILE.name;
  document.getElementById("name").textContent = PROFILE.name;
  document.getElementById("bio1").textContent = PROFILE.bio1;
  document.getElementById("bio2").textContent = PROFILE.bio2;
  document.getElementById("carNumber").textContent = PROFILE.carNumber;
  document.getElementById("bikeNumber").textContent = PROFILE.bikeNumber;
  document.getElementById("photo").src = PROFILE.photo;

  const callBtn = document.getElementById("callBtn");
  callBtn.href = "tel:" + PROFILE.phone;

  const initials = PROFILE.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");
  document.getElementById("initials").textContent = initials || "?";
})();

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.name}`,
    `N:${PROFILE.name};;;;`,
    `TEL;TYPE=CELL:${PROFILE.phone}`,
  ];
  if (PROFILE.email) lines.push(`EMAIL:${PROFILE.email}`);
  lines.push(`NOTE:Car ${PROFILE.carNumber} / Bike ${PROFILE.bikeNumber}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

async function downloadVCard() {
  let vcard = buildVCard();

  // Try to embed the photo in the vCard too, so it's saved along with the contact.
  try {
    const res = await fetch(PROFILE.photo);
    if (res.ok) {
      const blob = await res.blob();
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const type = blob.type.includes("png") ? "PNG" : "JPEG";
      vcard = vcard.replace(
        "END:VCARD",
        `PHOTO;ENCODING=b;TYPE=${type}:${base64}\r\nEND:VCARD`
      );
    }
  } catch (e) {
    // No photo available — that's fine, the vCard still works without it.
  }

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = PROFILE.name.replace(/\s+/g, "_") + ".vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("vcardBtn").addEventListener("click", downloadVCard);
