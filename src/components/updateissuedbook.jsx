import React, { Component } from "react";
import axios from "axios";

class UpdateIssuedBook extends React.Component {
  state = {
    bookissued: {
        issueDate: "",
        dueDate: "",  
        bookid:"",
        userid:""
      },
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/viewByIssuedId/${this.props.match.params.issueId}`
      )
      .then((res) => {
        const issue = { ...this.state.bookissued };
        issue.issueDate = res.data.issueDate;
        issue.dueDate = res.data.dueDate; 
        issue.bookid=res.data.books.bookid;
        issue.userid=res.data.users.userid; 
        console.log(res.data);
        console.log(issue);
        this.setState({ bookissued: issue });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const issue = { ...this.state.bookissued };
    issue[event.target.name] = event.target.value;
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ bookissued: issue });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const issue = {  
      issueDate: this.state.bookissued.issueDate,
      dueDate: this.state.bookissued.dueDate,
      books:
      {
      bookid:this.state.bookissued.bookid,
      },
      users:
      {
      userid:this.state.bookissued.userid
      },
      issueId:this.props.match.params.issueId,    
    };
    axios
      .put("http://localhost:8080/api/updateissuedbook",issue)
      .then((res) => {
        this.props.history.push("/bookissued");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInput" className="form-label">
              issueDate
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="exampleissueDate"
              value={this.state.bookissued.issueDate}
              name="issueDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">
              dueDate
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="exampledueDate"
              aria-describedby="emailHelp"
              value={this.state.bookissued.dueDate}
              name="dueDate"
              onChange={this.handleChange}/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">
              bookid
            </label>
            <input
              type="number"
              className="form-control"
              id="examplebookid"
              aria-describedby="emailHelp"
              value={this.state.bookissued.bookid}
              name="bookid"
              onChange={this.handleChange}/>
          </div>
          <div className="mb-3">
            <label for="exampleInput" className="form-label">
              userid
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleuserid"
              aria-describedby="emailHelp"
              value={this.state.bookissued.userid}
              name="userid"
              onChange={this.handleChange}/>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdateIssuedBook;