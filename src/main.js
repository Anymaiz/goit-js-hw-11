import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';

import { fetchPhotos } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#search-form');
    const input = form.querySelector('input');
  
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const query = input.value.trim();
  
      if (!query) {
        iziToast.error({ 
            title: 'Error', 
            message: 'Please enter your request.' 
        });
        return;
      }
  
      document.querySelector('.loader').classList.remove('hidden');
  
      try {
        const images = await fetchPhotos(query);
        if (images.length === 0) {
          iziToast.info({
            title: 'No Results',
            message: 'Sorry, your request is incorrect. Please try again!',
          });
        } else {
            createGallery(images);
          const lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
          lightbox.refresh();
        }
      } catch (error) {
        iziToast.error({ 
            title: 'Error', 
            message: 'Sorry, there was an error. Please try again!' });
      } finally {
        document.querySelector('.loader').classList.add('hidden');
      }
    });
  });