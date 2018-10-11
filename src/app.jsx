import React from "react";
import {render} from "react-dom";

const Main = ()=>(
    <div>
        <h1>This is something new.</h1>
    </div>
);

render(<Main/>,document.getElementById("app"));

console.log("shiz");