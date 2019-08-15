// import * as math from "./math";
// import "./css/index.css";

// const res = math.add(2, 3);
// alert(res);
// console.log(process.env_NODE_ENV);

import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

class App extends Component {
  render() {  
    return (
      <div>
        <div>{_.join(['This', 'is', 'app'], ' ')}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
