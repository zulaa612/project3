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
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  }); /*browser өөрийн зөвшөөрлийн цонхыг харуулна.*/
  video.srcObject = stream; /*камерыг HTML <video> tag2тай холбоно*/
  video.style.display =
    "block"; /*css дээр video-г display none болгон нуусань харин зөвшөөрөл авсан болохоор video-г харуулна*/
  overlay.style.display =
    "none"; /*камер гарч ирэхээс өмнөх зөвшөөрлийн container-ийг нууна*/
  live.style.display =
    "flex"; /*live box дотор байгаа LIVE блокыг дэлгэцэд харуулна.*/
};

//Зураг авах товчлуур
shutter.onclick = () => {
  /*shutter буюу зураг дарах товч дарахад ажиллах функц*/
  if (!video.srcObject) return; /*хэрэв камер холбогдоогүй бол функц зогсоно.*/

  const canvas =
    document.createElement("canvas"); /*харагдахгүй шинэ элемент үүсгэх*/
  canvas.width =
    video.videoWidth; /*pixel resolution авсан зургийг камерын хэмжээтэй тааруулан хадгалах*/
  canvas.height = video.videoHeight; /*pixel resolution*/

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0); /*товч дарах үеийн зургийг авах*/

  const img =
    canvas.toDataURL(
      "image/png",
    ); /*авсан live дүрсийг PNG зураг болгох(компьютер ойлгох хэлд хэрвүүлэх)*/
  images.push(img); /*img хувьсагчид хадгалах */

  photos.textContent = `${images.length} photos`; /*авсан зургийн тоог шинэчлэх*/

  const box =
    document.createElement("div"); /*зураг хадгалах жижиг блок үүсгэнэ*/
  box.className = "singleThumbnail";

  const picture =
    document.createElement("img"); /*img tag үүсгэн авсан зургийг хадгална*/
  picture.src = img; /*img хувьсагчруу оруулна */

  box.appendChild(picture); /*авсан зургийг жижиг блокд нэмнэ*/
  strip.appendChild(box); /*зурагнуудыг эгнүүлэн доор байрлуулна*/
};

//Авсан зурагнуудыг бүгдийг нь татаж авах
download.onclick = () => {
  /*downloadAll товчлуур дарахад функц ажиллана*/
  images.forEach((img, i) => {
    /*images array-д хадгалагдсан бүх зургууд*/
    const a = document.createElement("a"); /*харагдахгүй линк үүсгэх*/
    a.href = img; /*линкийн зам*/
    a.download = `photo${i + 1}.png`; /*file-ийг татаж авах*/
    a.click();
  });
};
