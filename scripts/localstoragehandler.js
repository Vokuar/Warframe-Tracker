// localstoragehandler.js
function saveDataToLocalStorage() {
  var data = {
    warframes: warframes,
    weapons: weapons
  };
  localStorage.setItem("warframeTrackerData", JSON.stringify(data));

  // Check if the backend URL is accessible
  fetch('https://your-backend-url.com')
    .then(response => {
      if (response.ok) {
        // Backend is accessible, save data to the backend
        return fetch('https://your-backend-url.com/save-data', {
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
      } else {
        // Backend is down, do nothing
        console.log('Backend is down. Data will only be saved to local storage.');
        return Promise.resolve();
      }
    })
    .catch(error => {
      console.error('Error checking backend accessibility:', error);
    });
}


// Check if the backend URL is accessible
fetch('https://your-backend-url.com')
  .then(response => {
    if (response.ok) {
      // Backend is accessible, save data to the backend
      return fetch('https://your-backend-url.com/save-data', {
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
    } else {
      // Backend is down, do nothing
      console.log('Backend is down. Data will only be saved to local storage.');
      return Promise.resolve();
    }
  })
  .catch(error => {
    console.error('Error checking backend accessibility:', error);
  });
}
