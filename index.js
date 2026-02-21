import{S,a as R,i}from"./assets/vendor-DwMeSIBD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(o){const r=o.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img 
          src="${t.webformatURL}" 
          alt="${t.tags}"
        >
      </a>
      <ul class="info">
      <li class="info-item"> 
      <b>Likes</b>
          ${t.likes}
      </li>
      <li class="info-item"><b>Views</b>
          ${t.views}
      </li>
       <li class="info-item"><b>Comments</b>
          ${t.comments}
      </li>
       <li class="info-item"><b>Downloads</b>
          ${t.downloads}
      </li>
      </ul>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",r),E.refresh()}function P(){f.innerHTML=""}function p(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}function b(){h.classList.remove("hidden")}function l(){h.classList.add("hidden")}const q="54666795-342cd36b10c863945e9f956f4",v=15;async function L(o,r=1){const t="https://pixabay.com/api/",a={key:q,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:v};return(await R.get(t,{params:a})).data}const $=document.querySelector(".form"),B=document.querySelector(".load-more");let d="",n=1,u=0;const w=15;$.addEventListener("submit",M);async function M(o){o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){i.warning({message:"Please enter search text!",position:"topRight"});return}P(),l(),p();try{d=r,n=1;const t=await L(d,n);if(u=t.totalHits,t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(t.hits),o.target.reset(),n*w>=u?(l(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{i.error({message:"Error loading images",position:"topRight"})}finally{y()}}B.addEventListener("click",async()=>{n++,p();try{const o=await L(d,n);g(o.hits),x(),n*w>=u?(l(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch{i.error({message:"Error loading images",position:"topRight"})}finally{y()}});function x(){const o=document.querySelector(".gallery-item");if(!o)return;const r=o.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
