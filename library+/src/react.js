//library打包
// import * as math from "./math";
// import * as string from "./string";
// export default { math, string };

//PWA案例
// console.log("hello, this is camille!");
// if ('serviceWorker' in navigator) {  //如果浏览器支持serviceWorker，就执行以下代码
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//         .then(registation => { //注册成功
//             console.log('service-worker registed');
//         }).cache(error => { //注册失败
//             console.log('service-worker register error');
//         })
//     })
// }

import React, { Component } from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./home";
import List from "./list";

class Index extends Component {
//   componentDidMount() {
//     axios
//       .get("/api/info.json")
//       .then(res => {
//         console.log(res);
//       })
//       .catch(error => {
//         console.log("error:" + error);
//       });
//   }

  render() {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/list" component={List} />
            </Router>
        </div>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));
