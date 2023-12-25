document.addEventListener('DOMContentLoaded', () => {
  // Get the settings form
  const settingsForm = document.getElementById('settings-form');

  // Retrieve saved settings
  chrome.storage.sync.get({
    showSunriseSunset: true // Default value
  }, (data) => {
    document.getElementById('showSunriseSunset').checked = data.showSunriseSunset;
  });

  // Handle form submission
  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const showSunriseSunset = document.getElementById('showSunriseSunset').checked;

    // Save settings
    chrome.storage.sync.set({ showSunriseSunset }, () => {
      // Notify user of saved settings
      alert('Settings saved successfully!');
    });
  });
});
