import {
  API_PATH,
  PER_PAGE,
  SEARCH_PATH,
  page,
  setNextPage,
  currentSearchTerm,
  setIsFirstIteration,
  isFirstIteration,
} from './config';

import { getJSON } from './helpers';
import { searchHandler, changeShadow, removeShadow } from './handlers';

import {
  header,
  observerEl,
  searchForm,
  searchInput,
  backToTopBtn,
} from './elements';
import { createImage } from './createImage';

async function firstLoadImages() {
  const data = await getJSON(`${API_PATH}&page=1&per_page=${PER_PAGE}`);

  await createImage(data);
  setIsFirstIteration(false);

  observer.observe(observerEl); // Observe the element after loading all images from first iteration
}

async function loadMoreImage() {
  setNextPage();

  const data = await getJSON(
    currentSearchTerm
      ? `${SEARCH_PATH}&page=${page}&per_page=${PER_PAGE}&query=${currentSearchTerm}`
      : `${API_PATH}&page=${page}&per_page=${PER_PAGE}`
  );

  const moreImgsArr = currentSearchTerm ? data.results : data;
  createImage(moreImgsArr);
}

function loadMore(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    loadMoreImage();
  }
}

const observer = new IntersectionObserver(loadMore, {
  root: null,
  threshold: 0.1,
  rootMargin: '2000px',
});

function showBackToTopBtn(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

const backToTopBtnObserver = new IntersectionObserver(showBackToTopBtn, {
  root: null,
  threshold: 0,
});

backToTopBtnObserver.observe(header);

function init() {
  firstLoadImages();

  // Event listener
  searchForm.addEventListener('submit', searchHandler);
  searchInput.addEventListener('focus', changeShadow);
  searchInput.addEventListener('blur', removeShadow);
}
init();
