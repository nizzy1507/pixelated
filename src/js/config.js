const API_KEY = 'njoEGSVM1C30H5iE5R6UXka00WSvWeRR-5wnwnakLpo';

export const API_PATH = `https://api.unsplash.com/photos/?client_id=${API_KEY}`;

export const SEARCH_PATH = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}`;

export const PER_PAGE = 24;

// Init states
export let page = 1;
export function setNextPage(isInitial = false) {
  if (isInitial) {
    page = 1;
    return;
  }

  page++;
  return page;
}

export let currentSearchTerm;
export function setCurrentSearchTerm(searchTerm) {
  currentSearchTerm = searchTerm;
  return currentSearchTerm;
}

export let isFirstIteration = true;
export function setIsFirstIteration(boolean) {
  isFirstIteration = boolean;
  return isFirstIteration;
}
