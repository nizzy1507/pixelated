import { firstCol, secondCol, thirdCol } from './elements';
import { isFirstIteration } from './config';

export function createImage(curImgsArr) {
  curImgsArr.forEach((img, idx) => {
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

    const firstColHeight = firstCol.offsetHeight;
    const secondColHeight = secondCol.offsetHeight;
    const thirdColHeight = thirdCol.offsetHeight;

    // Only for first iteration
    if (idx % 3 === 0 && isFirstIteration) {
      firstCol.insertAdjacentHTML('beforeend', html);
    }

    if (idx % 3 === 1 && isFirstIteration) {
      secondCol.insertAdjacentHTML('beforeend', html);
    }

    if (idx % 3 === 2 && isFirstIteration) {
      thirdCol.insertAdjacentHTML('beforeend', html);
    }

    // Second and later iteration
    if (
      firstColHeight < secondColHeight &&
      firstColHeight < thirdColHeight &&
      !isFirstIteration
    ) {
      firstCol.insertAdjacentHTML('beforeend', html);
    }
    if (
      secondColHeight < firstColHeight &&
      secondColHeight < thirdColHeight &&
      !isFirstIteration
    ) {
      secondCol.insertAdjacentHTML('beforeend', html);
    }
    if (
      thirdColHeight < secondColHeight &&
      thirdColHeight < firstColHeight &&
      !isFirstIteration
    ) {
      thirdCol.insertAdjacentHTML('beforeend', html);
    }
  });
}
