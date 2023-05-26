// src/js/localStorageHandler.js

function saveDataToLocalStorage() {
  var data = {
    warframes: warframes,
    weapons: weapons
  };
  localStorage.setItem("warframeTrackerData", JSON.stringify(data));

  // Save data to your backend
  fetch('https://your-backend-url.com/save-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to save data to the backend.');
    }
    console.log('Data saved to the backend successfully.');
  })
  .catch(error => {
    console.error('Error saving data to the backend:', error);
  });
}
