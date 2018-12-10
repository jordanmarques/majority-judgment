import React, {Component} from 'react';
import CenteredPage from "../../components/CenteredPage";
import PageDefaultBody from "../../components/PageDefaultBody";

class VoteCreatedPage extends Component {

    render() {
        return (
            <CenteredPage>
                <PageDefaultBody>
                    <h1 className="display-4">Vote {this.props.match.params.name} created !</h1>
                    <p>You will receive an email to vote for your proposal and an other one to manage the result.</p>
                </PageDefaultBody>
            </CenteredPage>
        );
    }
}

export default VoteCreatedPage;
