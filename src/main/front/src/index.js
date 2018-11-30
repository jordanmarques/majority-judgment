import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from "./NavBar";
import NewVotePage from "./NewVotePage";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <NewVotePage/>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
