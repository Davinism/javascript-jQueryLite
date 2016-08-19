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
