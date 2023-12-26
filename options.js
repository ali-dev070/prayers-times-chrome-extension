document.addEventListener('DOMContentLoaded', () => {
  // Get the settings form
  const settingsForm = document.getElementById('settings-form');

  // Get the country dropdown element
  const countryDropdown = document.getElementById('country');

  // Fetch a list of countries from countries.json
  fetch('countries.json')
    .then(response => response.json())
    .then(countries => {
      // Populate the dropdown with country options
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name; // Use the country name as the value
        option.text = country.name;
        countryDropdown.add(option);
      });

      // Set the initial value of the dropdown based on saved settings
      chrome.storage.sync.get({ country: 'New Zealand' }, (data) => {
        countryDropdown.value = data.country;
      });
    });

  // Retrieve saved settings
  chrome.storage.sync.get({
    showSunriseSunset: true, // Default value
    city: 'Christchurch', // Default city
    method: 2 // Default calculation method
  }, (data) => {
    // Set initial values of form elements
    countryDropdown.value = data.country; // Dropdown value already set above
    document.getElementById('method').value = data.method;
    document.getElementById('showSunriseSunset').checked = data.showSunriseSunset;
  });

  // Handle form submission
  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const showSunriseSunset = document.getElementById('showSunriseSunset').checked;

    // Save settings
    chrome.storage.sync.set({
      showSunriseSunset,
      city: document.getElementById('city').value,
      country: countryDropdown.value, // Use the dropdown value
      method: document.getElementById('method').value
    }, () => {
      // Notify user of saved settings
      alert('Settings saved successfully!');

      // Optionally, refresh the popup to reflect the changes immediately
      chrome.runtime.reload();
//	  chrome.runtime.sendMessage({ action: 'showPopup' });

    });
  });
});