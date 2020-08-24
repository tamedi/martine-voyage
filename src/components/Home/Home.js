import React, { Component } from "react";
import Footer from "../../assets/components/Footer/Footer.js";
import Vignette from "../../assets/components/Vignette/Vignette.js";
import Navbar from "../../assets/components/Navbar/Navbar";
import Searchbar from "../../assets/components/Searchbar/Searchbar";
/**
 * * Import Barre de recherche
 */
import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travel: [],
    };
  }

  async componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "GET",

      headers: headers,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/products/new-travels",
        options
      );

      const data = await response.json();

      await this.setState({ travel: data });
    } catch (err) {
      console.log(err);
    }
  }

  display = () => {
    let contentDisplay = [];
    this.state.travel.forEach((element, index) => {
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
      <div className="home-page">
        <Searchbar />
        <h2>Les nouveaux voyages de Martine</h2>

        <div className="display">{this.display()}</div>
        <p className="home-paragraphe">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
          massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci
          nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl
          sit ci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris
          ac
        </p>
      </div>
    );
  }
}

export default Home;
