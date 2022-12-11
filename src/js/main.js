// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


const countrySelect = document.getElementById("country-select");
const stateSelect = document.getElementById("state-select");
const citySelect = document.getElementById("city-select");


let countryId;
let state;

//chooseCountry
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
getCountries.then((data) => {
  countrySelect.addEventListener('change', () => {
    let selectedCountry = countrySelect.options[countrySelect.selectedIndex].value;
    console.log(selectedCountry);
    countryId = Object.keys(data).find(key => data[key] === selectedCountry);
    console.log(countryId);
  })

  fetch('https://namaztimes.kz/ru/api/states?id=' + 98)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(countryId);
      for (let state of Object.values(data)) {
        const option = document.createElement("option");
        option.innerHTML = state;
        stateSelect.appendChild(option);
      }

      // stateSelect.addEventListener('change', () => {
      //   let selectedState = stateSelect.options[stateSelect.selectedIndex].value;
      //   state = Object.keys(data).find(key => data[key] === selectedState);
      //   resolve(state);
      //   console.log(state);
      // })
    });
});

//chooseCity
// getState.then((state) => {
//   const getCity = new Promise((resolve, reject) => {
//   fetch('https://namaztimes.kz/ru/api/cities?id=' + state + '&type=json)')
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       for (let city of Object.values(data)) {
//         //console.log(data);
//         const option = document.createElement("option");
//         option.innerHTML = city;
//         citySelect.appendChild(option);
//       }
//     });
//   })
// });

//Validation
const forms = document.querySelectorAll('.needs-validation')
Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
