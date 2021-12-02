import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class DamagedBooks extends React.Component {
  state = {
    damagedbooks: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/lms/viewDamagedBooksList")
      .then((response) => {
        console.log(response);
        this.setState({ damagedbooks: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/lms/deleteDamagedBooks/${id}`).then((res) => {
      const damagedbooks = this.state.damagedbooks.filter((au) => au.id != id);
      this.setState({ damagedbooks: damagedbooks });
    });
  }; 
  render() {
    return (
      <div className = "container">
        <Link to="/lms/viewDamagedBooksList/add" className="btn btn-primary btn-large mt-3 float-end">
          Add
        </Link>
      
        <table className="table  mx-auto mt-5 container-fluid table table-info table-striped ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>BookId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.damagedbooks.map((damagedbook) => (
              <tr>
                <td>{(damagedbook.id)}</td>
                <td>{(damagedbook.quantity)}</td>
                <td>{(damagedbook.description)}</td>
                <td>{(damagedbook.books.bookid)}</td>
                <td>
                 <Link to={`/damagedbook/update/${damagedbook.id}`}>
                    <input
                      type="button"
                      value="Update"
                      className="btn btn-primary me-2"
                    />
                    </Link>
                 <input
                    type="button"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(damagedbook.id)}
                  /> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DamagedBooks;