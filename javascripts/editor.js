const components = {};

components.card = class extends PageEditor.GridComponentEditor() {
  initializeProperties() {
    this.properties.image = { type: "image", target: this.image, attribute: "src" };
    this.properties.link = { type: "link", target: this.link, attribute: "href" };
    super.initializeProperties();
  }

  create() {
    const wrapper = document.createElement("div");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const content = document.createElement("div");

    content.innerHTML = "<h2>Lorem Ipsum</h2><p>Dolor sit ahmet.</p>";
    content.dataset.editable = '';
    wrapper.appendChild(link);
    link.appendChild(content);
    link.appendChild(image);
    this.root.appendChild(wrapper);
    super.create();
  }

  bindElements() {
    this.wrapper = this.root.children[0];
    this.link = this.wrapper.children[0];
    this.content = this.link.children[0];
    this.image = this.link.children[1];
    this.link.addEventListener("click", event => {
      event.preventDefault();
      return false;
    });
    super.bindElements();
  }
}

components.picture = class extends PageEditor.ImageComponentEditor {
  create() {
    const wrapper = document.createElement("div");
    const frame   = document.createElement("div");
    const figure  = document.createElement("figure");
    const inner   = document.createElement("div");
    let   image;

    figure.appendChild(inner);
    frame.appendChild(figure);
    wrapper.appendChild(frame);
    this.root.appendChild(wrapper);
    super.create();
    image = this.root.querySelector("img");
    inner.appendChild(image);
  }
}

components.slider = class extends PageEditor.SliderComponentEditor {
  constructor(parent, element) {
    const sliderComponents = {};
    for (let comp in components) {
      if (comp != "slider") { sliderComponents = components[comp]; }
    }
    super(parent, element, sliderComponents);
  }
}

components.section = class extends PageEditor.BackgroundComponentEditor(PageEditor.GridComponentEditor(PageEditor.NestedComponentEditor)) {
  constructor(parent, element) {
    super(parent, element, components);
  }

  create() {
    const wrapper = document.createElement("div");
    const content = document.createElement("div");
    const container = document.createElement("div");

    PageEditor.GridComponentEditor.decorateContainer(container);
    content.innerHTML = "<h2>Lorem Ipsum</h2><p>Dolor sit ahmet</p>";
    content.dataset.editable = '';
    wrapper.appendChild(content);
    wrapper.appendChild(container);
    this.root.appendChild(wrapper);
    super.create();
  }

  bindElements() {
    this.wrapper = this.root.children[0];
    this.content = this.wrapper.children[0];
    this.grid = this.wrapper.children[1];
    super.bindElements();
  }

  get container() {
    return this.grid;
  }
}

components.gallery = class extends PageEditor.GridComponentEditor() {
  initializeProperties() {
    this.properties.images = { type: "images", target: this, attribute: "images" };
    this.properties.height = { type: "number", target: this.root.dataset, attribute: "height", min: 0 };
    this.properties.items = { type: "number", target: this.root.dataset, attribute: "items", min: 1 };
    this.properties.interval = { type: "number", target: this.root.dataset, attribute: "interval", min: 0 };
    super.initializeProperties();
  }

  create() {
    const wrapper = document.createElement("div");

    this.root.appendChild(wrapper);
    super.create();
  }

  bindElements() {
    this.wrapper = this.root.lastElementChild;
    super.bindElements();
  }

  get images() {
    const array = [];
    for (let child of this.root.querySelectorAll("img")) {
      array.push({
        url:           child.attributes.src.value,
        miniature_url: child.dataset.thumb,
        name:          child.dataset.name
      });
    }
    return JSON.stringify(array);
  }

  set images(value) {
    this.reset();
    value = JSON.parse(value);
    value.forEach(file => {
      const img = document.createElement("img");
      img.src           = file.url;
      img.dataset.thumb = file.miniature_url;
      img.dataset.name  = file.name;
      this.wrapper.appendChild(img);
    });
  }

  reset() {
    const elements = this.root.querySelectorAll("img");
    elements.forEach(element => element.remove());
  }
};

class HomeHeaderSlide extends PageEditor.BackgroundComponentEditor(PageEditor.NestedComponentEditor) {
  constructor(parent, element) {
    super(parent, element, components);
  }

  create() {
    const wrapper = document.createElement("div");
    const content = document.createElement("div");
    const children = document.createElement("div");

    content.innerHTML = "<h2>New home header slide</h2><p>Feel free to add your own content</p>";
    content.dataset.editable = '';
    PageEditor.GridComponentEditor.decorateContainer(children);
    wrapper.appendChild(content);
    wrapper.appendChild(children);
    this.root.appendChild(wrapper);
    super.create();
  }

  bindElements() {
    this.wrapper = this.root.firstElementChild;
    this.childrenContainer = this.wrapper.lastElementChild;
    super.bindElements();
  }

  get container() {
    return this.childrenContainer;
  }
}

class HomeHeaderComponent extends PageEditor.SliderComponentEditor {
  constructor(parent, element) {
    super(parent, element, {
      slide: HomeHeaderSlide
    });
  }
}

class TheatreLayoutEditor extends PageEditor.LayoutEditor {
  constructor(element) {
    super(element, {
      home_header: HomeHeaderComponent,
      section: components.section,
      slider: components.slider
    });
  }
}
