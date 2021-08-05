import React from 'react';





const ErrorFlash = (props) => {
    console.log(props)

    return (
        <ul>
            {props.state.map((el,index )=> {
                return (
                    <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
                {el.message}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
                )
            })}
        </ul>

    );


};

export default ErrorFlash;