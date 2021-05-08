import { API_PATH, PER_PAGE, SEARCH_PATH } from './config';
import { getJSON } from './helpers';
import { handleSubmit, changeShadow, removeShadow } from './handlers';

const header = document.querySelector('.header');
const imageColumns = document.querySelectorAll('.images__column');
const imagesContainer = document.querySelector('.images');
const observerEl = document.querySelector('.observer');
const searchForm = document.querySelector('.search');
const modal = document.querySelector('.modal');
const searchInput = searchForm.searchString;
const backToTopBtn = document.querySelector('.top__btn');

const images = [];

let page = 1;
let currentSearchTerm;
// let currentModalImage = 0;

function createImage(images) {
  images.forEach((img, idx) => {
    const html = `
      <div class="image" data-id="${img.id}" data-index="${idx}">
        <div class="image__overlay"></div>
        <div class="image__container" style="padding-top: ${
          (img.height / img.width) * 100
        }%; background-color: ${img.color};">
          <img
            src="${img.urls.regular}"
            alt="${img.alt_description}"
            loading="lazy"
          />
        </div>
        <div class="image__info">
          <img
            src="${img.user.profile_image.small}"
            alt="${img.user.name}"
            class="image__profile"
          />
          <h3 class="image__author">${img.user.name}</h3>
          <a href="${img.links.download}?force=true" class="image__download">
            <i class="bx bxs-download"></i>
          </a>
        </div>
      </div>
    `;

    if (idx % 3 === 0) {
      imageColumns[0].insertAdjacentHTML('beforeend', html);
    }

    if (idx % 3 === 1) {
      imageColumns[1].insertAdjacentHTML('beforeend', html);
    }

    if (idx % 3 === 2) {
      imageColumns[2].insertAdjacentHTML('beforeend', html);
    }
  });
}

async function fetchImage() {
  const data = await getJSON(`${API_PATH}&page=1&per_page=${PER_PAGE}`);
  images.push(...data);
  await createImage(data);
  observer.observe(observerEl); // Observe the element after loading all images from first iteration
}

async function loadMoreImage() {
  page++;
  const data = await getJSON(
    currentSearchTerm
      ? `${SEARCH_PATH}&page=${page}&per_page=${PER_PAGE}&query=${currentSearchTerm}`
      : `${API_PATH}&page=${page}&per_page=${PER_PAGE}`
  );
  createImage(currentSearchTerm ? data.results : data);
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
  rootMargin: '2500px',
});

function showBtn(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

const backToTopBtnObserver = new IntersectionObserver(showBtn, {
  root: null,
  threshold: 0,
});

backToTopBtnObserver.observe(header);
// function handleModal(e) {
//   if (e.key === 'ArrowRight') {
//     currentModalImage++;
//   }

//   if (e.key === 'ArrowLeft') {
//     currentModalImage--;
//   }
// }

// function showModal(image) {
//   const imgEl = modal.querySelector('img');
//   imgEl.src = image.urls.small;
//   modal.style.display = 'flex';
// }

// function handleClick(e) {
//   const imageEl = e.target.closest('.image');
//   if (!imageEl) return;

//   const imageID = imageEl.dataset.id;
//   const clickedImage = images.find(image => image.id === imageID);

//   showModal(clickedImage);
// }

// function closeModal() {
//   modal.style.display = 'none';
// }

function init() {
  fetchImage();

  // Event listener
  searchForm.addEventListener('submit', handleSubmit);
  searchInput.addEventListener('focus', changeShadow);
  searchInput.addEventListener('blur', removeShadow);
  // imagesContainer.addEventListener('click', handleClick);
  // document.addEventListener('keydown', handleModal);
  // modal.addEventListener('click', closeModal);
}
init();
