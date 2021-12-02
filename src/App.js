import "./App.css";
import Nav from "./components/nav";
import Login from "./components/login";

import PageNotFound from "./components/pagenotfound";
import Authors from "./components/author";
import { Route, Switch, Redirect } from "react-router-dom";
import Books from "./components/books";
import BooksForm from "./components/booksform";
import UpdateBooks from "./components/updatebooks";
import "bootstrap/dist/css/bootstrap.css";
import DamagedBooks from "./components/damagedbooks";
import AddDamagedBooks from "./components/adddamagedbooks";
import UpdateDamaged from "./components/updatedamaged";
import BooksOrder from "./components/booksorder";
import AddOrder from "./components/addorder";
import UpdateOrder from "./components/updateorder";
import BooksReturn from "./components/booksreturn";
import Addauthor from "./components/authorform";
import AddPublisher from "./components/addpublisher";
import UpdatePublisher from "./components/updatepublishers";
import Publishers from "./components/publisher";
import UpdateReturn from "./components/updatereturn";
import Bookissued from "./components/bookissued";
import BookIssuedForm from "./components/bookissuedform";
import UpdateIssue from "./components/updateissuedbook";
import Readers from "./components/readers";
import AddReaders from "./components/addreaders";
import UpdateReaders from "./components/updatereaders";
import Home from "./components/home";
import Logout from "./components/logout";
import Users from "./components/users";
import AddUsers from "./components/addusers";
import UpdateUsers from "./components/updateusers";
import AddReturn from "./components/addreturn";



function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/book/add" component={BooksForm} />
        <Route path="/bookissued" component={Bookissued}/>
        <Route path="/bookreturn/update/:id" component={UpdateReturn} />
        <Route path="/authors/add" component={Addauthor} />
        <Route path="/booksorder/update/:orderId" component={UpdateOrder} />
        <Route exact path="/booksissued/add" component={BookIssuedForm} />
        <Route path="/booksissued/update/:issueId" component={UpdateIssue} />
        <Route path="/addorder/add" component={AddOrder} />
        <Route path="/booksreturn/add" component={AddReturn} />
        <Route path="/book/update/:bookid" component={UpdateBooks} />
        <Route path="/damagedbook/update/:id" component={UpdateDamaged} />
        <Route path="/booksorder" component={BooksOrder} />
        <Route path="/bookreturn" component={BooksReturn} />
        <Route path="/book" component={Books} />
        <Route path="/damagedbook" component={DamagedBooks} />
        <Route path="/lms/viewDamagedBooksList/add" component={AddDamagedBooks} />
        <Route path="/author" component={Authors} />
        <Route path="/readers/add" component={AddReaders} />
        <Route exact path="/readers/update/:id" component={UpdateReaders} />
        <Route path="/readers" component={Readers} />
        <Route path="/publisher/add" component={AddPublisher} />
        <Route path="/publishers/update/:id" component={UpdatePublisher} />
        <Route path="/publisher" component={Publishers} />
        
        <Route path="/users/addusers" component={AddUsers} />
        <Route path="/users/update/:userid" component={UpdateUsers} />
        <Route path="/users" component={Users} />
        <Route exact path="/home" component={Home} />
       {/*  <Route component={PageNotFound} /> */}
       
      </Switch>
    </div>
  );
}

export default App;
