import React from 'react';

const NewProposalForm = props => {

    return (
        <div className="newVoteForm">
            <div className="form-group spaced">
                <label htmlFor="voteName">
                    <h3>Vote Name</h3>
                </label>
                <input type="text"
                       className="form-control"
                       id="voteName"
                       placeholder="Vote Name"
                       onChange={props.onVoteNameChange}/>
            </div>
            <div className="form-group spaced">
                <label htmlFor="exampleInputEmail1">
                    <h3>Email address</h3>
                </label>
                <input type="email"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       placeholder="Enter email"
                       onChange={props.onEmailChange}/>
            </div>
            <div className="form-group spaced">
                <label htmlFor="atendees">
                    <h3>Attendees</h3>
                </label>
                <input type="text"
                       className="form-control"
                       id="attendees"
                       placeholder="Attendees"
                       onChange={props.onAtendeesChange}/>
                <small id="attendees" className="form-text text-muted">enter attendees emails separate by a ','</small>
                {props.emailsFormated.map((email, i) => <kbd key={i} className="tag">{email}</kbd>)}
            </div>
            <div className="form-group spaced">
                <label htmlFor="choices">
                    <h3>Choices</h3>
                </label>
                <input type="text"
                       className="form-control"
                       id="choices"
                       placeholder="Choices"
                       onChange={props.onChoicesChange}/>
                <small id="attendees" className="form-text text-muted">enter choices separate by a ','</small>
                {props.choicesFormated.map((choice, i) => <kbd key={i} className="tag">{choice}</kbd>)}
            </div>
        </div>
    );
};

export default NewProposalForm;
