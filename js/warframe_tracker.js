// warframe_tracker.js

var warframes = [];
var weapons = [];

function addWarframe() {
  var warframeName = prompt("Enter the Warframe name:");
  warframes.push(warframeName);
  displayWarframes();
  saveDataToCookies();
  saveDataToLocalStorage();
}

function addWeapon() {
  var weaponName = prompt("Enter the Weapon name:");
  weapons.push(weaponName);
  displayWeapons();
  saveDataToCookies();
  saveDataToLocalStorage();
}

function removeWarframe(index) {
  warframes.splice(index, 1);
  displayWarframes();
  saveDataToCookies();
  saveDataToLocalStorage();
}

function removeWeapon(index) {
  weapons.splice(index, 1);
  displayWeapons();
  saveDataToCookies();
  saveDataToLocalStorage();
}

function displayWarframes() {
  var warframesList = document.getElementById("warframes-list");
  warframesList.innerHTML = "";
  for (var i = 0; i < warframes.length; i++) {
    var warframeItem = document.createElement("li");
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = (function(index) {
      return function() {
        removeWarframe(index);
      };
    })(i);
    warframeItem.textContent = warframes[i];
    warframeItem.appendChild(removeButton);
    warframesList.appendChild(warframeItem);
  }
}

function displayWeapons() {
  var weaponsList = document.getElementById("weapons-list");
  weaponsList.innerHTML = "";
  for (var i = 0; i < weapons.length; i++) {
    var weaponItem = document.createElement("li");
    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = (function(index) {
      return function() {
        removeWeapon(index);
      };
    })(i);
    weaponItem.textContent = weapons[i];
    weaponItem.appendChild(removeButton);
    weaponsList.appendChild(weaponItem);
  }
}

function saveDataToCookies() {
  document.cookie = "warframes=" + JSON.stringify(warframes);
  document.cookie = "weapons=" + JSON.stringify(weapons);
}

function saveDataToLocalStorage() {
  localStorage.setItem("warframes", JSON.stringify(warframes));
  localStorage.setItem("weapons", JSON.stringify(weapons));
}

function loadDataFromCookies() {
  var warframesCookie = getCookie("warframes");
  if (warframesCookie) {
    warframes = JSON.parse(warframesCookie);
    displayWarframes();
  }

  var weaponsCookie = getCookie("weapons");
  if (weaponsCookie) {
    weapons = JSON.parse(weaponsCookie);
    displayWeapons();
  }
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

function getCookie(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

// Load data from cookies and local storage on page load
window.onload = function() {
  loadDataFromCookies();
  loadDataFromLocalStorage();
};
