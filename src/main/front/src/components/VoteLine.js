import React, {Component} from 'react';

class VoteLine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appreciations: props.appreciations,
            choice: props.choice,
            selected: null
        }
    }

    render() {
        return (
            <table className="table">
                <tbody>
                <tr>
                    <th scope="row">{this.state.choice}</th>
                    {
                        this.state.appreciations.map((appreciation, i) =>
                            <td key={i} className={"pointer " + (this.state.selected === i ? this.colorForAppreciation(appreciation) : "")}
                                onClick={() => this.onAppreciationClicked(this.state.choice, appreciation, i)}>
                                {this.clean(appreciation)}
                            </td>)
                    }
                </tr>
                </tbody>
            </table>
        );
    }

    onAppreciationClicked = (choice, appreciation, i) => {
        this.setState((prevState) => {
            return {selected: i}
        });
        this.props.onAppreciationClicked(choice, appreciation);
    };

    clean = (choice) => {
        return choice.replace("_", " ")
    };

    colorForAppreciation = (appreciation) => {
        switch (appreciation) {
            case "VERY_GOOD":
                return "appreciation-color-1";
            case "GOOD":
                return "appreciation-color-2";
            case "PRETTY_GOOD":
                return "appreciation-color-3";
            case "FAIR":
                return "appreciation-color-4";
            case "BAD":
                return "appreciation-color-5";
            case "REJECT":
                return "appreciation-color-6"

        }
    }
}

export default VoteLine;
