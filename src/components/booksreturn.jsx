import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class BooksReturn extends React.Component {
    state = {
        booksreturned: [],
    };
    componentDidMount() {
        axios
            .get("http://localhost:8080/lms/viewbooklist")
            .then((response) => {
                console.log(response);
                this.setState({ booksreturned: response.data });
            })
            .catch((error) => console.log(error));
    }
    handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/lms/deleteReturnBookDetails/${id}`)
            .then((res) => {
                const booksreturned = this.state.booksreturned.filter(
                    (au) => au.id != id
                );
                this.setState({ booksreturned: booksreturned });
            });
    };
    render() {
        return (
            <div className="container">
                <Link
                    to="/booksreturn/add"
                    className="btn btn-primary btn-large mt-3 float-end"
                >
                    Add
                </Link>
               
                <table className="table w-80 mx-auto mt-5">
                    <thead>
                        <tr>
                            <th>BookReturnId</th>
                            <th>ReturnedDate</th>
                            <th>DelayedDays</th>

                            {this.props.login.loggedIn &&
                                this.props.login.role == "admin" && (
                                    <th colSpan="2">Actions</th>
                                )}

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.booksreturned.map((bookreturn) => (
                            <tr>
                                <td>{bookreturn.id}</td>
                                <td>{bookreturn.returnedDate}</td>
                                <td>{bookreturn.delayedDays}</td>

                                {this.props.login.loggedIn &&
                                    this.props.login.role == "admin" && (
                                        <td>
                                            <Link to={`/bookreturn/update/${bookreturn.id}`}>
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
                                                onClick={() => this.handleDelete(bookreturn.id)}
                                            />
                                        </td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

export default connect(mapStateToProps)(BooksReturn);