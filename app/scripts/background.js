'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
    chrome.tabs.executeScript(null, {code: 'intro();'});
});

chrome.tabs.onUpdated.addListener(function (tabId) {
    chrome.pageAction.show(tabId);
});

/**
 * Get location from an url
 * @param  {String} url Url to parse
 * @return {Object}      location object
 * @return {Object.hostname}      location host
 * @return {Object.pathname}      location path
 */
var getLocation = function(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    return anchor;
};

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab ) {

    // Hide page action as defaul
    chrome.pageAction.hide(tabId);

    if( changeInfo.status === 'complete' ) {
        if( tab && tab.url ) {
            // Check if we are at github
            var location = getLocation(tab.url);
            if (location && location.hostname && location.hostname.indexOf('github') !== -1) {
                chrome.pageAction.show(tabId);
                chrome.tabs.executeScript(null, {code: 'init();'});
            }
        }
    }
});