class ParameterDashboard extends HTMLElement {

  constructor() {
    super();
    this.#buildUI();
  }

  #buildUI() {
    requestStatus()
      .then(res => {
        console.log(res);
        this.innerHTML = `
          <parameter-chicklet name="pH" value="${res.inputs.filter(input => input.type === 'pH')[0].value}"></parameter-chicklet>
          <parameter-chicklet name="Temp" value="${res.inputs.filter(input => input.type === 'Temp')[0].value}"></parameter-chicklet>
          <parameter-chicklet name="Alk" value="${res.inputs.filter(input => input.type === 'alk')[0].value}"></parameter-chicklet>
          <parameter-chicklet name="Calc" value="${res.inputs.filter(input => input.type === 'ca')[0].value}"></parameter-chicklet>
          <parameter-chicklet name="Mag" value="${res.inputs.filter(input => input.type === 'mg')[0].value}"></parameter-chicklet>
          <parameter-chicklet name="RegA" value="${(this.#getTridentLevels(res)[4]/2.5).toFixed(0)}%"></parameter-chicklet>
          <parameter-chicklet name="RegB" value="${(this.#getTridentLevels(res)[3]/2.5).toFixed(0)}%"></parameter-chicklet>
          <parameter-chicklet name="RegC" value="${(this.#getTridentLevels(res)[2]/2.5).toFixed(0)}%"></parameter-chicklet>
          <parameter-chicklet name="unknown" value="${(this.#getTridentLevels(res)[1])}"></parameter-chicklet>
          <parameter-chicklet name="Waste" value="${(this.#getTridentLevels(res)[0]/20).toFixed(0)}%"></parameter-chicklet>
        `;
      });
  }

  #getTridentLevels(status) {
    return status.modules.filter(m => m.hwtype === 'TRI')[0].extra.levels;
  }

}

customElements.define('parameter-dashboard', ParameterDashboard);
