import {tns} from "tiny-slider/src/tiny-slider.js";

function loadOptionsFrom(element, wrapper) {
  const interval = parseFloat(element.dataset.interval) || 0;
  return {
    container:       wrapper || element,
    controls:        false,
    nav:             false,
    autoplayButtonOutput: false,
    mode:            element.dataset.mode || "carousel",
    items:           element.dataset.items || 1,
    autoplay:        interval > 0,
    autoplayTimeout: interval * 1000,
    responsive:      window.cmsSliderResponsiveOptions || false,
    lazyload:        true,
    mouseDrag:       true,
    fixedHeight:     element.dataset.height || 0
  };
}

function loadSlider(element) {
  const wrapper = element.lastElementChild;
  const options = loadOptionsFrom(element, wrapper.lastElementChild);

  for (let slide of options.container.children)
    options.fixedHeight = Math.max(options.fixedHeight, slide.offsetHeight);
  for (let slide of options.container.children)
    slide.style.height = options.fixedHeight;
  element.$slider = tns(options);
}

function loadGallery(element) {
  const wrapper = element.lastElementChild;
  const options = loadOptionsFrom(element, wrapper);

  if (options.fixedHeight) {
    for (let slide of options.container.children)
      slide.style.height = options.fixedHeight;
  }
  element.$slider = tns(options);
}

export function loadSliders() {
  for (let element of document.querySelectorAll("[data-component=slider], [data-component=home_header]")) {
    loadSlider(element);
  }
  for (let element of document.querySelectorAll("[data-component=gallery]")) {
    loadGallery(element);
  }
}

window.tns = tns;
