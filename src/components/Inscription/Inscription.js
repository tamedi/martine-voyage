import React, { Component } from "react";
import Navbar from "../../assets/components/Navbar/Navbar";
import Footer from "../../assets/components/Footer/Footer.js";

/*style import*/
import "./style.scss";

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: null,
      firstname: null,
      email: null,
      tel: null,
      password: null,
      hobbies: null,
    };
  }

  /*fonction pour ecrire dans nos input*/
  change = (event) => {
    this.setState({
      [event.target.id]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  addNewRegister = (e) => {
    e.preventDefault();
    const data = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      email: this.state.email,
      tel: this.state.tel,
      password: this.state.password,
      hobbies: this.state.hobbies,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/profil/register", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  /*submit = (event) => {
    event.preventDefault(); //empecher le formulaire de recharger la page
    console.log(this.state); // envoyé le contenu du formulaire dans la console
  };*/
  render() {
    return (
      <div className="wrapper">
        <div className="identifiants">
          <h3>Création de votre compte client</h3>
          <form /*onSubmit={this.submit}*/>
            <label htmlFor="lastname">
              Nom<sup>*</sup>{" "}
            </label>
            <br />
            <input
              type="text"
              id="lastname"
              placeholder="Nom"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="firstname">
              Prénom <sup>*</sup>{" "}
            </label>
            <br />
            <input
              type="text"
              id="firstname"
              placeholder="Prénom"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="tel">
              Numéro de téléphone <sup>*</sup>{" "}
            </label>
            <br />
            <input
              type="tel"
              id="tel"
              placeholder="06XXXXXXXX"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="email">
              e-mail<sup>*</sup>{" "}
            </label>
            <br />
            <input
              type="email"
              id="email"
              placeholder="exemple@hotmail.com"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="password">
              Mot de passe<sup>*</sup>{" "}
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="***********"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="hobbies">Hobbies</label>
            <br />
            <input
              type="text"
              id="hobbies"
              placeholder="Randonnée, Plongée, Ski, Surf, ... "
              onChange={this.change}
            />{" "}
            <br />
            <input
              type="checkbox"
              name="conditions"
              id="conditions"
              onChange={this.change}
            />
            <label for="conditions" className="CGU">
              J'ai lu et j'accepte les CGU.
            </label>
            <br />
            <p className="asterisque">
              Les champs marqués d'un astérisque ( * ) sont obligatoires.
            </p>
            <button type="submit" onClick={this.addNewRegister}>
              Enregistrer
            </button>
            <p>{this.state.message}</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Inscription;
