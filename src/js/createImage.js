import { firstCol, secondCol, thirdCol, fourthCol } from './elements';
import { isFirstIteration } from './config';

export function createImage(curImgsArr) {

  if(curImgsArr.length === 0) {
    return;
  }

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

    const firstColHeight = firstCol.getBoundingClientRect().height;
    const secondColHeight = secondCol.getBoundingClientRect().height;
    const thirdColHeight = thirdCol.getBoundingClientRect().height;
    const fourthColHeight = fourthCol.getBoundingClientRect().height;

    // Only for first iteration
    if (idx % 4 === 0 && isFirstIteration) {
      firstCol.insertAdjacentHTML('beforeend', html);
    }

    if (idx % 4 === 1 && isFirstIteration) {
      secondCol.insertAdjacentHTML('beforeend', html);
    }

    if (idx % 4 === 2 && isFirstIteration) {
      thirdCol.insertAdjacentHTML('beforeend', html);
    }

    if (idx % 4 === 3 && isFirstIteration) {
      fourthCol.insertAdjacentHTML('beforeend', html);
    }

    // Second and later iteration
    if (
        firstColHeight < secondColHeight &&
        firstColHeight < thirdColHeight &&
        firstColHeight < fourthColHeight &&
        !isFirstIteration
    ) {
      firstCol.insertAdjacentHTML('beforeend', html);
    }

    if (
        secondColHeight < firstColHeight &&
        secondColHeight < thirdColHeight &&
        secondColHeight < fourthColHeight &&
        !isFirstIteration
    ) {
      secondCol.insertAdjacentHTML('beforeend', html);
    }

    if (
      thirdColHeight < secondColHeight &&
      thirdColHeight < firstColHeight &&
      thirdColHeight < fourthColHeight &&
      !isFirstIteration
    ) {
      thirdCol.insertAdjacentHTML('beforeend', html);
    }

    if (
      fourthColHeight < secondColHeight &&
      fourthColHeight < firstColHeight &&
      fourthColHeight < thirdColHeight &&
      !isFirstIteration
    ) {
      fourthCol.insertAdjacentHTML('beforeend', html);
    }
  });
}
