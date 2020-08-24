import React, { Component } from "react";

export default class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFileChange(e) {}
  onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const options = {
      method: "POST",
      body: data,
    };

    let response = await fetch(
      "http://localhost:4000/products/new-travels",
      options
    );

    const responseData = await response.json();

    console.log(responseData);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <h3>React File Upload</h3>
            <div className="form-group">
              <input type="file" name="picture" />
            </div>

            <div className="descriptions">
              <label htmlFor="category">category</label>
              <input type="text" id="title" name="category" />
              <br />
              <label htmlFor="title">title</label>
              <input type="text" id="title" name="travel_name" />
              <br />
              <label htmlFor="short_description">description</label>
              <input
                type="text"
                id="short_description"
                name="short_description"
              />
              <br />
              <label htmlFor="long_description">long_description</label>
              <input
                type="text"
                id="long_description"
                name="long_description"
              />
              <br />
              <label htmlFor="prix">prix</label>
              <input type="number" id="prix" name="price" />
              <br />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                telecharger
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
