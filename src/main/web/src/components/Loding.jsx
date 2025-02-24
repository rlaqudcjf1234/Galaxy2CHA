import React from "react";
import {PacmanLoader} from "react-spinners";

const Loading = () => {
    return (
        <div style={{
                minHeight: "75vh"
            }}>
            <div 
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                <PacmanLoader color="skyblue"/>
            </div>
        </div>
    );
};

export default Loading;