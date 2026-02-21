import{S,a as R,i}from"./assets/vendor-DwMeSIBD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const f=document.querySelector(".gallery"),h=document.querySelector(".loader"),m=document.querySelector(".load-more"),v=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(e){const r=e.map(o=>`
    <li class="gallery-item">
      <a href="${o.largeImageURL}">
        <img 
          src="${o.webformatURL}" 
          alt="${o.tags}"
        >
      </a>
      <ul class="info">
      <li class="info-item"> 
      <b>Likes</b>
          ${o.likes}
      </li>
      <li class="info-item"><b>Views</b>
          ${o.views}
      </li>
       <li class="info-item"><b>Comments</b>
          ${o.comments}
      </li>
       <li class="info-item"><b>Downloads</b>
          ${o.downloads}
      </li>
      </ul>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",r),v.refresh()}function E(){f.innerHTML=""}function p(){h.classList.remove("hidden")}function y(){h.classList.add("hidden")}function b(){m.classList.remove("hidden")}function l(){m.classList.add("hidden")}const P="54666795-342cd36b10c863945e9f956f4",q=15;async function L(e,r=1){const o="https://pixabay.com/api/",a={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:q};return(await R.get(o,{params:a})).data}const $=document.querySelector(".form"),B=document.querySelector(".load-more");let d="",n=1,u=0;const w=15;$.addEventListener("submit",M);async function M(e){e.preventDefault();const r=e.target.elements["search-text"].value.trim();if(!r){i.warning({message:"Please enter search text!",position:"topRight"});return}E(),l(),p();try{d=r,n=1;const o=await L(d,n);if(u=o.totalHits,o.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(o.hits),e.target.reset(),n*w>=u?(l(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{i.error({message:"Error loading images",position:"topRight"})}finally{y()}}B.addEventListener("click",async()=>{n++,l(),p();try{const e=await L(d,n);if(!e.hits||e.hits.length===0){i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}g(e.hits),x(),n*w<u?b():i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{i.error({message:"Error loading images",position:"topRight"})}finally{y()}});function x(){const e=document.querySelector(".gallery-item");if(!e)return;const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
