/**
 * App.js - Main app component
 */

/*Module imports*/
import React, { Component } from "react";
import Home from "../Home/Home";

import Product from "../Product/Product";
import CategorieProduit from "../CategorieProduit/CategorieProduit";
import Inscription from "../Inscription/Inscription";
import Connexion from "../Connexion/Connexion";
import Profil from "../Profil/Profil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../../assets/components/Navbar/Navbar";
import FilesUploadComponent from "../FilesUploadComponent/FilesUploadComponent";
import ScrollToTop from "../../assets/components/Scroll/Scroll";

/* Style import*/
import "./App.scss";
import Footer from "../../assets/components/Footer/Footer";

/*Main app component*/
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Router>
          <ScrollToTop>
            <Navbar />

            <Switch>
              <Route
                path="/je-pars-quand/:category"
                exact
                component={CategorieProduit}
              />
              <Route
                path="/je-pars-ou/:category"
                exact
                component={CategorieProduit}
              />
              <Route exact path="/" component={Home} />
              <Route exact path="/Product/:name" component={Product} />
              <Route path="/Inscription" exact component={Inscription} />
              <Route path="/Connexion" exact component={Connexion} />
              <Route path="/Profil" component={Profil} />
              <Route
                path="/FilesUploadComponent"
                exact
                component={FilesUploadComponent}
              />
            </Switch>
            <Footer />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

export default App;
