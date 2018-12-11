import React, {Component} from 'react';
import CenteredPage from "../../components/CenteredPage";
import Jumbotron from "../../components/Jumbotron";

class VoteSubmitedPage extends Component {
    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <h1 className="display-4">Vote Submited, Thanks !</h1>
                </Jumbotron>
            </CenteredPage>
        );
    }
}

export default VoteSubmitedPage;
