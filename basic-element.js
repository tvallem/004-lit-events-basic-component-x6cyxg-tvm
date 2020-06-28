import { LitElement, html, css } from "lit-element";

class BasicElement extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      email: { type: String },
      password: { type: String },
      logged: { type: Boolean },
      error: { type: Boolean },
      correctEmail: { type: String },
      correctPassword: { type: String }
    };
  }

  constructor() {
    super();
    this.email="";
    this.password="";
    this.logged=false;
    this.error=false;
    this.correctEmail="t@t.com";
    this.correctPassword="1234";
  }

  createRenderRoot() {
    return this;
  }

  get loginForm(){
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
              @keyup = "${(e) => {this._setEmail(e.target.value)}}"
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
              placeholder="Password"
              .value = "${this.password}"
              @keyup = "${(e) => {this._setPassword(e.target.value)}}"              
            />
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button type="button" 
            class="btn btn-primary"
            @click = "${(e) => this._handleSummit()}" >Submit</button>
          </div>
        </div>
      </div>
    `;
  }

  get successMessage(){
    return html`
      <div class="alert alert-success" role="alert">
        Bienvenido ${this.email}
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-success" @click="${(e) => this._handleLogOut()}">Log out</button>
      </div>
    `;
  }

  get errorMessage(){
    return html`
      <div class="alert alert-danger" role="alert">
        password incorrecto, intenta de nuevo
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-danger" @click="${(e) => this._handleRetry()}">reintentar</button>
        </div>
      </div>
    `;
  }

  render() {
    if (this.logged){
      return this.successMessage;
    }

    if (this.error){
      return this.errorMessage;
    }

    return this.loginForm;
  }

  _setEmail(value){
    this.email = value;
  }
  _setPassword(value){
    this.password = value;
  }
  _handleSummit(){
    if (this.correctEmail === this.email && this.correctPassword === this.password){
      this.logged = true;
      return true;
    } 
    
    this.error = true;
    return false;
  }
  _handleLogOut(){
    this.logged = false;
    this.error = false;
    this.email = "";
    this.password = "";    
  }
  _handleRetry(){
    this.logged = false;
    this.error = false;
    this.email = "";
    this.password = "";
  }
  
}

customElements.define("basic-element", BasicElement);
