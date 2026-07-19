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
