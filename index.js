import React from "react";
import ReactDOM from "react-dom";
// import { worker } from "./components/webworker";
import WorkerPool from "./WorkerPools";
// import thread from "./thread.simpleworker";

const workerpool = new WorkerPool("./thread.simpleworker.js").init();
workerpool.postMessage("hellowo");
console.log("123 ", workerpool);

class App extends React.Component {
  render() {
    // worker.postMessage({ type: "UPDATE", payload: 3 });
    return <div>Hello {this.props.name}</div>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);
