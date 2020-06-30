import { LitElement, html, css } from "lit-element";

class BasicMessage extends LitElement {
  static get properties() {
    return {
      texto: { type: String },
      tipo: { type: String },
      evento: { type: String },
    };
  }

  constructor() {
    super();
    this.texto="";
    this.texto="";
    this.evento="";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="alert alert-${this.tipo}" role="alert">
        ${this.texto}
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-${this.tipo}" @click="${(e) => this._eventLogOut()}">${this.tipo=="success" ? "Log out": "Reintentar" }</button>
      </div>
    `;
  }

  _eventLogOut(){
    console.log("Evento de log-out");
    this.dispatchEvent(new CustomEvent("event-log-out", { detail: {message: 'Saliendo'},  bubbles: true, 
    composed: true}));
  }
}

customElements.define("basic-message", BasicMessage);