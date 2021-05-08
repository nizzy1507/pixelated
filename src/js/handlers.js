export async function handleSubmit(e) {
  e.preventDefault();
  const { value } = e.target.searchString;
  currentSearchTerm = value;

  const capitalizeValue = value.slice(0, 1).toUpperCase() + value.slice(1);
  headerTitle.textContent = capitalizeValue;
  document.title = capitalizeValue;

  const { results } = await getJSON(
    `${SEARCH_PATH}&page=1&per_page=${PER_PAGE}&query=${value}`
  );
  clearColumns();
  e.target.searchString.value = '';
  e.target.searchString.blur();
  createImage(results);
}

export function changeShadow(e) {
  e.target.closest(
    '.search'
  ).style.boxShadow = `0 0px 8px 2px rgba(254, 12, 107, 0.3)`;
}

export function removeShadow(e) {
  e.target.closest('.search').style.boxShadow = `0 4px 10px rgba(0, 0, 0, 0.2)`;
}

// export { handleSubmit, changeShadow, removeShadow };
