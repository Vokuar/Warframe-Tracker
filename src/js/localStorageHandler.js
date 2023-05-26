// localStorageHandler.js

function saveDataToLocalStorage() {
  localStorage.setItem("warframes", JSON.stringify(warframes));
  localStorage.setItem("weapons", JSON.stringify(weapons));
}

function loadDataFromLocalStorage() {
  var warframesData = localStorage.getItem("warframes");
  if (warframesData) {
    warframes = JSON.parse(warframesData);
    displayWarframes();
  }

  var weaponsData = localStorage.getItem("weapons");
  if (weaponsData) {
    weapons = JSON.parse(weaponsData);
    displayWeapons();
  }
}
