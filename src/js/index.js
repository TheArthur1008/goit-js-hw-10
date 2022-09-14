import '../css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCounries } from './fetchCountries';
import counrtyCardTemp from '../country-card.hbs';
import counrtyCardTempList from '../country-card-list.hbs';


const DEBOUNCE_DELAY = 300;

const counryInputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryInfoEl = document.querySelector(".country-info");

counryInputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(event) {
  const countryName = event.target.value.trim();
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = ''; 

  if (countryName === '') {
     return;
    }

    fetchCounries(countryName).then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
       } else if (response.length === 1) {
            renderCountry(response[0]);
        } else if (response.length > 1 && response.length <= 10) {
        countryListEl.innerHTML = counrtyCardTempList(response);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountry({
  name,
  flags,
  languages,
  capital,
  population,
}) {
  const languagesDestr = Object.values(languages).map(el => ' ' + el);

  const markup = counrtyCardTemp({
    name,
    flags,
    population,
    capital,
    languagesDestr,
  });

  countryInfoEl.innerHTML = markup;
};








