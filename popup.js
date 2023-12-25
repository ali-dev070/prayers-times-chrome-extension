document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({
    showSunriseSunset: true,
    city: 'Christchurch',
    country: 'New Zealand',
    method: 2
  }, (data) => {
    fetchXmlData(data.showSunriseSunset, data.city, data.country, data.method);
  });
});

function fetchXmlData(showSunriseSunset, city, country, method) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}&date=${formattedDate}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayData(data, showSunriseSunset))
    .catch(error => console.error('Error fetching data:', error));
}

function displayData(data, showSunriseSunset) {
  const dataContainer = document.getElementById('data-container');
  const timings = data.data.timings;

  const filteredTimings = Object.entries(timings)
    .filter(([name]) => {
      if (showSunriseSunset) {
        return name !== 'Imsak' && name !== 'Midnight' && name !== 'Firstthird' && name !== 'Lastthird';
      } else {
        return name !== 'Imsak' && name !== 'Sunset' && name !== 'Midnight' && name !== 'Firstthird' && name !== 'Lastthird';
      }
    })
    .map(([name, time]) => {
      const [hours, minutes] = time.split(':');
      const hours12 = hours % 12 || 12;
      const isPM = hours >= 12;
      const amPm = isPM ? 'PM' : 'AM';

      return `
        <div class="timing-item">
          <div class="prayer">${name}: </div><span class="time">${hours12}:${minutes} ${amPm}</span><br/><br/>
        </div>
      `;
    });

  dataContainer.innerHTML = `
    <h3>Fianz Prayer Times</h3>
    <div class="timing-container">${filteredTimings.join('')}</div>
  `;
}
/** Response is as:
HTTP/1.1 200 OK
{
	"code":200,
	"status":"OK",
	"data":{
		"timings":{
			"Fajr":"03:56",
			"Sunrise":"05:46",
			"Dhuhr":"13:29",
			"Asr":"17:35",
			"Sunset":"21:12",
			"Maghrib":"21:12",
			"Isha":"23:02",
			"Imsak":"03:46",
			"Midnight":"01:29",
			"Firstthird":"00:03",
			"Lastthird":"02:55"
		}
	}
}
*/