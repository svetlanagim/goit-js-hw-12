import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import { getImagesByQuery } from './js/pixabay-api.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let page = 1;
let totalHits = 0;

const PER_PAGE = 15;
// Обробник сабміту форми
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter search text!', position: 'topRight', });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    currentQuery = query;
    page = 1;

    const data = await getImagesByQuery(currentQuery, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    event.target.reset();

    // Показати кнопку або повідомлення про кінець колекції
    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({ message: 'Error loading images', position: 'topRight', });
  } finally {
    hideLoader();
  }
}

// Обробник кнопки Load more
loadMoreBtn.addEventListener('click', async () => {
  page++;

  // Сховати кнопку одразу, щоб користувач не натискав її повторно
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    smoothScroll();

    const loadedSoFar = page * PER_PAGE;

    if (loadedSoFar < totalHits) {
      // якщо ще є що завантажувати, показуємо кнопку знову
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading images', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

// Плавний скролл після додавання нових елементів
function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (!card) return;

  const height = card.getBoundingClientRect().height;
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}