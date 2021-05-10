import {
  PER_PAGE,
  SEARCH_PATH,
  setNextPage,
  setCurrentSearchTerm,
  setIsFirstIteration,
} from './config';
import { createImage } from './createImage';

import { headerTitle } from './elements';
import { getJSON } from './helpers';

function clearColumns() {
  document
    .querySelectorAll('.images__column')
    .forEach(column => (column.innerHTML = ''));
}

export async function searchHandler(e) {
  try {
    e.preventDefault();
    setNextPage(true);
    setIsFirstIteration(true);

    const { value } = e.target.searchString;
    setCurrentSearchTerm(value);

    // Change header logo title to search value
    const capitalizeValue = value[0].toUpperCase() + value.slice(1);
    headerTitle.textContent = capitalizeValue;
    document.title = capitalizeValue;

    const { results } = await getJSON(
        `${SEARCH_PATH}&page=1&per_page=${PER_PAGE}&query=${value}`
    );

    if(!results) return;

    clearColumns();

    e.target.searchString.value = '';
    e.target.searchString.blur();

    await createImage(results);
    setIsFirstIteration(false);
  } catch (e) {
    alert('There is something wrong when fetching images');
  }

}

export function changeShadow(e) {
  e.target.closest(
    '.search'
  ).style.boxShadow = `0 0px 8px 2px rgba(254, 12, 107, 0.3)`;
}

export function removeShadow(e) {
  e.target.closest('.search').style.boxShadow = `0 4px 10px rgba(0, 0, 0, 0.2)`;
}
