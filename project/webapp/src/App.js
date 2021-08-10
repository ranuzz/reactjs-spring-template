import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemConnected from './features/item/ItemConnected';


function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Title.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/about">About</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/">
            <ItemConnected></ItemConnected>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
