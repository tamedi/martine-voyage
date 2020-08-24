import React, { Component } from "react";
import Navbar from "../../assets/components/Navbar/Navbar";
import Footer from "../../assets/components/Footer/Footer.js";

/*style import*/
import "./style.scss";

class Historique extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="tableau">
        <table className="cellule">
          <tr>
            <td colSpan="2">Formule choisie</td>
            <td type="text" id="travel_name" name="travel_name">
              {this.props.travel_name}
            </td>
          </tr>
          <tr>
            <td colSpan="2">Nombre de voyageurs</td>
            <td type="text" id="travellers_number" name="travellers_number">
              {this.props.travellers_number}
            </td>
          </tr>
          <tr>
            <td colSpan="2">Prix total</td>
            <td type="text" id="total_price" name="total_price">
              {this.props.total_price}
            </td>
          </tr>
          <tr>
            <td colSpan="2">Date</td>
            <td type="text" id="travel_date" name="travel_date">
              {this.props.travel_date}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Historique;
