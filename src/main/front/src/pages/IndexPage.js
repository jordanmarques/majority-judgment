import React, {Component} from 'react';

import {Link} from "react-router-dom"
import CenteredPage from "../components/CenteredPage";
import PageDefaultBody from "../components/PageDefaultBody";

class IndexPage extends Component {
    render() {
        return (
            <CenteredPage>
                <PageDefaultBody>
                    <h1 className="display-4">Welcome to Majority Judgement !</h1>
                    <p>To learn more about majority judgment visit: <a href={"https://en.wikipedia.org/wiki/Majority_judgment"} target={"blank"}>
                        Wikipedia</a>
                    </p>
                    <Link to={"/new/"}>
                        <div className="btn btn-primary btn-lg" role="button">Create a new Vote</div>
                    </Link>
                </PageDefaultBody>
            </CenteredPage>
        );
    }
}

export default IndexPage;
