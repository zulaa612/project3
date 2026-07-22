/*Bunch of DOM elements 
DOM(Document Object Model) гэдэг нь HTML дээрх "tag"-ийг авч мод хэлбэртэй бүтэц болгон задалдаг Javаscript-ийн объект */
const video = document.getElementById("webcam");
const allowBtn = document.getElementById("allowBtn");
console.log(allowBtn);
const overlay = document.getElementById("promptOverlay");
const live = document.getElementById("liveBox");
const shutter = document.getElementById("shutterBtn");
const strip = document.getElementById("thumbStrip");
const photos = document.getElementById("photosBox");
const download = document.getElementById("downloadAll");

let images = []; /* Авсан зурагнууд array-д хадгалагдана*/
/* Камер ашиглах зөвшөөрөл авах товчлуур*/
allowBtn.onclick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); /*browser өөрийн зөвшөөрлийн цонхыг харуулна.*/
    video.srcObject = stream; /*камерыг HTML <video> tag2тай холбоно*/
    video.style.display = "block"; /*css дээр video-г display none болгон нуусань харин зөвшөөрөл авсан болохоор video-г харуулна*/
    overlay.style.display = "none"; /*камер гарч ирэхээс өмнөх зөвшөөрлийн container-ийг нууна*/
    live.style.display = "flex"; /*live box дотор байгаа элементүүдийг эгнүүлэн байрлуулна.*/
  } catch (err) {
    console.error(" No permission to use camera.", err); /*камерын зөвшөөрөл өгөөгүй тохиолдолд error заана*/
  }
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
