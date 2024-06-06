class ParameterGraphElement extends HTMLElement {

  static observedAttributes =  ['parameter', 'numDays'];

  #parameter;
  #numDays;

  #requestingData = false;

  constructor() {
    super();
    this.#buildUI();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`AttributeChanged: ${oldValue} to ${newValue}`);
    switch (name) {
      case 'parameter':
        this.#parameter = newValue;
        break;
      case 'numDays':
        this.#numDays = newValue;
        break;
      default:
        break;
    }
    this.#buildUI();
  }

  #buildUI() {
    this.#requestingData = true;
    requestParameterHistory(this.#parameter, this.#numDays)
      .then(res => {
        this.innerHTML = JSON.stringify(res);
      });
  }

}

customElements.define('parameter-graph', ParameterGraphElement);
