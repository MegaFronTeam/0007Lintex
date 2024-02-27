'use strict';

function eventHandler() {
  if (document.querySelector('.sMainSlider')) {
    function slider() {
      const slider = document.querySelector('.sMainSlider__slider-text');
      if (slider) {
        const list = slider.querySelector('.sMainSlider__slider-text .swiper-wrapper');
        const slides = list.querySelectorAll('.sMainSlider__slide');
        const btnNext = document.querySelector('.slider-control__arrow--next');
        // const btnPrev = document.querySelector('.sMainSlider__slider-arrow--prev');

        let interval = 20000;
        let timer;
        let progress = 0;
        let coordinateDiff = 0;
        let startCoordinate = 0;
        if (window.matchMedia('(max-width: 767px)').matches) {
          interval = 7000;
        }

        slides.forEach((element, index) => {
          if (index == 0) {
            element.classList.add('active-slide');
          }
          element.dataset.index = index;
        });
        function getSlidesWIdth() {
          return slider.offsetWidth + 'px';
        }
        AOS.init({
          disable: function () {
            var maxWidth = 767.98;
            return window.innerWidth < maxWidth;
          },
        });
        window.addEventListener('resize', getSlidesWIdth);
        getSlidesWIdth();
        function moveSlider(index = 1, clickedFlag = false) {
          let currentIndex = document.querySelector('.sMainSlider__slide.active-slide').dataset
            .index;
          let length = slides.length;
          resetProgress();
          document
            .querySelector(`.sMainSlider__slide.active-slide`)
            .classList.remove('active-slide');
          document.querySelector(`.slider-control__bullet.active`).classList.remove('active');
          function setTranslate(x = 0) {
            let mainSlider = document.querySelector('.sMainSlider__slider-text--js');
            let contentSlides = document.querySelectorAll('.sMainSlider__slide');
            // let contentArr = document.querySelectorAll('[data-aos="fade-up"]');

            // list.style.setProperty('--change', `${-100 * x}%`);
            // mainSlider.style.transform = `scale(0.5) `;
            mainSlider.style.setProperty('--slideScale', 0.5);
            document.querySelector('.slider-control__arrow--next').classList.add('disabled');
            document.querySelector('.slider-control__count').innerHTML = `${x + 1}/${
              slides.length
            }`;
            let videos = document.querySelectorAll('.sMainSlider__slide video');
            videos.forEach((video) => {
              if (!video.closest('.active-slide')) {
                video.play();
              }
            });
            contentSlides.forEach((el) => {
              if (el.dataset.index == x) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove('aos-animate'),
                );
              }
              if (el.dataset.index == x + 1) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove('aos-animate'),
                );
              }
              if (el.dataset.index == x - 2) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove('aos-animate'),
                );
              }
              if (x == 0) {
                if (el.dataset.index != 4) {
                  el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                    item.classList.remove('aos-animate'),
                  );
                }
              }
            });
            setTimeout(function () {
              list.style.setProperty('--translateSlideX', `${-100 * x}%`);
            }, 1000);
            setTimeout(function () {
              mainSlider.style.setProperty('--slideScale', 1);
              document.querySelector('.slider-control__arrow--next').classList.remove('disabled');
            }, 3000);
            setTimeout(function () {
              contentSlides.forEach((el) => {
                // el.classList.add('aos-animate');
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.add('aos-animate'),
                );
              });
              videos.forEach((video) => {
                if (!video.closest('.active-slide')) {
                  video.pause();
                  video.currentTime = 0;
                }
              });
            }, 4000);
            document
              .querySelector(`.sMainSlider__slide:nth-child(${x + 1})`)
              .classList.add('active-slide');
            let newCurrentBtn = document.querySelector(
              `.slider-control__bullet:nth-child(${x + 1})`,
            );
            newCurrentBtn.classList.add('active');
            newCurrentBtn;
          }
          if (clickedFlag) {
            setTranslate(index);
          } else {
            if (+currentIndex + index >= length) {
              setTranslate();
            } else if (+currentIndex + index < 0) {
              setTranslate(length - 1);
            } else {
              setTranslate(+currentIndex + index);
            }
          }
        }

        btnNext.addEventListener('click', () => {
          clearInterval(timer);
          moveSlider();
          timer = setTimer();
        });

        function resetProgress() {
          progress = 0;
          document.querySelector(`.svg-circle`).style.setProperty('--percent', 0);
          document
            .querySelector(`.slider-control__bullet.active`)
            .style.setProperty('--scale-x', 0);
        }

        function updateProgressBar() {
          document.querySelector(`.svg-circle`).style.setProperty('--percent', `${progress}`);
          document
            .querySelector(`.slider-control__bullet.active`)
            .style.setProperty('--scale-x', `${progress / 100}`);
        }

        function setTimer() {
          return setInterval(() => {
            progress += 1;
            updateProgressBar();
            if (progress === 100) {
              moveSlider();
            }
          }, interval / 100);
        }

        function touchStartHandler(event) {
          startCoordinate = event.touches[0].clientX;
          clearInterval(timer);
        }

        function touchMoveHandler(event) {
          event.preventDefault();

          if (!startCoordinate) {
            return false;
          }

          let finishCoordinate = event.touches[0].clientX;
          coordinateDiff = finishCoordinate - startCoordinate;
        }

        function touchEndHandler() {
          if (coordinateDiff === 0) {
            clearInterval(timer);
            return false;
          }

          if (coordinateDiff < 0) {
            moveSlider();
            timer = setTimer();
          }

          if (coordinateDiff > 0) {
            moveSlider(-1);
            timer = setTimer();
          }

          startCoordinate = 0;
          coordinateDiff = 0;
        }

        if (window.matchMedia('(max-width: 767px)').matches) {
          slider.addEventListener('touchstart', (event) => {
            if (event.target.closest('.sMainSlider__slide')) {
              touchStartHandler(event);
            }
          });

          slider.addEventListener('touchend', (event) => {
            if (event.target.closest('.sMainSlider__slide')) {
              touchEndHandler();
            }
          });

          slider.addEventListener('touchmove', (event) => {
            if (event.target.closest('.sMainSlider__slide')) {
              touchMoveHandler(event);
            }
          });
        }

        document.querySelectorAll('.slider-control__bullet').forEach((item, index) => {
          item.addEventListener('click', () => {
            clearInterval(timer);
            timer = setTimer();
            moveSlider(index, true);
          });
        });

        timer = setTimer();
      }
    }

    slider();
  }
}

if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}
