"use strict";(self.webpackChunkgatsby_starter_lumen=self.webpackChunkgatsby_starter_lumen||[]).push([[896],{7896:function(e,t,n){n.r(t),n.d(t,{renderImageToString:function(){return b},swapPlaceholderImage:function(){return g}});var o=n(978),a=n(6540),r=n(5848);n(5147);let i;const c=new WeakMap,s=navigator.connection||navigator.mozConnection||navigator.webkitConnection,l=["image","loading","isLoading","isLoaded","imgClassName","imgStyle","objectPosition","backgroundColor","objectFit"];function u(e,t){e.style.opacity="1",t&&(t.style.opacity="0")}function d(e,t,n,o,a,r){const i=e.querySelector("[data-main-image]"),c=e.querySelector("[data-placeholder-image]"),s=n.has(t);function l(e){this.removeEventListener("load",l);const t=e.currentTarget,n=new Image;n.src=t.currentSrc,n.decode?n.decode().then((()=>{u(this,c),null==a||a({wasCached:s})})).catch((e=>{u(this,c),null==r||r(e)})):(u(this,c),null==a||a({wasCached:s}))}return i.addEventListener("load",l),null==o||o({wasCached:s}),Array.from(i.parentElement.children).forEach((e=>{const t=e.getAttribute("data-src"),n=e.getAttribute("data-srcset");t&&(e.removeAttribute("data-src"),e.setAttribute("src",t)),n&&(e.removeAttribute("data-srcset"),e.setAttribute("srcset",n))})),n.add(t),i.complete&&l.call(i,{currentTarget:i}),()=>{i&&i.removeEventListener("load",l)}}function g(e,t,a,r,l,u,g){if(!(0,o.h)()){let o;const f=(h=()=>{o=d(e,t,a,l,u,g)},"IntersectionObserver"in window?(i||(i=new IntersectionObserver((e=>{e.forEach((e=>{var t;e.isIntersecting&&(null==(t=c.get(e.target))||t(),c.delete(e.target))}))}),{rootMargin:"4g"!==(null==s?void 0:s.effectiveType)||null!=s&&s.saveData?"2500px":"1250px"})),function(e){return c.set(e,h),i.observe(e),function(){i&&e&&(c.delete(e),i.unobserve(e))}}):function(){return h(),function(){}}),v=f(e);var b,m;return"objectFit"in document.documentElement.style||(e.dataset.objectFit=null!=(b=r.objectFit)?b:"cover",e.dataset.objectPosition=""+(null!=(m=r.objectPosition)?m:"50% 50%"),async function(e){"objectFitPolyfill"in window||await n.e(452).then(n.t.bind(n,1452,23)),window.objectFitPolyfill(e)}(e)),()=>{o&&o(),v()}}var h;return d(e,t,a,l,u,g)}function b(e){let{image:t,loading:n="lazy",isLoading:i,isLoaded:c,imgClassName:s,imgStyle:u={},objectPosition:d,backgroundColor:g,objectFit:b="cover"}=e,m=(0,o._)(e,l);const{width:h,height:f,layout:v,images:w,placeholder:y,backgroundColor:p}=t;return u=(0,o.a)({objectFit:b,objectPosition:d,backgroundColor:g},u),(0,r.qV)(a.createElement(o.L,{layout:v,width:h,height:f},a.createElement(o.P,(0,o.a)({},(0,o.g)(y,c,v,h,f,p,b,d))),a.createElement(o.M,(0,o.a)({},m,{width:h,height:f,className:s},(0,o.b)(i,c,w,n,u)))))}}}]);
//# sourceMappingURL=896-471aa494241a485df046.js.map