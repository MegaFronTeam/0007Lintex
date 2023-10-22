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
	// document.addEventListener('click', function (event) {
	// 	let parent = $('.menu-item-has-children.shown');
	// 	let parentActive = event.target.closest('.menu-item-has-children.shown');
	// 	if (!parentActive) {
	// 		parent.removeClass('shown');
	// 	};
	// 	let toggle = event.target.closest('.menu-mobile--js.active .menu-item-has-children > a');
	// 	if (toggle) {
	// 		event.preventDefault();
	// 		let parent = toggle.closest('.menu-item-has-children');
	// 		parent.classList.toggle('shown');
	// 	};
	// });

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

	const sliderAutoWidth = document.querySelectorAll('.slider-autowidth-js');
	sliderAutoWidth.forEach((wrap) => {
		let slider = wrap.querySelector('.swiper')
		new Swiper(slider, {
			slidesPerView: 1,
			loop: true,
			breakpoints: {
				768: {
					slidesPerView: 'auto',
				}
			},
			speed: 800,
			effect: "creative",
			creativeEffect: {
			prev: {
			// shadow: true,
			translate: ["0", 0, 0]
			},
			next: {
			translate: ["100%", 0, 0]
			}
			},
			loop: true,
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