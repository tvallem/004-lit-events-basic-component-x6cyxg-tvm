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
      correctPassword: { type: String },
      validEmail: { type: Boolean },
      validPasswd: { type: Boolean },
      buttonDisable: { type: String },
      message: { type: String }
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
    this.validEmail=false;
    this.validPasswd=false;
    this.buttonDisable="disabled"; //El botón Submit está deshabilitado por defecto
    this.message="";
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

  get successMessage(){
    return html`
      <basic-message texto="Bienvenido ${this.email}" tipo="success"></basic-message>
    `;
    /* Solución inicial del ejercicio sin extras
    return html`
      <div class="alert alert-success" role="alert">
        Bienvenido ${this.email}
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-success" @click="${(e) => this._handleLogOut()}">Log out</button>
      </div>
    `;
    */
  }

  get errorMessage(){
    return html`
      <basic-message texto="Password incorrecto, intenta de nuevo" tipo="danger"></basic-message>
      <!--
      <div class="alert alert-danger" role="alert">
        password incorrecto, intenta de nuevo
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-danger" @click="${(e) => this._handleRetry()}">reintentar</button>
        </div>
      </div>
      -->
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
    //console.log('Email: '+this.email + ". validEmail: "+ this.validEmail);
  }
  _setPassword(value){
    this.password = value;
    this._validatePasswordLength(this.password);
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
  //Funcion que compruebe si el email introducido es un email, mientras no lo sea, deshabilita el boton de submit
  _validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      this.validEmail = true;
      //this.buttonDisable = "";
      this._handleDisable();
      //console.log("validEmail: "+this.validEmail + ". Disable: " + this.buttonDisable);
      return true;
    }
    //console.log("Validación de email no pasada. validEmail: "+this.validEmail);
    //this.buttonDisable = "disabled";
    this._handleDisable();
    //console.log("Disable: " + this.buttonDisable);
    return false;
  }
  //Funcion que compruebe si el password es de al menos 4 caracteres, si no lo es, el boton de sumbit debe de estar deshabilitado
  _validatePasswordLength(passwd){
    if (passwd.length >= 4){
      this.validPasswd = true;
      this._handleDisable();
      //console.log("Pass length: "+this.password.length + ". validPasswd : " + this.validPasswd);
      //console.log("Mensaje: " + this.message);
      return true;
    }
    this.validPasswd = false;
    this._handleDisable();
    //console.log("Pass length: "+this.password.length + ". validPasswd : " + this.validPasswd);
    //console.log("Mensaje: " + this.message);
    return false;
  }
  //función de controla el estado del botón Submit. Lo habilita si el email es un email válido y la password tiene 4 o más caracteres
  _handleDisable(){
    if ( this.validEmail && this.validPasswd){
      this.buttonDisable = "";
      return "";
    }
    this.buttonDisable = "disabled";
  }

  _handleMessage(){
    if ( this.validPasswd ){
      this.message="";
      return this.message;
    }
    this.message="Password toooooo short";
    return this.message;
  }
  
}

customElements.define("basic-element", BasicElement);
