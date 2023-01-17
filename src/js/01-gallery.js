// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

 
galleryRef.insertAdjacentHTML(
  'beforeend',
  galleryItems
    .map(
      ({ preview, original, description }) =>
        `
        <a class='gallery__item' href='${original}'>
          <img class='gallery__image' src='${preview}' alt='${description}'/>
        </a>
        `
    )
    .join("")
);
 
const options = { captionsData: 'alt', captionDelay: 250 };

const lightbox = new SimpleLightbox('.gallery a', options);
