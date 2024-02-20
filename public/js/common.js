"use strict";

const $ = jQuery;
let bodyScrollBar = window.Scrollbar;
let bodyScrollBarY = 0;
gsap.registerPlugin(ScrollTrigger);
let scroller = document.querySelector(".scroller"),
  tween;

function getFooterPlace() {
  scroller = document.querySelector(".scroller");
  let footer = document.querySelector(".footer");
  let footerWrap = document.querySelector(".footer-wrap");
  footer.style = "";
  let foot = gsap.timeline({
    scrollTrigger: {
      scroller,
      trigger: footerWrap,
      start: "top bottom",
      end: "bottom bottom",
      // endTrigger: '.footer-wrap',
      // end: '90% bottom',
      // markers: true,
      // toggleActions: "play none reverse none",
      scrub: true,
    },
  });
  foot.from(footer, {
    ease: "none",
    // duration: .02,
    y: "-100%",
  });
}

function eventHandler() {
  JSCCommon.init();

  let animateBlocks = document.querySelectorAll("[data-json]");
  if (animateBlocks) {
    for (const animateBlock of animateBlocks) {
      lottie.loadAnimation({
        container: animateBlock, // the dom element that will contain the animation
        // renderer: "svg",
        renderer: "canvas",
        loop: true,
        autoplay: true,
        path: animateBlock.dataset.json, // the path to the animation json
      });
    }
  }

  function whenResize() {
    JSCCommon.setFixedNav();
  }

  window.addEventListener(
    "scroll",
    () => {
      JSCCommon.setFixedNav();
    },
    { passive: true }
  );
  window.addEventListener(
    "resize",
    () => {
      whenResize();
    },
    { passive: true }
  );

  whenResize();

  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true,
    },
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: " .swiper-pagination",
      type: "bullets",
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  };
  document.addEventListener("click", function (event) {
    let parent = $(".menu-item-has-children.shown");
    let parentActive = event.target.closest(".menu-item-has-children.shown");
    if (!parentActive) {
      parent.removeClass("shown");
    }
    let toggle = event.target.closest(
      ".menu-mobile--js.active .menu-item-has-children > a"
    );
    if (toggle) {
      event.preventDefault();
      let parent = toggle.closest(".menu-item-has-children");
      parent.classList.toggle("shown");
    }
  });

  document.addEventListener("click", (event) => {
    let searchBtn = event.target.closest(".mobile-search-open");
    let searchTargetBlock = event.target.closest(".search-block");
    let searchBlock = document.querySelector(".search-block");

    if (searchBtn) {
      if (searchBlock) {
        searchBlock.classList.toggle("active");
        document
          .querySelector(".mobile-search-open")
          .classList.toggle("active");
      }
    } else if (!searchTargetBlock) {
      if (searchBlock) {
        searchBlock.classList.remove("active");
        document
          .querySelector(".mobile-search-open")
          .classList.remove("active");
      }
    }
  });

  const sliderAutoWidth = document.querySelectorAll(
    ".slider-autowidth-js, .slider-autowidth--reverse-js"
  );
  sliderAutoWidth.forEach((wrap) => {
    const slider = wrap.querySelector(".swiper");
    const nextSlideStartPosition = wrap.classList.contains(
      "slider-autowidth--reverse-js"
    )
      ? "-100%"
      : "100%";
    new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600,
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: ["0", 0, 0],
        },
        next: {
          translate: [nextSlideStartPosition, 0, 0],
        },
      },
      on: {
        slidePrevTransitionStart(swiper) {
          slider
            .querySelector(".swiper-slide-next")
            .classList.add("more-z-index");
        },
        realIndexChange(swiper) {
          $(".more-z-index").removeClass("more-z-index");
        },
      },
      pagination: {
        el: slider.querySelector(".swiper-pagination"),
        clickable: true,
      },
      navigation: {
        nextEl: slider.querySelector(".swiper-button-next"),
        prevEl: slider.querySelector(".swiper-button-prev"),
      },
    });
  });
  new Swiper(".breadcrumb-slider--js", {
    slidesPerView: "auto",
    freeMode: true,
    watchOverflow: true,
  });

  let smSliders = document.querySelectorAll(".sm-swiper-js");
  if (smSliders) {
    smSliders.forEach((slider) => {
      new Swiper(slider, {
        slidesPerView: "auto",
      });
    });
  }

  let cardSlidersWrap = document.querySelectorAll(".card-slider-js");
  if (cardSlidersWrap) {
    cardSlidersWrap.forEach((sliderWrap) => {
      let swiper = sliderWrap.querySelector(".swiper");
      new Swiper(swiper, {
        slidesPerView: "auto",
        spaceBetween: 8,
        navigation: {
          nextEl: sliderWrap.querySelector(".swiper-button-next"),
          prevEl: sliderWrap.querySelector(".swiper-button-prev"),
        },
        breakpoints: {
          768: {
            spaceBetween: 16,
            slidesPerView: 4,
          },
        },
      });
    });
  }

  const swiper4 = new Swiper(".sBanners__slider--js", {
    // если не используешь методы swiper  - можно обращаться без нее к Swiper
    // slidesPerView: 5,
    ...defaultSl,
    slidesPerView: "auto",
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,
  });

  ScrollTrigger.defaults({
    toggleActions: "play none play none",
  });

  // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  bodyScrollBar = Scrollbar.init(scroller, {
    // let bodyScrollBar = Scrollbar.init(document.body, {
    // damping: 0.1,
    // thumbMinSize: 20,
    // delegateTo: document,
  });
  // Scrollbar.initAll();
  // }
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    },
  });
  bodyScrollBar.addListener(ScrollTrigger.update);

  bodyScrollBar.addListener(() => {
    let header = document.querySelector(".header");
    if (!header) return;
    var scrollTop = bodyScrollBar.offset.y;

    header.style.transform = `translateY(${scrollTop}px)`;
    scrollTop > 70
      ? header.classList.add("fixed-show")
      : header.classList.remove("fixed-show");

    let headerBlock = document.querySelector(".headerBlock--5 picture");
    let headerBlockHeight = document.querySelector(".headerBlock--5");
    if (!headerBlock && !headerBlockHeight) return;
    headerBlock.style.transform = `translateY(${
      scrollTop < headerBlockHeight.offsetHeight + 106
        ? scrollTop
        : headerBlockHeight.offsetHeight + 106
    }px) translateX(-50%)`;
  });

  // AOS.init();

  gsap.utils.toArray("[data-aos]").forEach((aos) => {
    const animate = aos.dataset.animate;
    function myfunction() {
      aos.classList.add(`aos-animate`);
      if (animate) {
        aos.classList.toggle(animate);
      }
    }
    const rect = aos.getBoundingClientRect();
    ScrollTrigger.create({
      scroller: scroller,
      trigger: aos,
      start: "top bottom",
      end: "bottom +100 top",

      // markers: true,
      toggleActions: "play none none none",
      onEnter: () => myfunction(),
      // onLeave: () => myfunction(),
      // onLeaveBack: () => myfunction(),
      // onEnterBack: () => myfunction(),
      invalidateOnRefresh: true,
    });
  });

  getFooterPlace();

  if (document.querySelector(".img-animate-js")) {
    gsap.utils.toArray(".img-animate-wrap-js").forEach((element) => {
      var imgAnimate = gsap.timeline({
        scrollTrigger: {
          scroller,
          trigger: element,
          // start: "top top",
          end: "+=10%",
          toggleActions: "play none none none",
          // scrub: true,
          // markers: true,
        },
      });
      imgAnimate
        // 	.from(element.querySelector(".img-animate-js"), {
        // 		ease: 'none',
        // 		duration: 0.7,
        // 		x: '-101%'
        // 	})
        .from(element.querySelector(".img-animate-js img"), {
          ease: "none",
          duration: 0.3,
          scaleX: 0,
        })
        .to(element.querySelector(".bg"), {
          ease: "none",
          duration: 0.3,
          x: "101%",
        });
    });
  }

  let videoPlayer = document.querySelectorAll(".video-wrap");
  if (videoPlayer.length > 0) {
    videoPlayer.forEach((elem) => {
      let video = elem.querySelector("video");
      video.addEventListener("click", () => {
        elem.classList.add("active");
        video.paused ? video.pause() : video.play();
      });
    });
  }

  let cookie = document.querySelector(".cookie");
  cookie
    .querySelector(".close")
    .addEventListener("click", () => cookie.classList.add("closed"));

  new Swiper(".sScienceHead__slider--js", {
    slidesPerView: "auto",
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Swiper(".sCatalog__slider--js", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  new Swiper(".sSearch__slider--js", {
    slidesPerView: 1,
    autoplay: {
      delay: 2000,
    },
    speed: 800,
    loop: true,
    spaceBetween: 20,
  });

  // sizes.heightContainer = container.offsetHeight;
  // const particles = Math.floor(sizes.heightContainer *25 / sizes.height);
  // init(particles);
  // animate(particles);
  // 	// sizes.heightContainer = bodyScrollBar.limit.y;
  // let topY = window.scrollY;
  // window.addEventListener("scroll", () => {
  //   topY = window.scrollY;
  //   // console.log(scrollY)
  //   document.querySelector(
  //     "#container"
  //   ).style.transform = `translateY(${topY}px)`;
  // });

  // bodyScrollBar.addListener((status) => {
  //   topY = status.offset.y;

  //   document.querySelector(
  //     "#container"
  //   ).style.transform = `translateY(${topY}px)`;
  // });

  ballInimate();

  $(".custom-select-map-js").select2({
    allowClear: false,
    dropdownCssClass: "multi-dropdown",
    // dropdownParent: $(".select-block-wrapper"),
    closeOnSelect: false,
  });

  $(".custom-select-js").select2({
    allowClear: false,
    // dropdownParent: $(".select-block-wrapper"),
  });

  $(".select-block-wrapper textarea").attr("readonly", true);
  $(".select2-results__options").attr("data-scrollbar", true);

  // scroller.track.update();

  const scroll_stopper = document.querySelectorAll(".StopSrollonHover");

  // $('[data-fancybox').click(setDisableScroll)
  // scroll_stopper.forEach(el=>{
  // 	el.addEventListener("mouseenter",  setDisableScroll)
  // 	// el.addEventListener("mouseout",  () => Scrollbar.init(scroller, { delegateTo: document}))
  // })
  if (document.querySelector(".sMainSlider")) {
    const autoplay = 5000;
    var progress = 0;
    let timer;
    const slideOption = {
      slidesPerView: 1,

      speed: 1600,
      spaceBetween: 40,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      rewind: true,
      allowTouchMove: false,
    };

    function setTimer() {
      return setInterval(() => {
        progress += 1;
        updateProgressBar();
        if (progress === 100) {
          clearInterval(timer);
        }
      }, autoplay / 100);
    }

    function resetProgress() {
      progress = 0;
      document
        .querySelector(".sMainSlider")
        .style.setProperty("--percent", progress);
    }

    function updateProgressBar() {
      document
        .querySelector(".sMainSlider")
        .style.setProperty("--percent", progress);
    }

    //   resetProgress();
    //   clearInterval(timer);
    //   timer = setTimer();

    //   const textSlider = new Swiper(".sMainSlider__slider-text--js", {
    //     ...slideOption,
    //     on: {
    //       init(swiper) {
    //         timer = setTimer();
    //         document.querySelector(".slider-control__count").innerHTML = `${
    //           swiper.realIndex + 1
    //         } / ${swiper.slides.length}`;
    //       },
    //       slideChange(swiper) {
    //         resetProgress();
    //         clearInterval(timer);
    //         timer = setTimer();
    //         document.querySelector(".slider-control__count").innerHTML = `${
    //           swiper.realIndex + 1
    //         } / ${swiper.slides.length}`;
    //       },
    //       slideChangeTransitionStart(swiper) {
    //         $(".sMainSlider").addClass("zoom-out");
    //       },
    //       slideChangeTransitionEnd(swiper) {
    //         $(".sMainSlider").removeClass("zoom-out");
    //       },
    //     },
    //     navigation: {
    //       nextEl: ".slider-control__arrow--next",
    //       // prevEl: ".swiper-button-prev",
    //     },
    //     // autoplay: {
    //     //   delay: autoplay,
    //     //   disableOnInteraction: false,
    //     // },
    //   });

    //   const videoSlider = new Swiper(".sMainSlider__slider-video--js", {
    //     ...slideOption,
    //   });

    //   textSlider.controller.control = videoSlider;
    //   // videoSlider.controller.control = textSlider;
    // }

    function slider() {
      const slider = document.querySelector(".sMainSlider__slider-text");
      if (slider) {
        const list = slider.querySelector(
          ".sMainSlider__slider-text .swiper-wrapper"
        );
        const slides = list.querySelectorAll(".sMainSlider__slide");
        const btnNext = document.querySelector(".slider-control__arrow--next");
        // const btnPrev = document.querySelector('.sMainSlider__slider-arrow--prev');

        let interval = 20000;
        let timer;
        let progress = 0;
        let coordinateDiff = 0;
        let startCoordinate = 0;
        if (window.matchMedia("(max-width: 767px)").matches) {
          interval = 7000;
        }

        slides.forEach((element, index) => {
          if (index == 0) {
            element.classList.add("active-slide");
          }
          element.dataset.index = index;
        });
        function getSlidesWIdth() {
          return slider.offsetWidth + "px";
        }
        AOS.init({
          disable: function () {
            var maxWidth = 767.98;
            return window.innerWidth < maxWidth;
          },
        });
        window.addEventListener("resize", getSlidesWIdth);
        getSlidesWIdth();
        function moveSlider(index = 1, clickedFlag = false) {
          let currentIndex = document.querySelector(
            ".sMainSlider__slide.active-slide"
          ).dataset.index;
          let length = slides.length;
          resetProgress();
          document
            .querySelector(`.sMainSlider__slide.active-slide`)
            .classList.remove("active-slide");
          document
            .querySelector(`.slider-control__bullet.active`)
            .classList.remove("active");
          function setTranslate(x = 0) {
            let mainSlider = document.querySelector(
              ".sMainSlider__slider-text--js"
            );
            let contentSlides = document.querySelectorAll(
              ".sMainSlider__slide"
            );
            // let contentArr = document.querySelectorAll('[data-aos="fade-up"]');

            // list.style.setProperty('--change', `${-100 * x}%`);
            // mainSlider.style.transform = `scale(0.5) `;
            mainSlider.style.setProperty("--slideScale", 0.5);
            document
              .querySelector(".slider-control__arrow--next")
              .classList.add("disabled");
            document.querySelector(".slider-control__count").innerHTML = `${
              x + 1
            }/${slides.length}`;
            let videos = document.querySelectorAll(".sMainSlider__slide video");
            videos.forEach((video) => {
              if (!video.closest(".active-slide")) {
                video.play();
              }
            });
            contentSlides.forEach((el) => {
              if (el.dataset.index == x) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove("aos-animate")
                );
              }
              if (el.dataset.index == x + 1) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove("aos-animate")
                );
              }
              if (el.dataset.index == x - 2) {
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.remove("aos-animate")
                );
              }
              if (x == 0) {
                if (el.dataset.index != 4) {
                  el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                    item.classList.remove("aos-animate")
                  );
                }
              }
            });
            setTimeout(function () {
              list.style.setProperty("--translateSlideX", `${-100 * x}%`);
            }, 1000);
            setTimeout(function () {
              mainSlider.style.setProperty("--slideScale", 1);
              document
                .querySelector(".slider-control__arrow--next")
                .classList.remove("disabled");
            }, 3000);
            setTimeout(function () {
              contentSlides.forEach((el) => {
                // el.classList.add('aos-animate');
                el.querySelectorAll('[data-aos="fade-up"]').forEach((item) =>
                  item.classList.add("aos-animate")
                );
              });
              videos.forEach((video) => {
                if (!video.closest(".active-slide")) {
                  video.pause();
                  video.currentTime = 0;
                }
              });
            }, 4000);
            document
              .querySelector(`.sMainSlider__slide:nth-child(${x + 1})`)
              .classList.add("active-slide");
            let newCurrentBtn = document.querySelector(
              `.slider-control__bullet:nth-child(${x + 1})`
            );
            newCurrentBtn.classList.add("active");
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

        btnNext.addEventListener("click", () => {
          clearInterval(timer);
          moveSlider();
          timer = setTimer();
        });

        function resetProgress() {
          progress = 0;
          document
            .querySelector(`.svg-circle`)
            .style.setProperty("--percent", 0);
          document
            .querySelector(`.slider-control__bullet.active`)
            .style.setProperty("--scale-x", 0);
        }

        function updateProgressBar() {
          document
            .querySelector(`.svg-circle`)
            .style.setProperty("--percent", `${progress}`);
          document
            .querySelector(`.slider-control__bullet.active`)
            .style.setProperty("--scale-x", `${progress / 100}`);
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

        if (window.matchMedia("(max-width: 767px)").matches) {
          slider.addEventListener("touchstart", (event) => {
            if (event.target.closest(".sMainSlider__slide")) {
              touchStartHandler(event);
            }
          });

          slider.addEventListener("touchend", (event) => {
            if (event.target.closest(".sMainSlider__slide")) {
              touchEndHandler();
            }
          });

          slider.addEventListener("touchmove", (event) => {
            if (event.target.closest(".sMainSlider__slide")) {
              touchMoveHandler(event);
            }
          });
        }

        document
          .querySelectorAll(".slider-control__bullet")
          .forEach((item, index) => {
            item.addEventListener("click", () => {
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

  let preloader = document.querySelector(".preloader");
  if (preloader) {
    var animation = bodymovin.loadAnimation({
      container: preloader,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./preloader/data.json",
    });
  }

  const videoSlider = new Swiper(".sProduction__slider-video--js", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
      el: " .swiper-pagination",
      type: "bullets",
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  });

  let header = document.querySelector(".header");
  if (header) {
    let sections = document.querySelectorAll(".white-section");
    if (!sections.length) return;
    sections.forEach((section) => {
      // let className = "onWhiteBg "; // default color

      // if (section.classList.contains("white-section")) {
      //   className = "onWhiteBg";
      // } else {
      //   className = " ";
      // }

      ScrollTrigger.create({
        trigger: section,
        scroller,
        start: "top-=150   top",
        end: "bottom top",
        onEnter: () => header.classList.add("onWhiteBg"),
        onEnterBack: () => header.classList.add("onWhiteBg"),
        onLeaveBack: () => header.classList.remove("onWhiteBg"),
        onLeave: () => header.classList.remove("onWhiteBg"),
        // toggleActions: "play none reverse none",
      });
    });
  }
}
if (document.readyState !== "loading") {
  eventHandler();
} else {
  document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

window.onload = function () {
  //hide the preloader
  const preloader = document.querySelector(".preloader");
  if (preloader) preloader.classList.add("disabled");
};

$(".btn--test-js").on("click", function () {
  $(".sCatalog__row").slideToggle(function () {
    // bodyScrollBar.addListener(ScrollTrigger.update);
    ScrollTrigger.refresh();
    // getFooterPlace();
  });
});
