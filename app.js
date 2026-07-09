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