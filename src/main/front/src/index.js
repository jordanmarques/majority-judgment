import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route} from "react-router-dom";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from "./components/NavBar";
import NewProposalPage from "./pages/proposal/new/NewProposalPage";
import IndexPage from "./pages/IndexPage";
import VoteCreatedConfirmationPage from "./pages/confirmation/VoteCreatedPage";
import VoteSubmitedConfirmationPage from "./pages/confirmation/VoteSubmitedPage";
import VotePage from "./pages/proposal/vote/ProposalVotePage";
import ProposalResultPage from "./pages/proposal/result/ProposalResultPage";

function App() {
    return (

        <Router>
            <div className="App">
                <NavBar/>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/new/:name?/:attendees?/:choices?" component={NewProposalPage}/>
                <Route path="/proposal/vote/:id" component={VotePage}/>
                <Route path="/proposal/result/:id/:token" component={ProposalResultPage}/>
                <Route path="/confirmation/creation/:name" component={VoteCreatedConfirmationPage}/>
                <Route path="/confirmation/vote/" component={VoteSubmitedConfirmationPage}/>
            </div>
        </Router>
    );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App/>, rootElement);
