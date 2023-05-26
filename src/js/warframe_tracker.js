// warframe_tracker.js

var warframes = [];
var weapons = [];

var partNames = ["Chassis", "Neuroptics", "Systems", "Main Blueprint"];
var partStatuses = ["Missing", "Blueprint owned", "Built"];

function addWarframe() {
  // Retrieve warframe data from the Warframe Wiki API
  fetch('https://warframe.fandom.com/api.php?action=parse&page=Warframes&prop=links&format=json')
    .then(response => response.json())
    .then(data => {
      var warframeLinks = data.parse.links;
      var warframeNames = warframeLinks.map(link => link['*']);

      // Prompt for warframe name
      var warframeName = prompt("Select a Warframe:", warframeNames[0]);
      if (!warframeName) {
        return; // User cancelled prompt
      }

      // Prompt for prime status
      var isPrime = confirm("Is this a Prime Warframe?");

      var owned = confirm("Do you own this Warframe?");

      warframes.push({ name: warframeName, prime: isPrime, owned: owned, parts: [] });
      displayWarframes();
      saveDataToLocalStorage();
    })
    .catch(error => {
      console.error('Error retrieving warframe data:', error);
    });
}

function addWeapon() {
  var weaponName = prompt("Enter the Weapon name:");
  var owned = confirm("Do you own this Weapon?");

  weapons.push({ name: weaponName, owned: owned });
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

function addWarframePart(warframeIndex) {
  if (warframes[warframeIndex].parts.length >= 4) {
    alert("You can only add up to 4 parts.");
    return;
  }

  var partName = createDropdown(partNames, "Select part name:");
  var partStatus = createDropdown(partStatuses, "Select part status:");

  warframes[warframeIndex].parts.push({ name: partName, status: partStatus });
  displayWarframes();
  saveDataToLocalStorage();
}

function removeWarframePart(warframeIndex, partIndex) {
  warframes[warframeIndex].parts.splice(partIndex, 1);
  displayWarframes();
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
    warframeItem.textContent = warframes[i].name;
    warframeItem.appendChild(removeButton);

    var partsList = document.createElement("ul");
    for (var j = 0; j < warframes[i].parts.length; j++) {
      var partItem = document.createElement("li");
      var removePartButton = document.createElement("button");
      removePartButton.textContent = "Remove Part";
      removePartButton.onclick = (function(warframeIndex, partIndex) {
        return function() {
          removeWarframePart(warframeIndex, partIndex);
        };
      })(i, j);
      partItem.textContent = warframes[i].parts[j].name + " - " + warframes[i].parts[j].status;
      partItem.appendChild(removePartButton);
      partsList.appendChild(partItem);
    }

    var addPartButton = document.createElement("button");
    addPartButton.textContent = "Add Part";
    addPartButton.onclick = (function(index) {
      return function() {
        addWarframePart(index);
      };
    })(i);

    warframeItem.appendChild(partsList);
    warframeItem.appendChild(addPartButton);
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
    weaponItem.textContent = weapons[i].name;
    weaponItem.appendChild(removeButton);
    weaponsList.appendChild(weaponItem);
  }
}

function createDropdown(options, promptText) {
  var dropdown = prompt(promptText, options[0]);
  if (!dropdown) {
    return ""; // User cancelled prompt
  }
  if (!options.includes(dropdown)) {
    alert("Invalid option. Please select from the provided options.");
    return createDropdown(options, promptText);
  }
  return dropdown;
}

function saveDataToLocalStorage() {
  var data = {
    warframes: warframes,
    weapons: weapons
  };
  localStorage.setItem("warframeTrackerData", JSON.stringify(data));
}

function loadDataFromLocalStorage() {
  var data = localStorage.getItem("warframeTrackerData");
  if (data) {
    data = JSON.parse(data);
    warframes = data.warframes || [];
    weapons = data.weapons || [];
  }
}

// Initialize the tabs and load data from local storage on page load
window.onload = function() {
  loadDataFromLocalStorage();

  document.getElementById("warframes-tab").addEventListener("click", function() {
    displayWarframes();
  });

  document.getElementById("weapons-tab").addEventListener("click", function() {
    displayWeapons();
  });

  document.getElementById("add-warframe-btn").addEventListener("click", addWarframe);

  document.getElementById("add-weapon-btn").addEventListener("click", function() {
    addWeapon();
  });
};
