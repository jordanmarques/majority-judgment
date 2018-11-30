import React, {Component} from 'react';
import NewProposalForm from "./NewProposalForm";
import axios from 'axios'

class NewVotePage extends Component {

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
            <div className={"container-fluid"}>
                <NewProposalForm
                    onVoteNameChange={e => this.setState({"label": e.target.value})}
                    onEmailChange={e => this.setState({"creator": e.target.value})}
                    onAtendeesChange={e => this.setState({"participants": this.splitByCommaAndClean(e.target.value)})}
                    onChoicesChange={e => this.setState({"choices": this.splitByCommaAndClean(e.target.value)})}
                    emailsFormated={this.state.participants}
                    choicesFormated={this.state.choices}
                    onSubmit={this.submitNewProposal}
                />
            </div>
        );
    }

    splitByCommaAndClean(string){
        return string
            .split(",")
            .map(email => email.trim());
    }

    submitNewProposal(){
        if(!this.state.label || !this.state.creator || this.state.choices.length === 0 || this.state.participants.length === 0){
            alert("One field is not filled")
        }

        axios.post("/api/proposal", this.state)
            .then(response => console.log(response))
    }
}

export default NewVotePage;
