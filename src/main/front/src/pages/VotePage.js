import React, {Component} from 'react';
import axios from 'axios'
import VoteLine from "../components/VoteLine";

class VotePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voteName: "",
            voteId: props.match.params.id,
            choices: [],
            appreciations: [],
            mail: "",
            votes: {},

        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.voteId}/name`)
            .then(response => this.setState({"voteName": response.data}))
            .catch(error => console.error(error));

        axios.get("/api/appreciations")
            .then(response => this.setState({"appreciations": response.data}))
            .catch(error => console.error(error));

        axios.get(`/api/proposal/${this.state.voteId}/choices`)
            .then(response => this.setState({"choices": response.data.map(choice => choice.label)}))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div className="col col-md-8 offset-md-2">
                <div className="jumbotron">
                    <h1>{this.state.voteName}</h1>
                    {
                        this.state.choices.map((choice, i) => <VoteLine
                            key={i}
                            appreciations={this.state.appreciations}
                            choice={choice}
                            onAppreciationClicked={(choice, appreciation) => this.setAppreciationToChoice(choice, appreciation)}/>)
                    }
                    <input type="email"
                           className="form-control"
                           placeholder="Mail"
                           onChange={e => this.setState({mail: e.target.value})}/>

                    <div className="spaced">
                        <button className="btn btn-primary" onClick={() => this.submitVote()}>Vote !</button>
                    </div>
                </div>
            </div>
        );
    }

    setAppreciationToChoice = (choice, appreciation) => {
        this.setState(prevState => {
            const votes = Object.assign({}, prevState.votes);
            votes[choice] = appreciation;
            return {votes: votes}
        });
        console.log(choice, appreciation)
    };

    submitVote = () => {
        var votesCall = {};
        const formatedVotes = Object.keys(this.state.votes).map(choice => {
            const formatedChoice = {"label": choice.replace(" ","_")};
            return {choice: formatedChoice, appreciation: this.state.votes[choice]};
        });

        votesCall.votes = formatedVotes;
        votesCall.mail = this.state.mail;

        console.log(votesCall)

        axios.post("/api/proposal/" + this.state.voteId + "/vote", votesCall)
            .then(response => this.props.history.push("/confirmation/vote/"))
            .catch(error => alert(error.response.data.message))

    }
}

export default VotePage;
