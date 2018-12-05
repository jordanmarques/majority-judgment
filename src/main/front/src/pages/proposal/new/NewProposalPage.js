import React, {Component} from 'react';
import NewProposalForm from "./NewProposalForm";
import axios from 'axios'
import CenteredPage from "../../../components/CenteredPage";
import PageDefaultBody from "../../../components/PageDefaultBody";

class NewProposalPage extends Component {

    constructor() {
        super();

        this.state = {
            label: "",
            creator: "",
            choices: [],
            participants: []
        }
    }

    render() {
        return (
            <CenteredPage>
                <PageDefaultBody>
                    <NewProposalForm
                        onVoteNameChange={e => this.setState({"label": e.target.value})}
                        onEmailChange={e => this.setState({"creator": e.target.value})}
                        onAtendeesChange={e => this.setState({"participants": this.splitAndClean(e.target.value)})}
                        onChoicesChange={e => this.setState({"choices": this.splitAndClean(e.target.value)})}
                        emailsFormated={this.state.participants}
                        choicesFormated={this.state.choices}
                        onSubmit={this.submitNewProposal}
                    />
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={() => this.submitNewProposal()}>Submit</button>
                    </div>
                </PageDefaultBody>
            </CenteredPage>
        );
    }

    splitAndClean = (string) => {
        return string
            .split(",")
            .map(email => email.trim());
    };

    submitNewProposal = () => {
        if (!this.state.label || !this.state.creator || this.state.choices.length === 0 || this.state.participants.length === 0) {
            alert("One field is not filled")
        }

        const choicesForRESTCall = this.state.choices.map(choice => Object.assign({}, {"label": choice}));
        console.log(choicesForRESTCall)
        const emailsForRESTCall = this.state.participants.map(choice => Object.assign({}, {"mail": choice}));

        axios.post("/api/proposal", Object.assign(this.state, {"choices": choicesForRESTCall}, {"participants": emailsForRESTCall}))
            .then(response => this.props.history.push("/confirmation/creation/" + this.state.label))
            .catch(error => alert(error.response.data.message))
    }
}

export default NewProposalPage;
