import React, { Component } from "react";

import "./style.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
        <div className="footer-contact">
          <h2> Nous sommes à votre service</h2>
          <div className="block">
            <div className="colonne email">
              <h4>Contactez-nous par e-mail</h4>
              <span> Envoyez-nous un message à l'adresse suivante </span>
              <span> bonjourmartine@martinevoyage.com</span>
            </div>
            <div className="colonne telephone">
              <h4>Contactez-nous par telephone</h4>
              <p> Nous sommes à votre service au </p>
              <a href="tel:0000000000">09 08 07 05 04 </a>
            </div>
            <div className="colonne resaux-sociaux">
              <h4>Suivez nos aventures</h4>
              <a href="https://facebook.fr">
                <i class="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://instagram.fr">
                <i class="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://twitter.fr">
                <i class="fab fa-twitter fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-infos">
          <img src="/images/logo.png" alt="logo"></img>
          <p>Les séjours</p>
          <p>Qui sommes-nous ?</p>
          <p>Mention légales</p>
          <p>CGV</p>
        </div>
      </div>
    );
  }
}

export default Footer;
