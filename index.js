import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import { worker } from "./components/webworker";
import WorkerPool from "./WorkerPools";
// import thread from "./thread.simpleworker";

// const workerpool = new WorkerPool("./thread.simpleworker.js").init();
// workerpool.postMessage("hellowo");
// console.log("123 ", workerpool);

function useWorkerStatus({ workers }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("worker prop inside useWorkerStatus ", workers);
    if (workers && workers.isReady()) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [workers, ready]);
  // console.log("ready inside useWorkerStatus useeffect ", ready);

  return ready;
}

function useWorker(workerStatus, { workers }, action) {
  const [ready, setReady] = useState(workerStatus);

  useEffect(() => {
    setReady(workerStatus);
  }, [workerStatus]);

  useEffect(() => {
    debugger;
    // console.log("worker prop inside useWorker ", workers);
    // setReady(workerStatus);
    // console.log("workers indise useWorker ", workers);
    if (ready) {
      // console.log(
      //   "workers.workers ",
      //   workers.workers.postMessage("hello from curry")
      // );
      console.log("workers inside useeffect ", workers);
      workers.postMessage({ work: "heard message and sending back" });
    }
  }, [workers, ready, workerStatus]);

  console.log("ready useWorker useeffect ", ready);
  if (ready) {
    // console.log("inside checking if curried is ready to return  YES");
    return function(msg) {
      // console.log("inside curried function 2");
      return (
        <React.Fragment>
          <h2>{msg}</h2>
        </React.Fragment>
      );
    };
  }
}

const TestWorkers = workerpool => {
  const isWorkerReady = useWorkerStatus(workerpool);
  const compute = useWorker(isWorkerReady, workerpool);

  let isCompute;
  let computed, computed2;
  if (compute) {
    isCompute = `<span>compute is ready</span>`;
    computed = compute("first computed!");
    computed2 = compute("second computed");
  } else {
    isCompute = `<span>compute is not ready</span>`;
  }
  return (
    <React.Fragment>
      <h1>
        {isWorkerReady.toString()} : {isCompute} :
      </h1>
      <div> {computed}</div>
      <div> {computed2}</div>
    </React.Fragment>
  );
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      workerpool: new WorkerPool("./thread.simpleworker.js").init()
    };
  }

  deleteWebWorker(e) {
    console.log("deleting workers ", e);

    this.state.workerpool.terminate();

    this.setState((state, props) => ({
      workerpool: ""
    }));
    console.log("deleted workers ", this.state.workerpool);
  }
  render() {
    // workerpool.postMessage({ type: "UPDATE", payload: 3 });
    return (
      <div>
        <TestWorkers workers={this.state.workerpool} />
        <h1> Hello {this.props.name}</h1>
        <button onClick={e => this.deleteWebWorker(e)}>
          delete webworkers
        </button>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);
