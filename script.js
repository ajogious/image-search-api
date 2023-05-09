'use strict';

// const apiKey = //*** put your key here ***//

const inputBox = document.querySelector('.form__input');
const inputBtn = document.querySelector('.btn--primary');
const galleryBox = document.querySelector('.gallery');
const moreBtn = document.querySelector('.btn--secondary');

let currentPage = 1;

function handleSubmit(event) {
  currentPage = 1;
  const inputBoxValue = inputBox.value.trim();

  // === fetching data === //
  fetchImages(inputBoxValue);
  event.preventDefault();
}

async function fetchImages(image) {
  try {
    const results = await searchImages(image);
    resultDisplayer(results);
  } catch (error) {
    alert('Failed to search Images');
  }
}

async function searchImages(image) {
  const url = `https://api.unsplash.com/search/photos?query=${image}&per_page=30&page=${currentPage}&client_id=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

function resultDisplayer(results) {
  const resultsGet = results.results.map((result) => {
    const newDivEl = document.createElement('div');
    newDivEl.className = 'gallery__image';
    const resultImg = result.urls.small;
    const resultLink = result.links.html;
    const resultLinkAlt = result.alt_description;

    newDivEl.innerHTML = `<a href="${resultLink}" target="_blank"
    class="gallery__link"
  ><img
      src="${resultImg}"
      alt="${resultLinkAlt}"
      class="gallery-img"
    /><p class="paragraph--primary">${resultLinkAlt}</p>
  </a>`;

    galleryBox.appendChild(newDivEl);
  });

  if (galleryBox.innerHTML !== '') {
    document.querySelector('.call-to-action').style.display = 'block';

    return resultsGet;
  }
}

inputBtn.addEventListener('click', handleSubmit);

moreBtn.addEventListener('click', () => {
  currentPage += 1;
  const inputBoxValue = inputBox.value.trim();

  // === fetching data === //
  fetchImages(inputBoxValue);
  console.log(currentPage);
});
