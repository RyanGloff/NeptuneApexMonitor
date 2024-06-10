class TridentDashboardElement extends HTMLElement {

  #alkChicklet;
  #alkGraph;

  #calcChicklet;
  #calcGraph;

  #magChicklet;
  #magGraph;

  #menu;

  constructor() {
    super();
    this.#buildUI();
  }

  #buildUI() {
    const tlogPromise = requestTLog(toApexDate(getDateNDaysAgo(7)), 7);
    const statusPromise = requestStatus();
    
    Promise.all([ tlogPromise, statusPromise ])
    .then(([ tlogResult, statusResult ]) => {
      const tridentModule = statusResult.modules.filter(m => m.hwtype === 'TRI')[0];
      this.innerHTML = `
        <style>
          .triton-dashboard {
            display: inline-block;
            border: 1px solid blue;
            border-radius: 0.5rem;
            position: relative;
          }
          .triton-dashboard > .summary {
            display: inline-block;
            padding: 0.5rem;
          }
          .triton-dashboard > .summary > parameter-chicklet:hover {
            background: #CCC;
          }
          .triton-dashboard .header {
            display: flex;
            justify-content: space-between;
            padding-top: 0.5rem;
          }
          .triton-dashboard .header h1 {
            font-size: 1em;
            padding: 0 1rem;
            margin: 0;
          }
          .triton-dashboard .header .menu {
            display: grid;
            grid-template-rows: 1fr 1fr 1fr;
            border: 2px solid black;
            border-radius: 5px;
            margin: 0 1rem;
            padding: 1px 0;
          }
          .triton-dashboard .header .menu > div {
            height: 2px;
            width: 1rem;
            margin: 1.5px;
            background: black;
          }
          .triton-dashboard .options {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border: 1px solid black;
            border-radius: 1rem;
            padding: 1rem;
            background: white;
          }
          .triton-dashboard .options > h2 {
            text-align: center;
            margin: 0 3rem;
          }
          .triton-dashboard .options > .exit {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
            border: 1px solid black;
            border-radius: 3px;
            padding: 0.25rem;
            background: red;
          }
          .triton-dashboard .options ul.buttons {
            margin: 1rem 0;
          }
          .triton-dashboard .options ul.buttons li {
            padding: 0.25rem;
            border: 1px solid black;
            border-radius: 5px;
            text-align: center;
            margin: 0.25rem 0;
          }
          .triton-dashboard .options ul.buttons li:hover {
            background: #CCC;
          }
          .triton-dashboard .options .usage-values > div {
            display: flex;
            justify-content: space-between;
          }
          .triton-dashboard .options .usage-values > div > div {
            display: inline-block;
          }
        </style>
        <div class="triton-dashboard">
          <div class="header">
            <h1>Trident - ${tridentModule.extra.status.toUpperCase() || 'Status'}</h1>
            <div class="menu">
              <!-- Horizontal bars for the menu icon -->
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="summary">
            <parameter-chicklet
              name="Alkalinity"
              value="${this.#getParameterValueFromStatus(statusResult, 'alk')}">
            </parameter-chicklet>
            <parameter-chicklet
              name="Calcium"
              value="${this.#getParameterValueFromStatus(statusResult, 'ca')}">
            </parameter-chicklet>
            <parameter-chicklet
              name="Magnesium"
              value="${this.#getParameterValueFromStatus(statusResult, 'mg')}">
            </parameter-chicklet>
          </div>
          <div class="graphs">
            <div class="alkalinity" hidden>
              Alkalinity Graph Here
            </div>
            <div class="calcium" hidden>
              Calcium Graph Here
            </div>
            <div class="magnesium" hidden>
              Magnesium Graph Here
            </div>
          </div>
          <div class="options" hidden>
            <h2>Options</h2>
            <div class="exit">X</div>
            <ul class="buttons">
              <li parameter="Alkalinity">Start Alkalinity Test</li>
              <li parameter="Combined">Start Combined Test</li>
            </ul>
            <div class="usage-values">
              <div>
                <div>Reagent A</div>
                <div>${(tridentModule.extra.levels[4]/2.5).toFixed(0)}%</div>
              </div>
              <div>
                <div>Reagent B</div>
                <div>${(tridentModule.extra.levels[3]/2.5).toFixed(0)}%</div>
              </div>
              <div>
                <div>Reagent C</div>
                <div>${(tridentModule.extra.levels[2]/2.5).toFixed(0)}%</div>
              </div>
              <div>
                <div>Waste</div>
                <div>${(tridentModule.extra.levels[0]/20).toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </div>
      `;
        this.#setupEventListenersOnChicklets();
        this.#setupMenu();
    });

    
  }

  #getParameterValueFromStatus(status, type) {
    return status.inputs.filter(input => input.type === type)[0].value;
  }

  #setupMenu() {
    const menu = this.querySelector('.triton-dashboard .menu');
    const options = this.querySelector('.triton-dashboard > .options');
    menu.addEventListener('click', e => {
      if (options.getAttribute('hidden') === null) {
        options.setAttribute('hidden', '');
      } else {
        options.removeAttribute('hidden');
      }
    });
    const optionCloseBtn = this.querySelector('.triton-dashboard > .options > .exit');
    optionCloseBtn.addEventListener('click', e => options.setAttribute('hidden', ''));
    const startAlkTestBtn = this.querySelector('.triton-dashboard > .options > .buttons > li[parameter="Alkalinity"]');
    startAlkTestBtn.addEventListener('click', e => triggerTridentTest('Alkalinity'));
    const startCombinedTestBtn = this.querySelector('.triton-dashboard > .options > .buttons > li[parameter="Combined"]');
    startCombinedTestBtn.addEventListener('click', e => triggerTridentTest('Combined'));
  }

  #setupEventListenersOnChicklets() {
    this.#alkChicklet = this.querySelector('parameter-chicklet[name="Alkalinity"]');
    this.#alkGraph = this.querySelector('.graphs > .alkalinity');
    this.#alkChicklet.addEventListener('click', e => {
      if (this.#alkChicklet.getAttribute('active') === null) {
        this.#alkChicklet.setAttribute('active', '');
        this.#alkGraph.removeAttribute('hidden');
      } else {
        this.#alkChicklet.removeAttribute('active');
        this.#alkGraph.setAttribute('hidden', '');
      }
    });
    this.#calcChicklet = this.querySelector('parameter-chicklet[name="Calcium"]');
    this.#calcGraph = this.querySelector('.graphs > .calcium');
    this.#calcChicklet.addEventListener('click', e => {
      if (this.#calcChicklet.getAttribute('active') === null) {
        this.#calcChicklet.setAttribute('active', '');
        this.#calcGraph.removeAttribute('hidden');
      } else {
        this.#calcChicklet.removeAttribute('active');
        this.#calcGraph.setAttribute('hidden', '');
      }
    });
    this.#magChicklet = this.querySelector('parameter-chicklet[name="Magnesium"]');
    this.#magGraph = this.querySelector('.graphs > .magnesium');
    this.#magChicklet.addEventListener('click', e => {
      if (this.#magChicklet.getAttribute('active') === null) {
        this.#magChicklet.setAttribute('active', '');
        this.#magGraph.removeAttribute('hidden');
      } else {
        this.#magChicklet.removeAttribute('active');
        this.#magGraph.setAttribute('hidden', '');
      }
    });
  }

}

customElements.define('trident-dashboard', TridentDashboardElement);
