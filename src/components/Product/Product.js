import React, { Component } from "react";
import Navbar from "../../assets/components/Navbar/Navbar";
import ImageGallery from "react-image-gallery";
import Footer from "../../assets/components/Footer/Footer";
import Vignette from "../../assets/components/Vignette/Vignette";
/**
 * Import Barre de recherche
 */
import "./style.scss";

const images = [
  {
    original: this.state.details.picture[0].original,
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travel: [],
      details: { picture: [] },

      travellers_number: 1,
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  componentDidUpdate(prevprops) {
    if (prevprops.match.params.name != this.props.match.params.name) {
      this.getProductInfo();
    }
  }
  /*  click = () => {
    {
      this.addNewOrder;
    }
    <p>{this.state.message}</p>;
  };*/
  add = (e) => {
    if (this.state.travellers_number <= 10) {
      this.setState({
        total_price: this.state.details.price * parseInt(e.target.value),
        travellers_number: parseInt(e.target.value),
      });
    }
  };
  /*depart = (e) => {
    this.setState({
      depart: e.target.value,
    });
  };*/
  date = (e) => {
    this.setState({
      travel_date: e.target.value,
    });
  };
  addNewOrder = (e) => {
    e.preventDefault();
    const data = {
      userId: localStorage.getItem("userID"),
      travel_name: this.state.details.travel_name,
      travellers_number: this.state.travellers_number,
      total_price: this.state.total_price,
      travel_date: this.state.travel_date,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("http://localhost:4000/products/reservation", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          if (!data.userId) {
            this.setState({
              message:
                "Vous devez être connecté à votre compte pour réserver un séjour.",
            });
          } else {
            this.setState({ message: responseObject.message });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  getProductInfo = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "http://localhost:4000/products/" + this.props.match.params.name,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ details: data, total_price: data.price }, () => {
            this.getLastTrip();
          });
        },
        (err) => {
          console.log(err);
        }
      );
  };

  getLastTrip = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const options = {
      method: "GET",
      headers: headers,
    };

    fetch(
      "http://localhost:4000/products/more/" +
        this.props.match.params.name +
        "/" +
        this.state.details.category,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          this.setState({ travel: data });
        },
        (err) => {
          console.log(err);
        }
      );
  };
  display = () => {
    let contentDisplay = [];
    this.state.travel.forEach((element, index) => {
      contentDisplay.push(
        <Vignette
          key={index}
          image={element.picture[0].original}
          prix={element.price}
          title={element.travel_name}
          description={element.short_description}
        />
      );
    });
    return contentDisplay;
  };

  /*  photo = () => {
    let picturePath = [];
    this.state.details.picture.forEach((element, index) => {
      this.state.details.picture.map((original, thumbnail) => {
        picturePath = "http://localhost:4000/" + original;
      });
    });

    return picturePath;
  };*/
  render() {
    return (
      <div className="product">
        <div className="product-infos">
          <div className="product-image">
            <ImageGallery items={images} />
          </div>
          <div className="product-detail">
            <h3 className="product-title">{this.state.details.travel_name}</h3>
            <p className="product-description">
              {this.state.details.long_description}
            </p>
            <section className="product-reservation">
              <p>Sélectionnez vos dates de séjour </p>
              <span>Vos dates</span>

              <input
                type="text"
                className="product-date"
                onChange={this.date}
                placeholder="Date de séjour"
                value={this.state.travel_date}
              />
              <div className="nbr-produit">
                <span> Nombre de personnes</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  onChange={this.add}
                  value={this.state.travellers_number}
                />
              </div>
            </section>
            <p className="product-price">{this.state.total_price} €</p>
            <input
              type="submit"
              className="product-valid"
              onClick={this.addNewOrder}
              value="Je réserve"
            />
            <p>{this.state.message}</p>
          </div>
        </div>
        <div className="suggestion">
          <h2>Ces séjours pourraient aussi vous plaire</h2>
          <div className="composant-vignette">{this.display()}</div>
          <p className="informations">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
            ligula massa, varius a, semper congue, euismod non, mi. Proin
            porttitor, orci nec nonummy molestie, enim est eleifend mi, non
            fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa,
            scelerisque vitae, consequat in, pretium a, enim. Pellentesque
            congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum
            bibendum augue. Praesent egestas leo in pede. Praesent blandit odio
            eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque
            fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </p>
        </div>
      </div>
    );
  }
}

export default Product;
