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
      <style>
      .parameter-reading {
        position: relative;
        border: 1px solid red;
        border-radius: 0.5rem;
        display: inline-block;
        padding: 1rem;
        padding-bottom: 2rem;
      }
      .parameter-reading > div {
        font-size: 2rem;
      }
      .parameter-reading > p {
        position: absolute;
        margin: 0;
        left: 50%;
        bottom: 0.25rem;
        transform: translateX(-50%);
      }
      </style>
      <div class="parameter-reading">
        <div>${this.getAttribute('value')}</div>
        <p>${this.getAttribute('name')}</p>
      </div>
    `;
  }

}

customElements.define('parameter-chicklet', ParameterChickletElement);
