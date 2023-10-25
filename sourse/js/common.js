"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	document.addEventListener('click', function (event) {
		let parent = $('.menu-item-has-children.shown');
		let parentActive = event.target.closest('.menu-item-has-children.shown');
		if (!parentActive) {
			parent.removeClass('shown');
		};
		let toggle = event.target.closest('.menu-mobile--js.active .menu-item-has-children > a');
		if (toggle) {
			event.preventDefault();
			let parent = toggle.closest('.menu-item-has-children');
			parent.classList.toggle('shown');
		};
	});

	document.addEventListener('click', (event)=> {
		let searchBtn = event.target.closest('.mobile-search-open');
		let searchBlock = event.target.closest('.search-block');
		if (searchBtn) {
			document.querySelector('.search-block').classList.toggle('active');
			document.querySelector('.mobile-search-open').classList.toggle('active');
		}
		else if (!searchBlock) {
			document.querySelector('.search-block').classList.remove('active');
			document.querySelector('.mobile-search-open').classList.remove('active');
		}
	});

	const sliderAutoWidth = document.querySelectorAll('.slider-autowidth-js, .slider-autowidth--reverse-js');
	sliderAutoWidth.forEach((wrap) => {

		const slider = wrap.querySelector('.swiper')
		const nextSlideStartPosition = wrap.classList.contains("slider-autowidth--reverse-js") ? '-100%' : '100%';
		new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 0, 
			speed: 600,
			effect: "creative", 
			creativeEffect: {
				prev: { 
				translate: ["0", 0, 0]
				},
				next: {
				translate: [nextSlideStartPosition, 0, 0]
				}
			},
			on: {
				slidePrevTransitionStart(swiper) { 
					 slider.querySelector(".swiper-slide-next").classList.add("more-z-index")
				}, 
				realIndexChange(swiper) { 
					 $(".more-z-index").removeClass("more-z-index")
				},

			}, 
			pagination: {
				el: slider.querySelector('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: slider.querySelector('.swiper-button-next'),
				prevEl: slider.querySelector('.swiper-button-prev'),
			},
		});
	})
	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	gsap.registerPlugin(ScrollTrigger);
	let scroller = document.querySelector(".scroller") ,tween;

	ScrollTrigger.defaults({
		toggleActions: "play none play none",
	});
	let bodyScrollBar;
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		bodyScrollBar = Scrollbar.init(scroller, {
			// let bodyScrollBar = Scrollbar.init(document.body, {
			// damping: 0.1,
			// thumbMinSize: 20,
			delegateTo: document,
		});
	}
	ScrollTrigger.scrollerProxy(scroller, {
		scrollTop(value) {
			if (arguments.length) {
				bodyScrollBar.scrollTop = value;
			}
			return bodyScrollBar.scrollTop;
		},
	});
	bodyScrollBar.addListener(ScrollTrigger.update);

	AOS.init();

	gsap.utils.toArray("[data-aos]").forEach(aos => {


		const animate = aos.dataset.animate;
		function myfunction() {
			aos.classList.add(`aos-animate`);
			if (animate) {
				aos.classList.toggle(animate);
			}
		};
		const rect = aos.getBoundingClientRect();
		ScrollTrigger.create({
			scroller: scroller,
			trigger: aos,
			start: 'top bottom',
			end: 'bottom +100 top',

			// markers: true,
			toggleActions: "play none none none",
			onEnter: () => myfunction(),
			// onLeave: () => myfunction(),
			// onLeaveBack: () => myfunction(),
			// onEnterBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

	var foot = gsap.timeline({

		scrollTrigger: {
			scroller,
			trigger: '.footer-wrap',
			start: 'top bottom',
			end: 'bottom bottom',
			// endTrigger: '.footer-wrap',
			// end: '90% bottom',
			// markers: true,
			// toggleActions: "play none reverse none",
			scrub: true,
			
		}

	})
	foot
		.from(".footer", {
			ease: 'none', 
			// duration: .02,  
			y: '-100%' });

			
	if (document.querySelector(".img-animate-js")) {
		gsap.utils.toArray(".img-animate-wrap-js").forEach(element => {
			var imgAnimate = gsap.timeline({
	
				scrollTrigger: {
					scroller,
					trigger: element,
					start: "top center",
					end: "+=10%",
					toggleActions: "play none none none",
					// scrub: true,
					// markers: true,
				},
			})
			imgAnimate
				.from(".img-animate-js", {
					ease: 'none', 
					duration: 0.5,
					x: '-100%' 
				})
				.to(".bg", {
					ease: 'none', 
					duration: 0.3,
					x: '100%' 
				});
		})
	}
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }