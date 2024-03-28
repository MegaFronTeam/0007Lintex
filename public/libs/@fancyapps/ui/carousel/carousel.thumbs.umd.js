!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).window=t.window||{})}(this,(function(t){"use strict";const e=(t,...i)=>{const s=i.length;for(let n=0;n<s;n++){const s=i[n]||{};Object.entries(s).forEach((([i,s])=>{const n=Array.isArray(s)?[]:{};var r;t[i]||Object.assign(t,{[i]:n}),"object"==typeof(r=s)&&null!==r&&r.constructor===Object&&"[object Object]"===Object.prototype.toString.call(r)?Object.assign(t[i],e(n,s)):Array.isArray(s)?Object.assign(t,{[i]:[...s]}):Object.assign(t,{[i]:s})}))}return t},i=t=>`${t||""}`.split(" ").filter((t=>!!t)),s=(t,e)=>{t&&i(e).forEach((e=>{t.classList.add(e)}))},n=(t,e)=>{t&&i(e).forEach((e=>{t.classList.remove(e)}))},r=function(t,e){return t.split(".").reduce(((t,e)=>"object"==typeof t?t[e]:void 0),e)};class o{constructor(t={}){Object.defineProperty(this,"options",{enumerable:!0,configurable:!0,writable:!0,value:t}),Object.defineProperty(this,"events",{enumerable:!0,configurable:!0,writable:!0,value:new Map}),this.setOptions(t);for(const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))t.startsWith("on")&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}setOptions(t){this.options=t?e({},this.constructor.defaults,t):{};for(const[t,e]of Object.entries(this.option("on")||{}))this.on(t,e)}option(t,...e){let i=r(t,this.options);return i&&"function"==typeof i&&(i=i.call(this,this,...e)),i}optionFor(t,e,i,...s){let n=r(e,t);var o;"string"!=typeof(o=n)||isNaN(o)||isNaN(parseFloat(o))||(n=parseFloat(n)),"true"===n&&(n=!0),"false"===n&&(n=!1),n&&"function"==typeof n&&(n=n.call(this,this,t,...s));let a=r(e,this.options);return a&&"function"==typeof a?n=a.call(this,this,t,...s,n):void 0===n&&(n=a),void 0===n?i:n}cn(t){const e=this.options.classes;return e&&e[t]||""}localize(t,e=[]){t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,i)=>{let s="";return i?s=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${i}`):e&&(s=this.option(`l10n.${e}`)),s||(s=t),s}));for(let i=0;i<e.length;i++)t=t.split(e[i][0]).join(e[i][1]);return t=t.replace(/\{\{(.*?)\}\}/g,((t,e)=>e))}on(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),this.events||(this.events=new Map),i.forEach((t=>{let i=this.events.get(t);i||(this.events.set(t,[]),i=[]),i.includes(e)||i.push(e),this.events.set(t,i)}))}off(t,e){let i=[];"string"==typeof t?i=t.split(" "):Array.isArray(t)&&(i=t),i.forEach((t=>{const i=this.events.get(t);if(Array.isArray(i)){const t=i.indexOf(e);t>-1&&i.splice(t,1)}}))}emit(t,...e){[...this.events.get(t)||[]].forEach((t=>t(this,...e))),"*"!==t&&this.emit("*",t,...e)}}Object.defineProperty(o,"version",{enumerable:!0,configurable:!0,writable:!0,value:"5.0.35"}),Object.defineProperty(o,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:{}});class a extends o{constructor(t,e){super(e),Object.defineProperty(this,"instance",{enumerable:!0,configurable:!0,writable:!0,value:t})}attach(){}detach(){}}var l,c;!function(t){t[t.Init=0]="Init",t[t.Error=1]="Error",t[t.Ready=2]="Ready",t[t.Panning=3]="Panning",t[t.Mousemove=4]="Mousemove",t[t.Destroy=5]="Destroy"}(l||(l={})),function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Destroy=2]="Destroy"}(c||(c={}));const u=(t,e=1e4)=>(t=parseFloat(t+"")||0,Math.round((t+Number.EPSILON)*e)/e),h={classes:{container:"f-thumbs f-carousel__thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide",isResting:"is-resting",isSelected:"is-selected",isLoading:"is-loading",hasThumbs:"has-thumbs"},minCount:2,parentEl:null,thumbTpl:'<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',type:"modern"};t.States=void 0,function(t){t[t.Init=0]="Init",t[t.Ready=1]="Ready",t[t.Hidden=2]="Hidden"}(t.States||(t.States={}));const d="isResting",f="thumbWidth",b="thumbHeight",p="thumbClipWidth";class g extends a{constructor(){super(...arguments),Object.defineProperty(this,"type",{enumerable:!0,configurable:!0,writable:!0,value:"modern"}),Object.defineProperty(this,"container",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"track",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"carousel",{enumerable:!0,configurable:!0,writable:!0,value:null}),Object.defineProperty(this,"thumbWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbClipWidth",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbHeight",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbGap",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"thumbExtraGap",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:t.States.Init})}get isModern(){return"modern"===this.type}onInitSlide(t,e){const i=e.el?e.el.dataset:void 0;i&&(e.thumbSrc=i.thumbSrc||e.thumbSrc||"",e[p]=parseFloat(i[p]||"")||e[p]||0,e[b]=parseFloat(i.thumbHeight||"")||e[b]||0),this.addSlide(e)}onInitSlides(){this.build()}onChange(){var t;if(!this.isModern)return;const e=this.container,s=this.instance,r=s.panzoom,o=this.carousel,a=o?o.panzoom:null,l=s.page;if(r&&o&&a){if(r.isDragging){n(e,this.cn(d));let i=(null===(t=o.pages[l])||void 0===t?void 0:t.pos)||0;i+=s.getProgress(l)*(this[p]+this.thumbGap);let r=a.getBounds();-1*i>r.x.min&&-1*i<r.x.max&&a.panTo({x:-1*i,friction:.12})}else c=e,u=this.cn(d),h=r.isResting,c&&i(u).forEach((t=>{c.classList.toggle(t,h||!1)}));var c,u,h;this.shiftModern()}}onRefresh(){this.updateProps();for(const t of this.instance.slides||[])this.resizeModernSlide(t);this.shiftModern()}isDisabled(){const t=this.option("minCount")||0;if(t){const e=this.instance;let i=0;for(const t of e.slides||[])t.thumbSrc&&i++;if(i<t)return!0}const e=this.option("type");return["modern","classic"].indexOf(e)<0}getThumb(t){const e=this.option("thumbTpl")||"";return{html:this.instance.localize(e,[["%i",t.index],["%d",t.index+1],["%s",t.thumbSrc||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]])}}addSlide(t){const e=this.carousel;e&&e.addSlide(t.index,this.getThumb(t))}getSlides(){const t=[];for(const e of this.instance.slides||[])t.push(this.getThumb(e));return t}resizeModernSlide(t){this.isModern&&(t[f]=t[p]&&t[b]?Math.round(this[b]*(t[p]/t[b])):this[f])}updateProps(){const t=this.container;if(!t)return;const e=e=>parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-"+e))||0;this.thumbGap=e("gap"),this.thumbExtraGap=e("extra-gap"),this[f]=e("width")||40,this[p]=e("clip-width")||40,this[b]=e("height")||40}build(){const i=this;if(i.state!==t.States.Init)return;if(i.isDisabled())return void i.emit("disabled");const n=i.instance,r=n.container,o=i.getSlides(),a=i.option("type");i.type=a;const l=i.option("parentEl"),c=i.cn("container"),u=i.cn("track");let h=null==l?void 0:l.querySelector("."+c);h||(h=document.createElement("div"),s(h,c),l?l.appendChild(h):r.after(h)),s(h,`is-${a}`),s(r,i.cn("hasThumbs")),i.container=h,i.updateProps();let d=h.querySelector("."+u);d||(d=document.createElement("div"),s(d,i.cn("track")),h.appendChild(d)),i.track=d;const f=e({},{track:d,infinite:!1,center:!0,fill:"classic"===a,dragFree:!0,slidesPerPage:1,transition:!1,preload:.25,friction:.12,Panzoom:{maxVelocity:0},Dots:!1,Navigation:!1,classes:{container:"f-thumbs",viewport:"f-thumbs__viewport",track:"f-thumbs__track",slide:"f-thumbs__slide"}},i.option("Carousel")||{},{Sync:{target:n},slides:o}),b=new n.constructor(h,f);b.on("createSlide",((t,e)=>{i.setProps(e.index),i.emit("createSlide",e,e.el)})),b.on("ready",(()=>{i.shiftModern(),i.emit("ready")})),b.on("refresh",(()=>{i.shiftModern()})),b.on("Panzoom.click",((t,e,s)=>{i.onClick(s)})),i.carousel=b,i.state=t.States.Ready}onClick(t){t.preventDefault(),t.stopPropagation();const e=this.instance,{pages:i,page:s}=e,n=t=>{if(t){const e=t.closest("[data-carousel-index]");if(e)return[parseInt(e.dataset.carouselIndex||"",10)||0,e]}return[-1,void 0]},r=(t,e)=>{const i=document.elementFromPoint(t,e);return i?n(i):[-1,void 0]};let[o,a]=n(t.target);if(o>-1)return;const l=this[p],c=t.clientX,u=t.clientY;let[h,d]=r(c-l,u),[f,b]=r(c+l,u);d&&b?(o=Math.abs(c-d.getBoundingClientRect().right)<Math.abs(c-b.getBoundingClientRect().left)?h:f,o===s&&(o=o===h?f:h)):d?o=h:b&&(o=f),o>-1&&i[o]&&e.slideTo(o)}getShift(t){var e;const i=this,{instance:s}=i,n=i.carousel;if(!s||!n)return 0;const r=i[f],o=i[p],a=i.thumbGap,l=i.thumbExtraGap;if(!(null===(e=n.slides[t])||void 0===e?void 0:e.el))return 0;const c=.5*(r-o),u=s.pages.length-1;let h=s.getProgress(0),d=s.getProgress(u),b=s.getProgress(t,!1,!0),g=0,m=c+l+a;const y=h<0&&h>-1,v=d>0&&d<1;return 0===t?(g=m*Math.abs(h),v&&1===h&&(g-=m*Math.abs(d))):t===u?(g=m*Math.abs(d)*-1,y&&-1===d&&(g+=m*Math.abs(h))):y||v?(g=-1*m,g+=m*Math.abs(h),g+=m*(1-Math.abs(d))):g=m*b,g}setProps(t){var e;const i=this;if(!i.isModern)return;const{instance:s}=i,n=i.carousel;if(s&&n){const r=null===(e=n.slides[t])||void 0===e?void 0:e.el;if(r&&r.childNodes.length){let e=u(1-Math.abs(s.getProgress(t))),n=u(i.getShift(t));r.style.setProperty("--progress",e?e+"":""),r.style.setProperty("--shift",n+"")}}}shiftModern(){const t=this;if(!t.isModern)return;const{instance:e,track:i}=t,s=e.panzoom,n=t.carousel;if(!(e&&i&&s&&n))return;if(s.state===l.Init||s.state===l.Destroy)return;for(const i of e.slides)t.setProps(i.index);let r=(t[p]+t.thumbGap)*(n.slides.length||0);i.style.setProperty("--width",r+"")}cleanup(){const e=this;e.carousel&&e.carousel.destroy(),e.carousel=null,e.container&&e.container.remove(),e.container=null,e.track&&e.track.remove(),e.track=null,e.state=t.States.Init,n(e.instance.container,e.cn("hasThumbs"))}attach(){const t=this,e=t.instance;e.on("initSlide",t.onInitSlide),e.state===c.Init?e.on("initSlides",t.onInitSlides):t.onInitSlides(),e.on(["change","Panzoom.afterTransform"],t.onChange),e.on("Panzoom.refresh",t.onRefresh)}detach(){const t=this,e=t.instance;e.off("initSlide",t.onInitSlide),e.off("initSlides",t.onInitSlides),e.off(["change","Panzoom.afterTransform"],t.onChange),e.off("Panzoom.refresh",t.onRefresh),t.cleanup()}}Object.defineProperty(g,"defaults",{enumerable:!0,configurable:!0,writable:!0,value:h}),t.Thumbs=g,t.defaultOptions=h}));
