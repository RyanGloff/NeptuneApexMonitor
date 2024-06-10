class ApexDashboard extends HTMLElement {

  constructor() {
    super();
    this.#buildUI();
  }

  #buildUI() {
    requestStatus()
      .then(res => {
        this.innerHTML = `
<div class="apex-dashboard module">
  <div class="header">
    <h1>Apex</h1>
  </div>
  <div class="summary">
    <parameter-chicklet
      name="pH"
      value="${res.inputs.filter(input => input.type === 'pH')[0].value}">
    </parameter-chicklet>
    <parameter-chicklet
      name="Temp"
      value="${res.inputs.filter(input => input.type === 'Temp')[0].value}">
    </parameter-chicklet>
  </div>
</div>
`;
      });
  }

}

customElements.define('apex-dashboard', ApexDashboard);
