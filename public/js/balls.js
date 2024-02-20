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

    const setVideo = (index) => {
      return `<div class="bg-video-main-wrap"><video class="bg-video-main" autoplay loop muted playsinline>
        <source src="video/bg/${path}/desktop/2-1-${index}.webm" type="video/webm" media="(min-width:768px)"/>
        <source src="video/bg/${path}/desktop/2-1-${index}.webm" type="video/webm"/>
      </video></div`;
    };
    console.log(randomElement);
    animateBlock.insertAdjacentHTML("afterbegin", setVideo(randomElement));
  }
}
