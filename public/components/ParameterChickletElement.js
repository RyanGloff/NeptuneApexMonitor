class ParameterChickletElement extends HTMLElement {

  static observedAttributes = [ 'name', 'value' ];

  constructor() {
    super();

    this.#buildUI();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#buildUI();
  }

  #buildUI() {
    this.innerHTML = `
      <div class="parameter-reading">
        <div>${this.getAttribute('value')}</div>
        <p>${this.getAttribute('name')}</p>
      </div>
    `;
  }

}

customElements.define('parameter-chicklet', ParameterChickletElement);
