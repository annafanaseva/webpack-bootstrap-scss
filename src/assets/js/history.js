// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const previousSearchWrapper = document.getElementById("previous-search");

function showPreviousSearches() {
  previousSearchWrapper.replaceChildren();
  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    const history = document.createElement("p");
    const historyText = document.createTextNode(localStorage[key]);
    const cross = document.createElement('div');
    cross.classList.add("history-cross");
    const previousSearch = document.createElement('div');

    history.appendChild(historyText);
    previousSearch.classList.add("history-wrapper");

    previousSearch.appendChild(history)
    previousSearch.appendChild(cross)
    previousSearchWrapper.appendChild(previousSearch)

    cross.onclick = function () {
      localStorage.removeItem(key);
      showPreviousSearches(localStorage);
    }
  }
}

showPreviousSearches()
