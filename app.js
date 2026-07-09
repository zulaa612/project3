const video = document.getElementById("webcam");
const promptOverlay = document.getElementById("prompOverlay");
const videoPanel = document.getElementById("videoPanel");
const shutterButton = document.querySelector(".shutterButton");
const liveBox = document.querySelector(".liveBox");
const photosBox = document.querySelector(".photosBox");
const strip = document.querySelector(".thumbNailstrip");
const dowmloadArea = document.querySelector(".download");
const cameraIcon = document.querySelector("bameraButton");
const livePreview = document.querySelector(".;ivePreview");


let mediaStream = null; 
let photos = [];

downloadArea.style.cursor = "pointer";

video.style.display = "none";
liveBox.style.display = "none";
photosBox.style.display = "none";
cameraButton.style.display = "flex";
livePreview.style.display = "block";

