// warframe_tracker.js

var warframes = [];
var weapons = [];

function addWarframe() {
  var warframeName = prompt("Enter the Warframe name:");
  warframes.push(warframeName);
  displayWarframes();
  saveDataToLocalStorage();
}

function addWeapon() {
  var weaponName = prompt("Enter the Weapon name:");
  weapons.push(weaponName);
  displayWeapons();
  saveDataToLocalStorage();
}

function removeWarframe(index) {
  warframes.splice(index, 1);
  displayWarframes();
  saveDataToLocalStorage();
}

function removeWeapon(index) {
  weapons.splice(index, 1);
  displayWeapons();
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

function getWarframes() {
  // Make an API call to the Warframe Wiki to retrieve the list of warframes
  // and populate the warframes array
  axios
    .get("https://warframe.wiki/api.php?action=parse&page=Warframes&format=json")
    .then(function(response) {
      var warframesData = response.data.parse.text["*"];
      // Parse the warframesData and extract the relevant information
      // to populate the warframes array

      // Example: Parsing the HTML response using DOM manipulation
      var parser = new DOMParser();
      var html = parser.parseFromString(warframesData, "text/html");
      var warframeElements = html.querySelectorAll(".warframes-table tbody tr");

      warframes = [];
      warframeElements.forEach(function(warframeElement) {
        var warframeName = warframeElement.querySelector("td:first-child").textContent;
        warframes.push(warframeName);
      });

      displayWarframes();
      saveDataToLocalStorage();
    })
    .catch(function(error) {
      console.log("Error retrieving warframes:", error);
    });
}

function getWeapons() {
  // Make an API call to the Warframe Wiki to retrieve the list of weapons
  // and populate the weapons array
  axios
    .get("https://warframe.wiki/api.php?action=parse&page=Weapons&format=json")
    .then(function(response) {
      var weaponsData = response.data.parse.text["*"];
      // Parse the weaponsData and extract the relevant information
      // to populate the weapons array

      // Example: Parsing the HTML response using DOM manipulation
      var parser = new DOMParser();
      var html = parser.parseFromString(weaponsData, "text/html");
      var weaponElements = html.querySelectorAll(".weapons-table tbody tr");

      weapons = [];
      weaponElements.forEach(function(weaponElement) {
        var weaponName = weaponElement.querySelector("td:first-child").textContent;
        weapons.push(weaponName);
      });

      displayWeapons();
      saveDataToLocalStorage();
    })
    .catch(function(error) {
      console.log("Error retrieving weapons:", error);
    });
}

// Load data from local storage on page load
window.onload = function() {
  loadDataFromLocalStorage();
};

// Initialize the tabs
document.getElementById("warframes-tab").addEventListener("click", function() {
  getWarframes();
});

document.getElementById("weapons-tab").addEventListener("click", function() {
  getWeapons();
});
