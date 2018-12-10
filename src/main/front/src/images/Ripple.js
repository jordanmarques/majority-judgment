import React from 'react';

const Ripple = props => (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-ripple">
        <circle cx="50" cy="50" r="2.683" fill="none" stroke="#7f7fd5" strokeWidth="4">
            <animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1" keySplines="0 0.2 0.8 1" begin="-0.5s"
                     repeatCount="indefinite"/>
            <animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1" keySplines="0.2 0 0.8 1" begin="-0.5s"
                     repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="50" r="26.563" fill="none" stroke="#86A8E7" strokeWidth="4">
            <animate attributeName="r" calcMode="spline" values="0;40" keyTimes="0;1" dur="1" keySplines="0 0.2 0.8 1" begin="0s"
                     repeatCount="indefinite"/>
            <animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="1" keySplines="0.2 0 0.8 1" begin="0s"
                     repeatCount="indefinite"/>
        </circle>
    </svg>
);

export default Ripple
