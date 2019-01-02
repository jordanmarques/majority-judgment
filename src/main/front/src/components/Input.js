import React from 'react';

const Input = ({onChange, value, name, placeholder}) => {
    return (
        <div className="form-group spaced">
            <label htmlFor="voteName">
                <h3>{name}</h3>
            </label>
            <input type="text"
                   className="form-control"
                   id="voteName"
                   placeholder={placeholder}
                   value={value}
                   onChange={e => onChange(e.target.value)}/>
        </div>
    );
};

export default Input;
