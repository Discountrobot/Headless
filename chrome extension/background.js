// add the page action, if we're on the right domain.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.indexOf('eovendo.com') !== -1) {
    chrome.pageAction.show(tabId);
  }
});

// return localStorage data upon request.
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "getLocalStorage") {
      sendResponse({data: localStorage[request.key]});
    } else {
      sendResponse({});
    }
});