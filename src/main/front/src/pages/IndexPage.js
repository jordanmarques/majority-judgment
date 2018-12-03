import React, {Component} from 'react';

import {Link} from "react-router-dom"

class IndexPage extends Component {
    render() {
        return (
            <div className="col col-md-8 offset-md-2">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Majority Judgement !</h1>
                    <p>To learn more about majority judgment visit: <a href={"https://en.wikipedia.org/wiki/Majority_judgment"} target={"blank"}>
                        Wikipedia</a>
                    </p>
                    <Link to={"/new/"}>
                        <div className="btn btn-primary btn-lg" role="button">Create a new Vote</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default IndexPage;
