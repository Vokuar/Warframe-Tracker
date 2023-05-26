function displayWarframes() {
  var warframesList = document.getElementById("warframes-list");
  warframesList.innerHTML = "";

  warframes.forEach(function (warframe, warframeIndex) {
    var warframeItem = document.createElement("div");
    warframeItem.classList.add("warframe-item");

    var warframeName = document.createElement("h3");
    warframeName.textContent = warframe.name;
    warframeItem.appendChild(warframeName);

    var partsList = document.createElement("ul");
    partsList.classList.add("parts-list");

    warframe.parts.forEach(function (part, partIndex) {
      var partItem = document.createElement("li");
      partItem.textContent = part.name;

      var partStatusBtn = document.createElement("button");
      partStatusBtn.textContent = part.status;
      partStatusBtn.classList.add("part-status");
      partStatusBtn.addEventListener("click", function () {
        updatePartStatus(warframeIndex, partIndex);
      });
      partItem.appendChild(partStatusBtn);

      partsList.appendChild(partItem);
    });

    warframeItem.appendChild(partsList);
    warframesList.appendChild(warframeItem);
  });
}

function displayWeapons() {
  var weaponsList = document.getElementById("weapons-list");
  weaponsList.innerHTML = "";

  weapons.forEach(function (weapon, weaponIndex) {
    var weaponItem = document.createElement("div");
    weaponItem.classList.add("weapon-item");

    var weaponName = document.createElement("h3");
    weaponName.textContent = weapon.name;
    weaponItem.appendChild(weaponName);

    var ownedStatusBtn = document.createElement("button");
    ownedStatusBtn.textContent = weapon.owned ? "Owned" : "Not Owned";
    ownedStatusBtn.classList.add("owned-status");
    ownedStatusBtn.addEventListener("click", function () {
      toggleOwnedStatus(weaponIndex);
    });
    weaponItem.appendChild(ownedStatusBtn);

    weaponsList.appendChild(weaponItem);
  });
}

function updatePartStatus(warframeIndex, partIndex) {
  var part = warframes[warframeIndex].parts[partIndex];

  var status = prompt("Enter the status for the part:\n1. Missing\n2. Blueprint owned\n3. Built");

  if (status === null) {
    return; // User cancelled prompt
  }

  switch (status) {
    case "1":
      part.status = "Missing";
      break;
    case "2":
      part.status = "Blueprint owned";
      break;
    case "3":
      part.status = "Built";
      break;
    default:
      alert("Invalid status. Please enter a number between 1 and 3.");
      return;
  }

  displayWarframes();
  saveDataToLocalStorage();
}

function toggleOwnedStatus(weaponIndex) {
  weapons[weaponIndex].owned = !weapons[weaponIndex].owned;
  displayWeapons();
  saveDataToLocalStorage();
}
