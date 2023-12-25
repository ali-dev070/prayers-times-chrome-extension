document.addEventListener('DOMContentLoaded', () => {
	// Get the settings form
	const settingsForm = document.getElementById('settings-form');

	// Retrieve saved settings
	chrome.storage.sync.get({
		showSunriseSunset: true, // Default value
		city: 'Christchurch', // Default city
		country: 'New Zealand', // Default country
		method: 2 // Default calculation method
	}, (data) => {
    // Set initial values of form elements
    document.getElementById('city').value = data.city;
    document.getElementById('country').value = data.country;
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
      country: document.getElementById('country').value,
      method: document.getElementById('method').value
    }, () => {
      // Notify user of saved settings
      alert('Settings saved successfully!');

      // Optionally, refresh the popup to reflect the changes immediately
      // chrome.runtime.reload();
    });
	
  });
});
