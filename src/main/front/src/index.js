import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import FirstPage from "./FirstPage";

function App() {
  return (
    <div className="App">
      <FirstPage/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
