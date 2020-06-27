import { LitElement, html, css } from "lit-element";

class BasicElement extends LitElement {
  static get properties() {
    return {
      name: { type: String }
    };
  }

  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <div class="card ">
        <h4
          class="d-flex align-items-center justify-content-center card-header bg-primary text-white "
        >
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
            />
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button type="button" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
      <br />
      <div class="alert alert-success" role="alert">
        Bienvenido xxx
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-success">Log out</button>
        </div>
      </div>

      <div class="alert alert-danger" role="alert">
        password incorrecto, intenta de nuevo
        <br />
        <br />
        <div class="d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-danger">reintentar</button>
        </div>
      </div>
    `;
  }
}

customElements.define("basic-element", BasicElement);
