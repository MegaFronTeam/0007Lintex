
function ballInimate(element = ".block-with-animante") {
  let animateBlocks = document.querySelectorAll(element);
  if (!animateBlocks) return;
  for (const animateBlock of animateBlocks) {
    const balls = [
      {src:'img/ball-update-1.png', width:1599 , height:1130}, 
      {src:'img/ball-update-4.png', width: 999, height:812}, 
      {src:'img/ball-update-2.png', width: 1160, height: 1105}, 
      {src:'img/ball-update-3.png', width:1929, height: 1514}, 
      {src:'img/ball-update-5.png', width:1360 , height:1870}, 
      {src:'img/ball-update-6.png', width: 990 , height:780}
    ]
    let mainHeight = window.innerHeight
    let parent = document.querySelector(".sContent") || document.querySelector(".section-animate")
    if (animateBlock.parentElement == parent) {
      mainHeight = parent.offsetHeight
    }
    let count = Math.ceil(Math.abs(Math.random() + 1) * 3);

    for (let index = 0; index < count; index++) {
      const randomIndex = Math.floor(Math.random() * balls.length);
      let div = document.createElement("div");
      div.classList.add("animate-ball-item")
      div.classList.add("animate-ball-item--" + index)
      div.style.setProperty('--random', (Math.random()))
      if(index  < 2 && !animateBlock.parentElement.classList.contains('section')) {

        div.style.top = `calc(${Math.random() * -100}px - ${balls[randomIndex].width / 32  + 'rem'})`;
      }
      else{
        // div.style.bottom = `calc(${Math.random() * -100}px - ${balls[randomIndex].width / 32  + 'rem'})`;
        div.style.top = `${Math.random() * 100}%`;
      }
      if ((Math.random() * 2 - 1) > 0) {
        div.classList.add("animate-ball-item--start")
      }
      else {
        div.classList.add("animate-ball-item--end")

      }
      let img = document.createElement("img");
      img.src = balls[randomIndex].src;
      div.prepend(img);
      animateBlock.prepend(div);

      img.style.width = balls[randomIndex].width / 20  + 'rem';
      img.style.height = balls[randomIndex].height / 20  + 'rem';
    }
  }
}