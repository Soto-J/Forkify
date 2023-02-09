function renderSpinner(parentEl: HTMLDivElement) {
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `
  );
}

export { renderSpinner };
