var q=Object.defineProperty;var L=(r,e,t)=>e in r?q(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var l=(r,e,t)=>(L(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const y="https://forkify-api.herokuapp.com/api/v2/recipes/",w="2815b3a7-2c83-43a4-a400-de9c7cc2e850",T=10,I=10,x=2.5;async function M(r,e){try{const t=e?fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}):fetch(r),n=await Promise.race([t,F(T)]);if(!n.ok)throw new Error(`Something went wrong! (${n.status})`);const{data:s}=await n.json();return s.recipe}catch(t){throw t}}function F(r){return new Promise((e,t)=>{setTimeout(()=>{t(new Error(`Request took too long! Timeout after ${r} seconds`))},r*1e3)})}function H(r,e){e.forEach((t,n)=>{var i,c,d;const s=r[n];!t.isEqualNode(s)&&((c=(i=t.firstChild)==null?void 0:i.nodeValue)==null?void 0:c.trim())!==""&&(s.textContent=(d=t.firstChild)==null?void 0:d.textContent),t.isEqualNode(s)||Array.from(t.attributes).forEach(u=>s.setAttribute(u.name,u.value))})}class O{constructor(){l(this,"state",{recipe:{servings:0,ingredients:[],bookmarked:!1},search:{query:"",results:[],page:1,resultsPerPage:I},bookmarks:[]})}init(){this.state.bookmarks=JSON.parse(localStorage.getItem("bookmarks"))||[]}async getRecipe(e){try{const t=await M(`${y}${e}?key=${w}`);this.state.recipe=this._createRecipeObj(t);const n=this.state.bookmarks.some(s=>s.id===e);this.state.recipe.bookmarked=n}catch(t){throw t}}async loadSearchResult(e){try{this.state.search.query=e;const t=await M(`${y}?search=${e}&key=${w}`),n=this._creaSearchResultArray(t);this.state.search.results=n,this.state.search.page=1,console.log(this.state)}catch(t){throw t}}getSearchResultPerPage(e=this.state.search.page){this.state.search.page=e;const t=(e-1)*this.state.search.resultsPerPage,n=e*this.state.search.resultsPerPage;return this.state.search.results.slice(t,n)}updateServings(e){this.state.recipe.ingredients.forEach(t=>{t.quantity=t.quantity*e/this.state.recipe.servings}),this.state.recipe.servings=e,console.log(this.state)}addBookmark(e){this.state.recipe.bookmarked=!0,this.state.bookmarks.push(e),localStorage.setItem("bookmarks",JSON.stringify(this.state.bookmarks))}deleteBookmark(e){this.state.recipe.bookmarked=!1,this.state.bookmarks=this.state.bookmarks.filter(t=>t.id!==e),localStorage.setItem("bookmarks",JSON.stringify(this.state.bookmarks))}async uploadRecipe(e){try{const n=Object.entries(e).filter(c=>c[0].includes("ingredient")&&c[1]!=="").map(c=>{const d=c[1].split(",").map(g=>g.trim());if(d.length!==3)throw new Error("Wrong ingredient! Please use the correct format :)");const[u,p,o]=d;return{quantity:Number(u),unit:p,description:o||null}}),s=this._createPostRecipeObj(e,n),i=await M(`${y}?key=${w}`,s);this.state.recipe=this._createRecipeObj(i),this.addBookmark(this.state.recipe)}catch(t){throw t}}_createRecipeObj(e){return{id:e.id,title:e.title,publisher:e.publisher,sourceUrl:e.source_url,image:e.image_url,servings:e.servings,cookingTime:e.cooking_time,ingredients:e.ingredients,...e.key&&{key:e.key}}}_creaSearchResultArray(e){return e.map(t=>({id:t.id,title:t.title,image:t.image_url,publisher:t.publisher,...t.key&&{key:t.key}}))}_createPostRecipeObj(e,t){return{title:e.title,publisher:e.publisher,source_url:e.sourceUrl,image_url:e.image,servings:Number(e.servings),cooking_time:Number(e.cookingTime),ingredients:t}}}const a=new O;class v{constructor(){l(this,"data");l(this,"parentEl");l(this,"successMessage");l(this,"errorMessage")}render(e){if(!e||Array.isArray(e)&&e.length===0)return this.renderErrorMsg();this.data=e;const t=this.generateMarkup();this.parentEl.innerHTML="",this.parentEl.insertAdjacentHTML("afterbegin",t)}updateDOM(e){if(!e||Array.isArray(e)&&e.length===0)return;this.data=e;const t=this.parentEl.querySelectorAll("*"),n=this.generateMarkup(),i=document.createRange().createContextualFragment(n).querySelectorAll("*");H(t,i)}renderSpinner(){this.parentEl.innerHTML="";const e=this.spinnerMarkup();this.parentEl.insertAdjacentHTML("afterbegin",e)}renderMessage(e=this.successMessage){this.parentEl.innerHTML="",this.parentEl.insertAdjacentHTML("afterbegin",this.messageMarkup(e))}renderErrorMsg(e=this.errorMessage){this.parentEl.innerHTML="",this.parentEl.insertAdjacentHTML("afterbegin",this.errorMarkup(e))}spinnerMarkup(){return`
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `}messageMarkup(e=this.successMessage){return`
      <div class="message">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div>
    `}errorMarkup(e){return`
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${e}</p>
      </div> 
    `}generateMarkup(){throw new Error("Method not implemented.")}}class A extends v{constructor(){super(...arguments);l(this,"parentEl",document.querySelector(".pagination"))}onClickHandler(t){this.parentEl.addEventListener("click",n=>{n.preventDefault();const s=n.target.closest(".btn--inline");if(!s)return;const i=Number(s.dataset.goToPage);t(i)})}generateMarkup(){this.data=this.data;const t=this.data.page,n=Math.ceil(this.data.results.length/this.data.resultsPerPage);return t===1&&n>1?this._nextPageBtnMarkup(t):t===n&&n>1?this._prevPageBtnMarkup(t):this._prevAndNextBtnMarkup(t)}_prevAndNextBtnMarkup(t){return this._prevPageBtnMarkup(t)+this._nextPageBtnMarkup(t)}_prevPageBtnMarkup(t){return`
      <button 
        class="btn--inline pagination__btn--prev"
        data-go-to-page="${t-1}" 
      >
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${t-1}</span>
      </button>
    `}_nextPageBtnMarkup(t){return`
      <button 
        class="btn--inline pagination__btn--next"
        data-go-to-page="${t+1}"
      >
        <span>Page ${t+1}</span>
        <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
    `}}const $=new A;class S extends v{generateMarkup(){return this.data.map(this._listMarkup).join("")}_listMarkup(e){return`
      <li class="preview">
        <a 
          class="preview__link ${window.location.hash.slice(1)===String(e.id)?"preview__link--active":""}" 
          href="#${e.id}"
        >
          <figure class="preview__fig">
            <img src="${e.image}" alt="${e.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${e.title}</h4>
            <p class="preview__publisher">${e.publisher}</p>
            <div class="preview__user-generated ${!e.key&&"hidden"}">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `}}class B extends S{constructor(){super(...arguments);l(this,"parentEl",document.querySelector(".results"));l(this,"errorMessage","No recipes found for your query! Please try again.")}}const k=new B;var N=function(r){let e;if(r<0?(r=Math.abs(r),e="-"):e="",r===void 0)return"Your input was undefined.";if(isNaN(r))return`"${r}" is not a number.`;if(r==1e16)return`${e}9999999999999999`;if(r>1e16)return"Too many digits in your integer to maintain IEEE 754 Floating Point conversion accuracy.";if(Number.isInteger(r))return`${e}${r}`;if(r<1e-6)return"0";const t=r.toString(),n=t.split(".");let s=n[0],i;if(i=="0"&&s!=="0")return s;if(i=="0"&&s=="0")return"0";if(t.length>=17?i=n[1].slice(0,n[1].length-1):i=n[1],i=="99"&&s!=="0")return`${s} 99/100`;if(i=="99"&&s=="0")return"99/100";if(1-parseFloat(`.${i}`)<.0011&&(i="999"),i==null)return s;const c=i.split("").reverse().join(""),d=/^(\d+)\1{1,2}/;let u=c.match(d);if(u&&i.length>2){let p=u[0].split("").reverse().join(""),o=u[1].split("").reverse().join("");if(o.length>1){let g=o.split(""),E=1;for(let b=0;b<g.length;b++)E/=g[0]/g[b];E===1&&(o=g[0])}return o.length>1&&o.length%2===0&&(o=parseInt(o.slice(0,o.length/2),10)-parseInt(o.slice(o.length/2,o.length),10)===0?o.slice(0,o.length/2):o),D(i,o,p,s,e)}else return j(i,s,e)};function D(r,e,t,n,s){const c=r.length-t.length>=1?r.length-t.length:1,d=Math.pow(10,c),u=parseFloat(`0.${r}`),p=Math.pow(10,e.length),o=Math.round((u*p-u)*Math.pow(10,c)),g=(p-1)*d;return P(o,g,n,s,!0)}function j(r,e,t){const s=parseInt(r,10),i=Math.pow(10,r.length);return P(s,i,e,t,!1)}function P(r,e,t,n,s){const i=[2,3,5];if(s===!0)for(let o=3;o*o<=r;o+=2)r%o===0&&i.push(o);let c=0,d=1,u=r,p=e;for(;c<=i.length;)u%i[c]===0&&p%i[c]===0?(d=d*i[c],u=u/i[c],p=p/i[c]):c++;return C(p,u,t,n)}function C(r,e,t,n){return r===1&&e===1?(t=`${n}${(parseInt(t)+1).toString()}`,`${t}`):e===0?`${n}${t}`:t=="0"?`${n}${e}/${r}`:`${n}${t} ${e}/${r}`}const m="/assets/icons-b62cdfa2.svg";class U extends v{constructor(){super(...arguments);l(this,"parentEl",document.querySelector(".recipe"));l(this,"errorMessage","We could not find that recipe. Please try another one!");l(this,"successMessage","Start by searching for a recipe or an ingredient. Have fun!")}renderHandler(t){["hashchange","load"].forEach(n=>window.addEventListener(n,t))}servingsHandler(t){this.parentEl.addEventListener("click",n=>{const s=n.target.closest(".btn--servings-update");if(!s)return;const i=Number(s.dataset.servingsUpdate);t(i)})}bookmarkHandler(t){this.parentEl.addEventListener("click",n=>{n.target.closest(".btn--bookmark")&&t()})}generateMarkup(){return this.data=this.data,`
      <figure class="recipe__fig">
        <img 
          src="${this.data.image}" 
          alt="${this.data.title}" 
          class="recipe__img" 
        />
        <h1 class="recipe__title">
          <span>${this.data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${m}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${this.data.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${m}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${this.data.servings}
          </span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button 
              class="btn--tiny btn--servings-update"
              data-servings-update="-1"
            >
              <svg>
                <use href="${m}#icon-minus-circle"></use>
              </svg>
            </button>
            <button 
              class="btn--tiny btn--servings-update"
              data-servings-update="1"
            >
              <svg>
                <use href="${m}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${!this.data.key&&"hidden"}">
          <svg>
            <use href="${m}#icon-user"></use>
          </svg>
        </div>

        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${m}#icon-bookmark${this.data.bookmarked?"-fill":""}"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._ingredientsList()}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.data.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${m}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `}_ingredientsList(){return this.data=this.data,`${this.data.ingredients.map(t=>`
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${m}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">
            ${N(t.quantity)}
          </div>
          <div class="recipe__description">
            <span class="recipe__unit">${t.unit}</span>
            ${t.description}
          </div>
        </li>
        `).join("")}`}}const h=new U;class V extends v{constructor(){super(...arguments);l(this,"parentEl",document.querySelector(".search"));l(this,"searchInputEl",document.querySelector(".search__field"))}getSearchQuery(){const t=this.searchInputEl.value.trim().toLowerCase();return this.searchInputEl.value="",t}searchHandler(t){this.parentEl.addEventListener("submit",n=>{n.preventDefault(),t()})}}const R=new V;class Q extends S{constructor(){super(...arguments);l(this,"parentEl",document.querySelector(".bookmarks__list"));l(this,"errorMessage","No bookmarks yet. Find a nice recipe and bookmark it :)")}loadBookmarksHandler(t){window.addEventListener("load",t)}}const _=new Q;class J extends v{constructor(){super();l(this,"parentEl",document.querySelector(".upload"));l(this,"successMessage","Success! Recipe was uploaded!");l(this,"_overlay",document.querySelector(".overlay"));l(this,"_closeFormBtn",document.querySelector(".btn--close-modal"));l(this,"_openFormBtn",document.querySelector(".nav__btn--add-recipe"));l(this,"_window",document.querySelector(".add-recipe-window"));l(this,"toggleForm",()=>{this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")});this._showFormHandler(),this._hideFormHandler()}onSubmitHandler(t){this.parentEl.addEventListener("submit",n=>{n.preventDefault();const s=new FormData(this.parentEl),i=Object.fromEntries(s);[...new FormData(this.parentEl)],t(i)})}_showFormHandler(){this._openFormBtn.addEventListener("click",this.toggleForm)}_hideFormHandler(){this._closeFormBtn.addEventListener("click",this.toggleForm),this._overlay.addEventListener("click",this.toggleForm)}generateMarkup(){return`
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    `}}const f=new J;async function K(){try{const r=window.location.hash.slice(1);if(!r)return;h.renderSpinner(),k.updateDOM(a.getSearchResultPerPage()),_.updateDOM(a.state.bookmarks),await a.getRecipe(r),h.render(a.state.recipe)}catch{h.renderErrorMsg()}}function W(r){r+=a.state.recipe.servings,r!==0&&(a.updateServings(r),h.updateDOM(a.state.recipe))}async function Y(r){try{f.renderSpinner(),await a.uploadRecipe(r),console.log(a.state),h.render(a.state.recipe),f.renderMessage(),_.render(a.state.bookmarks),window.history.pushState(null,"",`#${a.state.recipe.id}`),setTimeout(()=>{f.toggleForm()},x*1e3)}catch(e){f.renderErrorMsg(e.message),console.log(e)}}function G(){_.render(a.state.bookmarks)}function X(){a.state.recipe.bookmarked?a.deleteBookmark(a.state.recipe.id):a.addBookmark(a.state.recipe),h.updateDOM(a.state.recipe),_.render(a.state.bookmarks)}async function z(){try{console.log("SearchController!");const r=R.getSearchQuery();if(!r)return;k.renderSpinner(),await a.loadSearchResult(r),k.render(a.getSearchResultPerPage()),$.render(a.state.search)}catch{k.renderErrorMsg()}}function Z(r){k.render(a.getSearchResultPerPage(r)),$.render(a.state.search)}function ee(){a.init(),f.onSubmitHandler(Y),_.loadBookmarksHandler(G),h.renderHandler(K),h.bookmarkHandler(X),R.searchHandler(z),$.onClickHandler(Z),h.servingsHandler(W),console.log(a.state)}ee();
