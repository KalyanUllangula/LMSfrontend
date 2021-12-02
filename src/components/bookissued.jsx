import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Bookissued extends React.Component {
    state = {
        booksissued: [],
    };
    componentDidMount() {
        axios
            .get("http://localhost:8080/api/viewbookissuedlist")
            .then((res) => {
                console.log(res);
                this.setState({ booksissued: res.data });
            })
            .catch((err) => console.log(err));
    }
    handleDelete = (Id) => {
        axios
            .delete(`http://localhost:8080/api/deleteissuedbook/${Id}`)
            .then((res) => {
                const booksissue = this.state.booksissued.filter((d) => d.issueId != Id);
                this.setState({ booksissued: booksissue });
            });
    };
    render() {
        return (
            <div className="container">
                <Link to="/booksissued/add" className="btn btn-primary float-end my-3">
                    Add
                </Link>
                <table className="table  mx-auto mt-5 container-fluid table table-info table-striped ">
                    <thead>
                        <tr>
                            <th>issueId</th>
                            <th>issueDate</th>
                            <th>dueDate</th>
                            <th>Book Id</th>
                            <th>User Id</th>
                            {this.props.login.loggedIn &&
                                this.props.login.role == "admin" && (
                                    <th >Action</th>
                                )}
                            {this.props.login.loggedIn &&
                                this.props.login.role == "user" && (
                                    <th >Action</th>
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.booksissued.map((bookissued) => (
                            <tr key={bookissued.issueId}>
                                <td>{bookissued.issueId}</td>
                                <td>{bookissued.issueDate}</td>
                                <td>{bookissued.dueDate}</td>
                                <td>{bookissued.books.bookid}</td>
                                <td>{bookissued.users.userid}</td>

                                <td>
                                    {this.props.login.loggedIn &&
                                        this.props.login.role == "admin" && (
                                            <input
                                                type="button"
                                                value="Delete"
                                                className="btn btn-primary me-2"
                                                onClick={() => this.handleDelete(bookissued.issueId)}
                                            />
                                        )}
                                    {this.props.login.loggedIn &&
                                        this.props.login.role == "user" && (
                                            <Link to="/bookreturn" >
                                                <input
                                                    type="button"
                                                    value="Return"
                                                    className="btn btn-danger"
                                                onClick={() => this.handleDelete(bookissued.issueId)}
                                                />
                                            </Link>
                                        )}
                                </td>
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

export default connect(mapStateToProps)(Bookissued);