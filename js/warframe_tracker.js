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

function displayWarframes() {
  var warframesList = document.getElementById("warframes-list");
  warframesList.innerHTML = "";
  for (var i = 0; i < warframes.length; i++) {
    var warframeItem = document.createElement("li");
    warframeItem.textContent = warframes[i];
    warframesList.appendChild(warframeItem);
  }
}

function displayWeapons() {
  var weaponsList = document.getElementById("weapons-list");
  weaponsList.innerHTML = "";
  for (var i = 0; i < weapons.length; i++) {
    var weaponItem = document.createElement("li");
    weaponItem.textContent = weapons[i];
    weaponsList.appendChild(weaponItem);
  }
}
