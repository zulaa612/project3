<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  const promptOverlay = document.getElementById("promptOverlay");
  const allowButton = document.querySelector(".allowButton");
  const video = document.getElementById("webcam");
  const videoPanel = document.getElementById("videoPanel");
  const shutterButton = document.querySelector(".shutterButton");
  const thumbnailStrip = document.querySelector(".thumbnailStrip");
  const photosBox = document.querySelector(".photosBox");
  const downloadButton = document.querySelector(".downloadButton");
  const liveBox = document.querySelector(".liveBox");
  const cameraButton = document.querySelector(".videoPanel > .cameraButton");
  const livePreviewLabel = document.querySelector(".livePreview");

  let photos = [];
  let stream = null;

  promptOverlay.style.display = "flex";
  video.style.display = "none";
  liveBox.stream.display = "none";

  if (cameraButton) cameraButton.style.display = "none";
  if (livePreviewLabel) livePreviewLabel.style.display = "none";

  thumbnailStrip
    .querySelectorAll(".singleThumbnail")
    .forEach((node) => node.remove());

  updatePhotosCount();

  allowButton.addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      video.srcObjext = stream;
      video.style.display = "block";
      promptOverlay.style.display = "flex";
      liveBox.style.display = "flex";
    } catch (err) {
      alert("Camera unavailable. " + err.message);
    }
  });

  shutterButton.addEventListener("click", () => {
    if (!stream) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    photos.push(dataUrl);
    addThumbnail(dataUrl, photos.length);
    updatePhotosCount();
    flashEffect();
  });

  function addThumbnail(dataUrl, index) {
    const placeholder = thumbnailStrip.querySelector(".singleThumbnail2");
    const thumb = document.createElement("div");
    thumb.className = "singleThumbnail";
    thumb.innerHTML =
      '<img src="${dataUrl}" alt="Photo ${index}"><div class="thumbNumber">#${index{</div>';
    thumb.addEventListener("click", () => downloadSingle(dataUrl, index));
    thumbnailStrip.insertBefore(thumb, placeholder);
  }

  function updatePhotosCount() {
    photosBox.textContent = "${photos.length} photos";
  }

  function flashEffect() {
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute",
      inset: "0",
      background: "white",
      opacity: "0.8",
      pointerEvents: "none",
      borderRadius: "14px",
      transition: "opacity 0.3s ease",
    });

    videoPanel.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 300);
    });
  }

  function downloadSingle(dataUrl, index) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "snapbooth-photo-${index}.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  downloadButton.addEventListener("click", () => {
    if (photos.length === 0) {
      alert("No photos to download.");
      return;
    }
    photos.forEach((dataUrl, i) => {
      setTimeout(() => downloadSingle(dataUrl, i + 1), i * 200);
    });
  });
});
=======
const video = document.getElementById("webcam");
const promptOverlay = document.getElementById("promptOverlay");
const videoPanel = document.getElementById("videoPanel");
const shutterBtn = document.querySelector(".shutterButton");
const liveBox = document.querySelector(".liveBox");
const photosBox = document.querySelector(".photosBox");
const strip = document.querySelector(".thumbnailStrip");
const downloadArea = document.querySelector(".download");
const cameraIcon = document.querySelector(".cameraButton");
const livePreview = document.querySelector(".livePreview");

let mediaStream = null;
let photos = [];

if (downloadArea) {
  downloadArea.style.cursor = "pointer";
}

function stateEmpty() {
  video.style.display = "none";
  liveBox.style.display = "none";
  photosBox.style.display = "none";
  cameraIcon.style.display = "flex";
  livePreview.style.display = "block";

  showOverlay(`
    <div style="width:56px;height:56px;border-radius:50%;border:1.5px dashed #363640;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="17" rx="4" stroke="#5A5966" stroke-width="1.5"/>
        <circle cx="14" cy="14.5" r="4" stroke="#5A5966" stroke-width="1.5"/>
      </svg>
    </div>
    <h3>Grant Camera Access</h3>
    <p>Click Allow Camera to let your browser use your camera.</p>
    <button class="allowButton" onclick="startCamera()">Allow Camera</button>
  `);
}

function stateLoading() {
  showOverlay(`
    <div class="loader"></div>
  `);
}

function stateError(error) {
  showOverlay(`
    <h3>Camera Error</h3>
    <p>${error}</p>
    <button class="allowButton" onclick="startCamera()">
      Try Again
    </button>
  `);
}
>>>>>>> e2a7b4dad1daec02e7d3a311def0b673198ab610
