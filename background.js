chrome.runtime.onInstalled.addListener(() => {
  // Perform actions when the extension is first installed
  console.log('Extension installed!');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'closeOptionsAndShowPopup') {
    closeOptionsAndShowPopup();
  } else if (message.action === 'showPopup') {
//    chrome.action.openPopup("popup.html");
	//    chrome.runtime.openOptionsPage();
	chrome.runtime.openPopup("popup.html");
  }
});

function closeOptionsAndShowPopup() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.remove(tabs[0].id);
//    chrome.runtime.openOptionsPage();
	chrome.runtime.openPopup("popup.html");
  });
}