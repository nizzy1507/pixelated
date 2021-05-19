export function createLoading() {
  const imageContainer = document.querySelector('.images');
  imageContainer.insertAdjacentHTML(
    'beforebegin',
    `<h2 class="loading-text">Loading...</h2>`
  );
}

export function removeLoading() {
  document.querySelector('.loading-text').remove();
}
