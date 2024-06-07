class ParameterGraphElement extends HTMLElement {

  static observedAttributes =  ['parameter', 'numDays'];

  #parameter;
  #numDays;
  #startDay;

  constructor() {
    super();
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
      case 'startDay':
        this.#startDay = newValue;
        break;
      default:
        break;
    }
    this.#buildUI();
  }

  #buildUI() {
    requestTLog(this.#startDay || toApexDate(getDateNDaysAgo(7)), this.#numDays || 7)
      .then(res => {
        console.log(res);
        this.innerHTML = JSON.stringify(res);
      });
  }

}

customElements.define('parameter-graph', ParameterGraphElement);
