import React, { Component } from "react";
import Navbar from "../../assets/components/Navbar/Navbar";
import Searchbar from "../../assets/components/Searchbar/Searchbar";
import Vignette from "../../assets/components/Vignette/Vignette.js";
import Footer from "../../assets/components/Footer/Footer.js";

/*style import*/
import "./style.scss";
import { getNodeText } from "@testing-library/react";

class CategorieProduit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  componentDidMount() {
    this.getProductCategorie();
  }
  // avec compenentdidmount il recharger pas la page des categorie
  //il faut faire appel a la componentdidupdate
  componentDidUpdate(prevprops) {
    if (prevprops.match.params.category != this.props.match.params.category) {
      this.getProductCategorie();
    }
  } // if match.params.category(ancien) est different du lien demandé donc affiché le lien demandé
  getProductCategorie = async () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    });
    const options = {
      method: "GET",

      headers: headers,
    };
    try {
      let url =
        "http://localhost:4000/products/category/" +
        this.props.match.params.category;
      let response = await fetch(url, options);

      const data = await response.json();

      this.setState({ category: data });
    } catch (err) {
      console.log(err);
    }
  };

  display = () => {
    let contentDisplay = [];
    this.state.category.forEach((element, index) => {
      contentDisplay.push(
        <Vignette
          key={index}
          image={element.picture[0].original} /// il faueut ajouter le nom de la propriete
          prix={element.price}
          title={element.travel_name}
          description={element.short_description}
        />
      );
    });

    return contentDisplay;
  };

  render() {
    return (
      <div className="wrapper">
        <Searchbar />
        <div className="categorieProduitTitre">
          <h1>Vacances à la {this.props.match.params.category}</h1>
          <p>
            Réservez en toute confiance - nous proposons des conditions de
            <br />
            réservation souples pendant la crise du COVID-19.
          </p>
        </div>
        <div className="categorieProduitTexte">
          <p>
            Découvrez nos stages et séjours surf dans nos différentes
            destinations :
            <br />
            France, Portugal, Maroc, Bali, Costa Rica... Quelque soit la durée
            de vos vacances , adoptez le rythme de la vie dans votre camp,
            <br />
            découvrez les plus beaux spots des environs et profitez de conseils
            de moniteurs expérimentés. Formules 2 à 14 jours en <br />
            demi-pension ou tout compris. Nombreuses activités annexes
            disponibles (yog, vtt, rando...).
          </p>
        </div>
        <div className="vignette-container">{this.display()}</div>

        <div className="categorieProduitTexteDuBas">
          <p>
            L'équipe MARTINE VOYAGE sélectionne pour vous les meilleurs
            activités sur les spots du monde entiers, en fonction de la qualité
            <br />
            du cadre et de l'hébergement, de l'esprit des hôtes et de la qualité
            pédagogique des moniteurs, qui tous détenteur d'un diplôme d'état
            <br />( ou équivalent).
          </p>
        </div>
      </div>
    );
  }
}

export default CategorieProduit;
