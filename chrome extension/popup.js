chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method === "getLocalStorage") {
      sendResponse({data: localStorage[request.key]});
    }
    else {
      sendResponse({}); 
    }
});

window.onload = function(){
    
    var $evhActive = document.querySelector('#evhActive');
    var $evhAutomatic = document.querySelector('#evhAutomatic');
    var evh = JSON.parse(localStorage['evheadless'] || "{}");

        if(evh.active) { $evhActive.click(); }
        if(evh.automate) { $evhAutomatic.click(); }
        
        $evhActive.addEventListener('change', function(){
            evh.active = this.checked;
            localStorage['evheadless'] = JSON.stringify(evh);

            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.reload(tab.id);
            });
        });

        $evhAutomatic.addEventListener('change', function(){
            evh.automate = this.checked;
            localStorage['evheadless'] = JSON.stringify(evh);
        
            chrome.tabs.getSelected(null, function(tab) {
                chrome.tabs.reload(tab.id);
            });
        });
        
};
