// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const flightCountrySelectFrom = document.getElementById("flight-country-select-from");
const flightCountrySelectTo = document.getElementById("flight-country-select-to");
const hotelsCountrySelect = document.getElementById("hotels-country-select");
const carsCountrySelect = document.getElementById("cars-country-select");

const flightStateSelectFrom = document.getElementById("flight-state-select-from");
const flightStateSelectTo = document.getElementById("flight-state-select-to");
const hotelsStateSelect = document.getElementById("hotels-state-select");
const carsStateSelect = document.getElementById("cars-state-select");

const flightCitySelectFrom = document.getElementById("flight-city-select-from");
const flightCitySelectTo = document.getElementById("flight-city-select-to");
const hotelsCitySelect = document.getElementById("hotels-city-select");
const carsCitySelect = document.getElementById("cars-city-select");

//chooseCountry
function getCountries(countrySelect, stateSelect, citySelect) {
  let countryId;
  let state;
  const getCountries = new Promise((resolve, reject) => {
    fetch('https://namaztimes.kz/ru/api/country?type=json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
        for (let country of Object.values(data)) {
          const option = document.createElement("option");
          option.innerHTML = country;
          countrySelect.appendChild(option);
        }
      });
  })

  countrySelect.addEventListener('change', () => {
    citySelect.replaceChildren();
    stateSelect.replaceChildren();
    getCountries.then(function getCountryId(data) {
      let selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;
      countryId = Object.keys(data).find(key => data[key] === selectedCountry);
      return countryId;
    })
      .then(function displayState(countryId) {
        fetch(`https://namaztimes.kz/ru/api/states?id=${countryId}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            stateSelect.replaceChildren();

            for (let state of Object.values(data)) {
              const option = document.createElement("option");
              option.innerHTML = state;
              stateSelect.appendChild(option);
            }

            stateSelect.addEventListener('change', () => {
              let selectedState = stateSelect.options[stateSelect.selectedIndex].value;
              state = Object.keys(data).find(key => data[key] === selectedState);

              fetch(`https://namaztimes.kz/ru/api/cities?id=${state}&type=json`)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  citySelect.replaceChildren();

                  for (let city of Object.values(data)) {
                    const option = document.createElement("option");
                    option.innerHTML = city;
                    citySelect.appendChild(option);
                  }
                });
            })
          })
      })
  });
}

//Fill select

document.getElementById("collapseFlightsLink").addEventListener("click", () => {
  getCountries(flightCountrySelectFrom, flightStateSelectFrom, flightCitySelectFrom);
  getCountries(flightCountrySelectTo, flightStateSelectTo, flightCitySelectTo);
});

document.getElementById("collapseHotelsLink").addEventListener("click", () => {
  getCountries(hotelsCountrySelect, hotelsStateSelect, hotelsCitySelect);
});

document.getElementById("collapseCarsLink").addEventListener("click", () => {
  getCountries(carsCountrySelect, carsStateSelect, carsCitySelect);
});

function addItemsToLocalStorage(history) {
  if (localStorage.length >= 20) {
    for (let key in localStorage) {
      localStorage.clear();
    }
  }
  localStorage.setItem(history, history);
}

function fillPreviousSearches(data) {
  let history = [];
  for (let key in data) {
    history.push(data[key].value);
  }
  addItemsToLocalStorage(history);
}

function serializeForm(formNode) {
  const { elements } = formNode
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element
      return { name, value }
    })
  fillPreviousSearches(data);
}

//Validation

const flightsForm = document.getElementById('flightsForm');
const hotelsForm = document.getElementById('hotelsForm');
const carsForm = document.getElementById('carsForm');

function validation(form) {
  let result = true;
  const allInputs = form.querySelectorAll('input');

  function createError(input, text) {
    const parent = input.parentNode;
    const errorfeedback = document.createElement('p');
    errorfeedback.classList.add("error-feedback");
    errorfeedback.textContent = text;

    parent.classList.add('error');
    console.log(parent.childNodes)
    parent.append(errorfeedback);
  }

  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains("error")) {
      parent.querySelector(".error-feedback").remove();
      parent.classList.remove('error');
    }
  }

  for (const input of allInputs) {
    removeError(input);
    if (input.valueAsNumber < Date.now()) {
      createError(input, "Incorrect date");
      result = false;
    }
  }

  if (allInputs.length > 1) {
    if (allInputs[0].valueAsNumber > allInputs[1].valueAsNumber) {
      for (const input of allInputs) {
        createError(input, "Choose correct start date");
        result = false;
      }
    }
  }

  return result;
}

// Submit and serialize form

flightsForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validation(this)) {
    serializeForm(this);
    alert("Form was sent");
    this.reset();
  }
})

hotelsForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validation(this)) {
    serializeForm(this);
    alert("Form was sent");
    this.reset();
  }
})

carsForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validation(this)) {
    serializeForm(this);
    alert("Form was sent");
    this.reset();
  }
})

//Nav links

const collapseFlights = document.getElementById("collapseFlights");
const collapseHotels = document.getElementById("collapseHotels");
const collapseCars = document.getElementById("collapseCars");
const historyWrapper = document.getElementById("history");

document.getElementById("collapseFlightsLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseCars.classList.remove("show");
  historyWrapper.classList.remove("show");
});

document.getElementById("collapseHotelsLink").addEventListener("click", () => {
  collapseFlights.classList.remove("show");
  collapseCars.classList.remove("show");
  historyWrapper.classList.remove("show");
});

document.getElementById("collapseCarsLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseFlights.classList.remove("show");
  historyWrapper.classList.remove("show");
});

document.getElementById("historyLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseFlights.classList.remove("show");
  collapseCars.classList.remove("show");
});

document.getElementById("historyLink").addEventListener("click", () => {
  showPreviousSearches();
});

//History

const previosSearchWrapper = document.getElementById("previous-search");

function showPreviousSearches() {
  previosSearchWrapper.replaceChildren();
  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    const history = document.createElement("p");
    const historyText = document.createTextNode(localStorage[key]);
    const cross = document.createElement('div');
    cross.classList.add("history-cross");
    const previosSearch = document.createElement('div');

    history.appendChild(historyText);
    previosSearch.classList.add("history-wrapper");

    previosSearch.appendChild(history)
    previosSearch.appendChild(cross)
    previosSearchWrapper.appendChild(previosSearch)

    cross.onclick = function () {
      localStorage.removeItem(key);
      showPreviousSearches(localStorage);
    }
  }
}
