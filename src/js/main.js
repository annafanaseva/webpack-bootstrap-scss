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

let previousSearches = [];
function fillPreviousSearches(data) {
  // for (let i = 0; i <= 20; i++) {
  //   for (let j = 0; j < data.lenght; j++) {
  //console.log(data[j].value);
  previousSearches.push(data);
  //   }
  // }
  console.log(previousSearches[0][0].value);
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

const forms = document.querySelectorAll('.needs-validation')
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      }
      if (form.checkValidity()) {
        serializeForm(form);
      }

      form.classList.add('was-validated')
    }, false)
  })


//Nav links
const collapseFlights = document.getElementById("collapseFlights");
const collapseHotels = document.getElementById("collapseHotels");
const collapseCars = document.getElementById("collapseCars");
const history = document.getElementById("history");

document.getElementById("collapseFlightsLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseCars.classList.remove("show");
  history.classList.remove("show");
});

document.getElementById("collapseHotelsLink").addEventListener("click", () => {
  collapseFlights.classList.remove("show");
  collapseCars.classList.remove("show");
  history.classList.remove("show");
});

document.getElementById("collapseCarsLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseFlights.classList.remove("show");
  history.classList.remove("show");
});

document.getElementById("historyLink").addEventListener("click", () => {
  collapseHotels.classList.remove("show");
  collapseFlights.classList.remove("show");
  collapseCars.classList.remove("show");
});

//Compare date
// Array.prototype.slice.call(forms)
//   .forEach(function (form) {
//     form.addEventListener('submit', function () {
//       console.log(new Date(document.getElementById("flights-start-date").value));

//     });
//   })

function compareDate(startDate, endDate) {
  if (new Date(startDate) >= new Date(endDate)) {

  }
}

