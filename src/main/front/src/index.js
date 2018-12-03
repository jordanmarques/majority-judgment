import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route} from "react-router-dom";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from "./components/NavBar";
import NewVotePage from "./pages/NewVotePage";
import IndexPage from "./pages/IndexPage";
import VoteCreatedPage from "./pages/VoteCreatedPage";
import VotePage from "./pages/VotePage";

function App() {
    return (

        <Router>
            <div className="App">
                <NavBar/>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/new/" component={NewVotePage}/>
                <Route path="/confirmation/creation/:name" component={VoteCreatedPage}/>
                <Route path="/vote/:id" component={VotePage}/>
            </div>
        </Router>
    );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App/>, rootElement);
