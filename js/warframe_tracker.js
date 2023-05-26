// warframe_tracker.js

var warframes = [];
var weapons = [];

function addWarframe() {
  var warframeName = prompt("Enter the Warframe name:");
  warframes.push(warframeName);
  displayWarframes();
}

function addWeapon() {
  var weaponName = prompt("Enter the Weapon name:");
  weapons.push(weaponName);
  displayWeapons();
}

function removeWarframe(index) {
  warframes.splice(index, 1);
  displayWarframes();
}

function removeWeapon(index) {
  weapons.splice(index, 1);
  displayWeapons();
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

function getDataFromWiki(wikiUrl) {
  axios.get(wikiUrl)
    .then(function(response) {
      // Parse the response data and extract the required information
      // You'll need to inspect the HTML structure of the Warframe Wiki to determine the data extraction process
      // Update the code here to extract the desired information from the response data
      var data = response.data;
      
      // Process the data as needed
      // ...
    })
    .catch(function(error) {
      console.log("An error occurred while retrieving data from the Warframe Wiki:", error);
    });
}
