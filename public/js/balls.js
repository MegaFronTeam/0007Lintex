
function ballInimate(element = ".block-with-animante") {
  let animateBlocks = document.querySelectorAll(element);
  if (!animateBlocks) return;
  for (const animateBlock of animateBlocks) {
    const balls = [
      {src:'img/shar-1.png', width:1165 , height:1042}, 
      {src:'img/shar-2.png', width: 1090, height: 981}, 
      {src:'img/shar-3.png', width:1090, height: 981}, 
      {src:'img/shar-4.png', width: 985, height:934}, 
      {src:'img/shar-5.png', width:1237 , height:1186}, 
      {src:'img/shar-6.png', width: 1929 , height:1513}, 
      {src:'img/shar-7.png', width: 1876, height:1526}
    ]
    let mainHeight = window.innerHeight
    let parent = document.querySelector(".sContent") || document.querySelector(".section-animate")
    if (animateBlock.parentElement == parent) {
      mainHeight = parent.offsetHeight
    }
    let count = Math.ceil(animateBlock.offsetHeight / mainHeight * Math.abs(Math.random() + 1) * 3);

    for (let index = 0; index < count; index++) {
      const randomIndex = Math.floor(Math.random() * balls.length);
      let div = document.createElement("div");
      div.classList.add("animate-ball-item")
      div.classList.add("animate-ball-item--" + index)
      div.style.setProperty('--random', (Math.random()))
      if(index  < 3 && !animateBlock.parentElement.classList.contains('section')) {

        div.style.top = `calc(${Math.random() * -100}px - ${balls[randomIndex].width / 32  + 'rem'})`;
      }
      else{
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

      img.style.width = balls[randomIndex].width / 16  + 'rem';
      img.style.height = balls[randomIndex].height / 16  + 'rem';
    }
  }
}