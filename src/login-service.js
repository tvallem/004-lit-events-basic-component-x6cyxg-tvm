import { LitElement, html, css } from "lit-element";

class LoginService extends LitElement {
  static get properties() {
    return {
      email: { type: String },
      password: { type: String },
    };
  }

  constructor() {
    super();
    this.email="";
    this.password="";
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="card ">
        <h4 class="d-flex align-items-center justify-content-center card-header bg-primary text-white ">
          Login
        </h4>
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              .value = "${this.email}"
              @keyup = "${(e) => {this._setEmail(e.target.value);
                                  this._validateEmail(e.target.value)}}"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              aria-describedby="passAlert"
              placeholder="Password"
              .value = "${this.password}"
              @keyup = "${(e) => {this._setPassword(e.target.value)}}"
              @blur="${this._handleMessage}"              
            />
            <small id="passAlert" class="form-text text-muted"
              >${this.message}</small
            >
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button type="button" 
            class="btn btn-primary"
            ?disabled=${this.buttonDisable}
            @click = "${(e) => this._handleSummit()}" >Submit</button>
          </div>
        </div>
      </div>
    `;
  }

  _eventLogOut(){
    console.log("Evento de log-out");
    this.dispatchEvent(new CustomEvent("event-log-out", { detail: {message: 'Saliendo'},  bubbles: true, 
    composed: true}));
  }
}

customElements.define("login-service", LoginService);