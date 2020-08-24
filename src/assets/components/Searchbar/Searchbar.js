import React, { Component } from "react";

import "./style.scss";

class Recherche extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="searchBarre">
        <div className="barreDeRecherche">
          <button className="buttonDeRecherche">
            <i class="fas fa-search"></i>
          </button>
          <label for="recherche"></label>
          <input
            type="search"
            id="recherche"
            name="recherche"
            aria-label="Search through site content"
            placeholder="rechercher sur le site"
          ></input>
        </div>
      </div>
    );
  }
}

export default Recherche;
