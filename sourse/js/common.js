"use strict";

const $ = jQuery;
let bodyScrollBar = window.Scrollbar;
let bodyScrollBarY = 0;

function eventHandler() {
  JSCCommon.init();

  let animateBlocks = document.querySelectorAll("[data-json]");
  if (animateBlocks) {
    for (const animateBlock of animateBlocks) {
      lottie.loadAnimation({
        container: animateBlock, // the dom element that will contain the animation
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

  gsap.registerPlugin(ScrollTrigger);
  let scroller = document.querySelector(".scroller"),
    tween;

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

  function getFooterPlace() {
    let foot = gsap.timeline({
      scrollTrigger: {
        scroller,
        trigger: ".footer-wrap",
        start: "top bottom",
        end: "bottom bottom",
        // endTrigger: '.footer-wrap',
        // end: '90% bottom',
        // markers: true,
        // toggleActions: "play none reverse none",
        scrub: true,
      },
    });
    foot.from(".footer", {
      ease: "none",
      // duration: .02,
      y: "-100%",
    });
  }

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
  let topY = window.scrollY;
  window.addEventListener("scroll", () => {
    topY = window.scrollY;
    // console.log(scrollY)
    document.querySelector(
      "#container"
    ).style.transform = `translateY(${topY}px)`;
  });

  bodyScrollBar.addListener((status) => {
    topY = status.offset.y;

    document.querySelector(
      "#container"
    ).style.transform = `translateY(${topY}px)`;
  });

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

      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      speed: 800,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
      rewind: true,
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

    const textSlider = new Swiper(".sMainSlider__slider-text--js", {
      ...slideOption,
      on: {
        init(swiper) {
          timer = setTimer();
          document.querySelector(".slider-control__count").innerHTML = `${
            swiper.realIndex + 1
          } / ${swiper.slides.length}`;
        },
        slideChange(swiper) {
          resetProgress();
          clearInterval(timer);
          timer = setTimer();
          document.querySelector(".slider-control__count").innerHTML = `${
            swiper.realIndex + 1
          } / ${swiper.slides.length}`;
        },
      },
      navigation: {
        nextEl: ".slider-control__arrow--next",
        // prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: autoplay,
        disableOnInteraction: false,
      },
    });

    const videoSlider = new Swiper(".sMainSlider__slider-video--js", {
      ...slideOption,

    });

    textSlider.controller.control = videoSlider;
    // videoSlider.controller.control = textSlider;
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
