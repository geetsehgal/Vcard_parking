/* ==========================================================
   EDIT YOUR DETAILS HERE
   ========================================================== */

const PROFILE = {
  name: "Geet Sehgal",
  phone: "+91-7838338058",
  carNumber: "DL 10CY 4640",
  bikeNumber: "DL 8S DJ0745",
  bio1: "Scan works for parking issues, questions or just saying hi!",
  bio2: "If I've parked awkwardly or you need me, just tap Call.",
  photo: "photo.jpg",
  email: "geetsehgal@gmail.com"
};

/* ========================================================== */

(function render() {
  document.title = PROFILE.name;

  document.getElementById("name").textContent = PROFILE.name;
  document.getElementById("bio1").textContent = PROFILE.bio1;
  document.getElementById("bio2").textContent = PROFILE.bio2;
  document.getElementById("carNumber").textContent = PROFILE.carNumber;
  document.getElementById("bikeNumber").textContent = PROFILE.bikeNumber;

  const photo = document.getElementById("photo");
  if (photo) {
    photo.src = PROFILE.photo;
  }

  const callBtn = document.getElementById("callBtn");
  if (callBtn) {
    callBtn.href = `tel:${PROFILE.phone}`;
  }

  const initials = PROFILE.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");

  const initialsElement = document.getElementById("initials");
  if (initialsElement) {
    initialsElement.textContent = initials || "?";
  }
})();

function buildVCard() {

  const parts = PROFILE.name.trim().split(/\s+/);

  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${PROFILE.name}`,
    `N:${lastName};${firstName};;;`,
    `TEL;TYPE=CELL:${PROFILE.phone}`
  ];

  if (PROFILE.email) {
    lines.push(`EMAIL:${PROFILE.email}`);
  }

  lines.push(
    `NOTE:Car ${PROFILE.carNumber} / Bike ${PROFILE.bikeNumber}`
  );

  lines.push("END:VCARD");

  return lines.join("\r\n");
}

async function downloadVCard() {

  let vcard = buildVCard();

  try {

    const res = await fetch(PROFILE.photo);

    if (res.ok) {

      const blob = await res.blob();

      const base64 = await new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blob);

      });

      const type =
        blob.type.includes("png")
          ? "PNG"
          : "JPEG";

      vcard = vcard.replace(
        "END:VCARD",
        `PHOTO;ENCODING=BASE64;TYPE=${type}:${base64}\r\nEND:VCARD`
      );
    }

  } catch (err) {
    console.log("Photo not added to vCard:", err);
  }

  const blob = new Blob(
    [vcard],
    { type: "text/vcard;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = PROFILE.name.replace(/\s+/g, "_") + ".vcf";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", () => {

  const vcardBtn = document.getElementById("vcardBtn");

  if (vcardBtn) {
    vcardBtn.addEventListener("click", downloadVCard);
  }

});
