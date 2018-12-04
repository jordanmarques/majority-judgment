import React from "react";

const CenteredPage = ({children}) => {
    return (
        <div className="container-fluid">
            <div className="col col-md-8 offset-md-2">
                {children}
            </div>
        </div>
    )
};

export default CenteredPage
