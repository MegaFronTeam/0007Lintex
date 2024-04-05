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
    // const setVideo = (index) => {
    const video = document.createElement("video");
    video.classList.add("bg-video-main");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsinline = true;
    // video.controls = true;
    // <source src="video/bg/${path}/desktop/2-1-${randomElement}.webm" type="video/webm" media="(min-width:768px)"/>
    video.innerHTML = `
        <source src="" />`;
    const videoWrap = document.createElement("div");
    videoWrap.classList.add("bg-video-main-wrap");
    videoWrap.appendChild(video);
    // return videoWrap.outerHTML;
    animateBlock.prepend(videoWrap);
    video.load();
    fetchVideoAndPlay();

    function fetchVideoAndPlay() {
      fetch("video/slide_01/video_desktop.mp4")
        .then((response) => response.blob())
        .then((blob) => {
          video.srcObject = blob;
          return video.play();
        })
        .then((_) => {
          // Video playback started ;)
        })
        .catch((e) => {
          // Video playback failed ;(
        });
    }
    // return `
    //   <div class="bg-video-main-wrap">
    //     <video class="bg-video-main" autoplay loop muted playsinline>
    //       <source src="video/slide_01/video_desktop.mp4" type="video/webm"/>
    //     </video>
    //   </div`;

    // <source src="video/bg/${path}/desktop/2-1-${index}.webm" type="video/webm" media="(min-width:768px)"/>
    //     <source src="video/bg/${path}/mobile/2-1-${index}.webm" type="video/webm"/>
    // };
    // console.log(randomElement);
    // animateBlock.insertAdjacentHTML("afterbegin", setVideo(randomElement));
  }
}
