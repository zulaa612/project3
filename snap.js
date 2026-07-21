console.log("snap.js loaded");
const video = document.getElementById("webcam");
const allowBtn = document.getElementById("allowBtn");
console.log(allowBtn);
const overlay = document.getElementById("promptOverlay");
const live = document.getElementById("liveBox");
const shutter = document.getElementById("shutterBtn");
const strip = document.getElementById("thumbStrip");
const photos = document.getElementById("photosBox");
const download = document.getElementById("downloadAll");

let images = [];

// Camera
allowBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.style.display = "block";
  overlay.style.display = "none";
  live.style.display = "flex";
};

// Snap photo
shutter.onclick = () => {
  if (!video.srcObject) return;

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const img = canvas.toDataURL("image/png");
  images.push(img);

  photos.textContent = `${images.length} photos`;

  const box = document.createElement("div");
  box.className = "singleThumbnail";

  const picture = document.createElement("img");
  picture.src = img;

  box.appendChild(picture);
  strip.appendChild(box);
};

// Download all
download.onclick = () => {
  images.forEach((img, i) => {
    const a = document.createElement("a");
    a.href = img;
    a.download = `photo${i + 1}.png`;
    a.click();
  });
};
