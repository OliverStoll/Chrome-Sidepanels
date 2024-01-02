// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


// create a chrome tab listener that logs all events with the current window
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo);
    // log the new url and the old url
    console.log(tab.url);
    console.log(changeInfo.url);
});