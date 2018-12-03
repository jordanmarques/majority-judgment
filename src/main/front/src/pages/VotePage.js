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
                           placeholder="Mail"/>
                    <div className="spaced">
                        <button className="btn btn-primary">Vote !</button>
                    </div>
                </div>
            </div>
        );
    }

    setAppreciationToChoice = (choice, appreciation) =>  {
        console.log(choice, appreciation)
    }
}

export default VotePage;
