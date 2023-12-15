import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

let catInfoMarkup = '';

const hideElement = element => element.classList.add('visually-hidden');
const showElement = element => element.classList.remove('visually-hidden');
function addLoading() {
  Loading.dots('Loading data, please wait...', {
    messageColor: '#2d4262',
    messageFontSize: '15px',
    backgroundColor: ' rgba(115, 96, 91, 0.655)',
    svgColor: '#2d4262',
  });
}
function addError() {
  Report.failure(
    'Oops! Something went wrong!',
    'Try reloading the page!',
    'Okay',
    {
      backgroundColor: ' rgba(207, 149, 129, 0.449) ',
      failure: {
        backOverlayColor: 'rgba(54, 50, 55, 0.696)',
        svgColor: '#8d230f',
        buttonBackground: '#8d230f',
      },
    }
  );
}

// hideElement(error);
// showElement(loader);
addLoading();

hideElement(select);
hideElement(catInfo);
function onError() {
  //   hideElement(loader);
  Loading.remove();
  //   showElement(error);
  addError();
}
fetchBreeds()
  .then(resp => {
    const breedMarkup = resp
      .map(({ id, name }) => `<option  value="${id}"> ${name} </option>`)
      .join('');

    select.insertAdjacentHTML('beforeend', breedMarkup);
  })
  .then(resp => {
    showElement(select);
    // hideElement(loader);
    Loading.remove();
    new SlimSelect({
      select: '#breed-select',
      settings: {
        placeholderText: 'Select cat breed',
      },
    });
  })
  .catch(onError);

const onChange = evt => {
  //   showElement(loader);
  //   Loading.dots('Loading data, please wait...');
  addLoading();
  hideElement(catInfo);
  const catId = evt.currentTarget.value;

  fetchCatByBreed(catId)
    .then(resp => {
      const { url, breeds } = resp[0];

      catInfo.innerHTML = ` 
  <img  src="${url}" alt="${breeds[0].name}" />
        <div class="description-wrapper">
          <h2 class="cat-breed">${breeds[0].name}</h2>
          <ul class="description-list">
            <li class="temperament">${breeds[0].temperament}</li>
            <li class="description">${breeds[0].description}</li>
          </ul>
        </div>
`;
    })
    .then(resp => {
      setTimeout(() => {
        showElement(catInfo);
        // hideElement(loader);
        Loading.remove();
      }, 500);
    })
    .catch(onError);
};

select.addEventListener('change', onChange);
