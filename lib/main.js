const DOMNodeCollection = require("./dom_node_collection.js");
const functionsQueue = [];

window.$l = function(selector) {
  if (selector instanceof Function) {
    functionsQueue.push(selector);
    document.addEventListener("DOMContentLoaded", (event) => {
      functionsQueue.forEach( func => {
        func();
      });
    });
  } else {
    const elements = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(elements);
  }
};

window.$l.extend = function(...args) {
  let resultsObj = {};
  args.forEach(arg => {
    resultsObj = resultsObj.assign(arg);
  });

  return resultsObj;
};

window.$l.ajax = function() {

};
