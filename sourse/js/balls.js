function ballInimate(element = "body", path = "dark") {
  let animateBlocks = document.querySelectorAll(element);
  if (!animateBlocks && document.body.classList.contains("start-page")) return;
  for (const animateBlock of animateBlocks) {
    // Извлечение строки JSON из localStorage и преобразование обратно в массив
    let storeName = `${element}myArray`;
    let storedArray = JSON.parse(localStorage.getItem(storeName));

    if (!storedArray || storedArray.length === 0) {
      storedArray = [1, 2, 3];
    }

    function getRandomIndex(arr) {
      return Math.floor(Math.random() * arr.length);
    }

    let randomIndex = getRandomIndex(storedArray);

    let randomElement = storedArray.splice(randomIndex, 1)[0];

    localStorage.setItem(storeName, JSON.stringify(storedArray));

    // const setVideo = (index) => {
    const video = document.createElement("video");
    video.classList.add("bg-video-main");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsinline = false;
    video.controls = true;
    // <source src="video/bg/${path}/desktop/2-1-${randomElement}.webm" type="video/webm" media="(min-width:768px)"/>
    video.innerHTML = `
        <source src="video/slide_01/video_desktop.mp4" />`;
    const videoWrap = document.createElement("div");
    videoWrap.classList.add("bg-video-main-wrap");
    videoWrap.appendChild(video);
    // return videoWrap.outerHTML;
    animateBlock.prepend(videoWrap);
    videoWrap.insertAdjacentHTML(
      "afterbegin",
      video.querySelector("source").src
    );
    video.addEventListener("loadeddata", function () {
      // Видео загружено, теперь можно начать воспроизведение
      video.play();
    });
  }
}
