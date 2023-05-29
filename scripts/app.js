// app.js
document.addEventListener('DOMContentLoaded', function() {
  var warframeTab = document.getElementById('warframeTab');
  var weaponTab = document.getElementById('weaponTab');
  var warframeContent = document.getElementById('warframeContent');
  var weaponContent = document.getElementById('weaponContent');
  var saveButton = document.getElementById('saveButton');

  warframeTab.addEventListener('click', function() {
    warframeTab.classList.add('active');
    weaponTab.classList.remove('active');
    warframeContent.style.display = 'block';
    weaponContent.style.display = 'none';
  });

  weaponTab.addEventListener('click', function() {
    warframeTab.classList.remove('active');
    weaponTab.classList.add('active');
    warframeContent.style.display = 'none';
    weaponContent.style.display = 'block';
  });

  saveButton.addEventListener('click', function() {
    saveDataToLocalStorage();
  });

  // Populate Warframe List
  var warframeList = document.getElementById('warframeList');
  warframes.forEach(function(warframe) {
    var warframeItem = document.createElement('li');
    warframeItem.textContent = warframe.name;
    warframeList.appendChild(warframeItem);
  });

  // Populate Weapon List
  var weaponList = document.getElementById('weaponList');
  weapons.forEach(function(weapon) {
    var weaponItem = document.createElement('li');
    weaponItem.textContent = weapon.name;
    weaponList.appendChild(weaponItem);
  });
});
