import React from 'react';
import './LoadingScreen.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const LoadingScreen = (props) => {

    return (
        <div className="center-div">
            <p className="info">{props.message}</p><br/>
            <Loader type="Bars" color="#00BFFF" height={200} width={200} />

        </div>

    );
};

export default LoadingScreen;