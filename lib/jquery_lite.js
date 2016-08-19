/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(arg) {
	    if (arg === undefined) {
	      return this.elements[0].innerHTML;
	    } else {
	      this.elements.forEach( el => {
	        el.innerHTML = arg;
	      });
	    }
	  }

	  empty() {
	    this.elements.forEach( el => {
	      el.innerHTML = '';
	    });
	  }

	  append(arg) {
	    this.elements.forEach( el => {
	      if (arg instanceof HTMLElement) {
	        el.innerHTML += arg.outerHTML;
	      } else if (typeof arg === "string") {
	        el.innerHTML += arg;
	      } else if (arg instanceof DOMNodeCollection) {
	        arg.elements.forEach(argEl => {
	          el.innerHTML += argEl.outerHTML;
	        });
	      }
	    });
	  }

	  attr(name, value) {
	    if (value) {
	      this.elements.forEach( el => {
	        el.setAttribute(name, value);
	      });
	    } else {
	      return this.elements[0].getAttribute(name);
	    }
	  }

	  addClass(className) {
	    this.elements.forEach(el => {
	      el.classList.add(className);
	    });
	  }

	  removeClass(className) {
	    this.elements.forEach(el => {
	      el.classList.remove(className);
	    });
	  }

	  children() {
	    let children = [];
	    this.elements.forEach( el => {
	      children.push(el.children);
	    });

	    return new DOMNodeCollection(children);
	  }

	  parent() {
	    return new DOMNodeCollection([this.elements[0].parentElement]);
	  }

	  find(selector) {
	    let resultsArr = [];
	    this.elements.forEach(el => {
	      let results = el.querySelectorAll(selector);
	      resultsArr = resultsArr.concat(Array.from(results));
	    });

	    return new DOMNodeCollection(resultsArr);
	  }

	  remove() {
	    this.elements.forEach( el => {
	      el.remove();
	    });
	  }

	  on(e, cb) {
	    this.elements.forEach( el => {
	      el.addEventListener(e, cb, false);
	    });
	  }

	  off(e, cb) {
	    this.elements.forEach( el => {
	      el.removeEventListener(e, cb);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);