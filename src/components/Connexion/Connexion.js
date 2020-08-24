import React, { Component } from "react";
/*import Navbar from "../../assets/components/Navbar/Navbar";
import Footer from "../../assets/components/Footer/Footer.js";*/

/*style import*/
import "./style.scss";
import { Link } from "react-router-dom";

class Connexion extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  change = (event) => {
    this.setState({
      [event.target.id]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  loginProfil = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/profil/login", options)
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          if (responseObject.token && responseObject.userId) {
            /*stocker le token et l'userId dans le localStorage pour pouvoir les rappeler une fois la connection reussie */
            localStorage.setItem("token", responseObject.token);
            localStorage.setItem("userID", responseObject.userId);
            /*permet d'allez vers la page profil APRES avoir valider la connexion (et pouvoir recuperer le localstorage aussi)*/
            this.props.history.push("/profil");
          }
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div className="blocConnexion">
        <h3>Veuillez vous connecter pour accéder à votre compte.</h3>
        <form>
          <label htmlFor="email">e-Mail</label>
          <input
            type="email"
            id="email"
            placeholder="example@hotmail.com"
            onChange={this.change}
            value={this.state.email}
          />
          <br /> <br />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={this.change}
            value={this.state.password}
          />
          <br /> <br />
          <button type="submit" onClick={this.loginProfil}>
            Se connecter
          </button>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}
export default Connexion;
