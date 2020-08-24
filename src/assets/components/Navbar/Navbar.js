/*module imports*/
import React, { Component } from "react";

/*style import*/
import "./style.scss";
import { Link } from "react-router-dom";

/*main app component*/
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <Link to="/">
          <img src="/images/logonoir.png" className="logo" />
        </Link>

        <nav>
          <ul>
            <li className="dropDown">
              <a>
                <i class="fas fa-cart-arrow-down"></i>
              </a>
            </li>

            
            <li className="dropDown">
              <Link to="/FilesUploadComponent">
                <a>admin</a>
              </Link>
            </li>
            <li className="dropDown">
              <Link to="/Inscription">
                <a>
                  <i class="fas fa-sign-in-alt"></i>
                </a>
              </Link>
            </li>


            <li className="dropDown">
              <Link to="/Connexion">
                <a>
                  <i class="far fa-user"></i>
                </a>
              </Link>
            </li>


            <li className="dropDown">
              <a>inspirez-moi</a>
            </li>

            <li className="dropDown">
              <Link to="/je-pars-quand">
                <a>Je pars quand?</a>
              </Link>
              <ul className="dropDownChild">
                <Link to="/je-pars-quand/hiver">
                  <a> En hiver</a>
                </Link>
                <Link to="/je-pars-quand/ete">
                  <a>En été</a>
                </Link>
              </ul>
            </li>

            <li className="dropDown">
              <Link to="/Je-pars-ou">
                <a>Je pars ou?</a>
              </Link>
              <ul className="dropDownChild">
                <Link to="/Je-pars-ou/mer">
                  <a> En mer</a>
                </Link>
                <Link to="/Je-pars-ou/montagne">
                  <a>En montagne</a>
                </Link>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="homeImage">
          <img src="/images/mer-montagne.jpg" alt="mer-montagne" />
        </div>
      </div>
    );
  }
}

export default App;
