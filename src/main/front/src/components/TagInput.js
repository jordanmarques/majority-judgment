import React, {Component} from 'react';

class TagInput extends Component {

    constructor(props){
        super(props);

        const values = props.values.join(",");

        this.state = {
            name: props.name || "",
            placeholder: props.placeholder || "",
            tags: props.values || [],
            value: values || "",
            onTagsChange: props.onTagsChange
        }
    }

    render() {
        return (
            <div className="form-group spaced">
                <label htmlFor="atendees">
                    <h3>{this.state.name}</h3>
                </label>
                <input type="text"
                       className="form-control"
                       placeholder={this.state.placeholder}
                       value={this.state.value}
                       onChange={e => this.onChange(e.target.value)}/>
                <small className="form-text text-muted">enter {this.state.name.toLowerCase()} separate by a ','</small>
                <div className="wrap">
                    {this.state.tags.map((tag, i) => <kbd key={i} className="tag">{tag}</kbd>)}
                </div>
            </div>
        );
    }

    onChange = (text) => {

        const tags = this.sanitize(text);

        this.setState({
            value: text,
            tags: tags
        });

        this.state.onTagsChange(tags)
    };

    sanitize = (unformatedTags) => {
       return unformatedTags.split(",").filter(tag => tag.trim() !== "")
    }
}

export default TagInput;
