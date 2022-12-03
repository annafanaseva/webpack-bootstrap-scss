// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");

//chooseCountry
function getCountries() {
  fetch('https://namaztimes.kz/ru/api/country?type=json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let country of Object.values(data)) {
        const option = document.createElement("option");
        option.innerHTML = country;
        countrySelect.appendChild(option);
      }
    });
}

getCountries();

//chooseCountry
function getCities() {
  fetch('https://namaztimes.kz/ru/api/cities?id='+'almaty'+'&type=json)')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      for (let city of Object.values(data)) {
        console.log(city);
        const option = document.createElement("option");
        option.innerHTML = city;
        citySelect.appendChild(option);
      }
    });
}

getCountries();
getCities();
``
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
