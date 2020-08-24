import React, { Component } from "react";
import Navbar from "../../assets/components/Navbar/Navbar";
import Footer from "../../assets/components/Footer/Footer.js";
import Historique from "../Historique/Historique";

/*style import*/
import "./style.scss";
import { createPortal } from "react-dom";

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: { order: [] },
    };
  }

  dataHistorique = () => {
    let contentDataHistorique = [];
    this.state.profil.order.forEach((element, index) => {
      contentDataHistorique.push(
        <Historique
          key={index}
          travel_name={element.travel_name}
          travellers_number={element.travellers_number}
          total_price={element.total_price}
          travel_date={element.travel_date}
        />
      );
    });
    return contentDataHistorique;
  };

  change = (event) => {
    let profil = this.state.profil;
    profil[event.target.name] = event.target.value;
    this.setState({
      profil: profil,
      // identifier name de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  postDataProfil = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute  pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });
    const data = {
      /*on appel l'userId dans le body en le recuperant du localstorage */
      userId: localStorage.getItem("userId"),
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/profil/dataProfil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const profilInfo = responseObject;
          this.setState({ profil: profilInfo, object: profilInfo });
          console.log(this.state);
        },

        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    this.postDataProfil();
  }

  editProfil = (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem(
        "userID"
      ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      profil: this.state.profil,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      /**on ajoute pour l'AUTHENTIFICATION le header autorization qui a comme valeur bearer(puis espace) suivi par le token de l'user */
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/profil/edit", options)
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

  deleteProfil = (e) => {
    window.confirm(
      "Etes-vous sur de vouloir supprimer votre compte? Cette action est irréversible."
    );
    e.preventDefault();
    const data = {
      userId: localStorage.getItem(
        "userID"
      ) /*on get l'Id qu'on a stocké durant la connexion*/,
      /*userID avec le ID en majuscule car c'est comme ca qu'on l'a mis dans le local storage (/connexion) */
      profil: this.state.profil,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/profil/delete", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          alert(
            "La suppression de votre compte a bien été prise en compte. Merci."
          );
          this.props.history.push("/Home");
        },

        (error) => {
          console.log(error);
        }
      );
  };
  signOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="blocProfil">
        <div className="identifiants">
          <h3>Bienvenue sur votre compte client!</h3>
          <p className="para">
            Vous pouvez mettre à jours vos données, consulter votre historique
            de voyage ou supprimer votre compte :-( .
          </p>
          <form>
            <label htmlFor="lastname">Nom</label>
            <br />
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={this.state.profil.lastname}
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="firstname">Prénom</label>
            <br />
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={this.state.profil.firstname}
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="tel">Numéro de téléphone</label>
            <br />
            <input
              type="tel"
              id="tel"
              name="tel"
              value={this.state.profil.tel}
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="email">e-mail</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.profil.email}
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="modifier le mot de passe"
              onChange={this.change}
            />
            <br /> <br />
            <label htmlFor="hobbies">Hobbies</label>
            <br />
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={this.state.profil.hobbies}
              onChange={this.change}
            />
            <br /> <br />
            <button type="submit" onClick={this.editProfil}>
              Modifier
            </button>
            <button type="submit" onClick={this.deleteProfil}>
              Supprimer
            </button>
            <button type="submit" onClick={this.signOut}>
              Se déconnecter
            </button>
            <p>{this.state.message}</p>
          </form>
        </div>

        <h3 className="tableau" scope="row">
          HISTORIQUE DE VOS VOYAGES
        </h3>

        <div className="historique">{this.dataHistorique()}</div>
      </div>
    );
  }
}

export default Profil;
