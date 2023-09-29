'use strict';
// This line enables strict mode in JavaScript. When strict mode is enabled,
//  it helps catch common
//  coding mistakes and "unsafe" actions, making your code more reliable and less error-prone.

// chrome.tabs.create({ ... });: This is a method call to the chrome.tabs.create function, 
// which is part of the Chrome Extensions API. This function is used to create a new browser tab.
chrome.tabs.create({
  url:"https://www.google.com/",
  active: true,
});