
function ballInimate(element=".block-with-animante"){
  let animateBlocks = document.querySelectorAll(element);
  if(!animateBlocks) return;
  for (const animateBlock of animateBlocks) { 
    const balls = ['img/shar-1.png', 'img/shar-2.png', 'img/shar-3.png', 'img/shar-4.png', 'img/shar-5.png', 'img/shar-6.png', 'img/shar-7.png']

    let count = Math.ceil(animateBlock.offsetHeight / window.innerHeight * Math.abs(Math.random() + 1) *4);

    for (let index = 0; index < count; index++) { 
      const randomIndex = Math.floor(Math.random() * balls.length);
      let div = document.createElement("div");
      div.classList.add("animate-ball-item")
      div.classList.add("animate-ball-item--" + index)
      div.style.setProperty('--random', (Math.random()))
      div.style.top = `${Math.random() * 120}%`;
      if(randomIndex % 2 == 0) {
        div.classList.add("animate-ball-item--start" )
      }
      else{
        div.classList.add("animate-ball-item--end")

      }
      let img = document.createElement("img");
      img.src = balls[randomIndex];
      div.prepend(img)
      animateBlock.prepend(div)
    }
  }
}