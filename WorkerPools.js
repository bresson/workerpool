export default class WorkerPool {
  constructor(script) {
    this.concurrency = navigator.hardwareConcurrency || 4;
    this.workers = [];

    var workers = this.workers;

    this.queue = [];

    this.script = script;
    // this.workers.push(new Worker(script));
    // for (let i = 0; i < concurrency; i++) {
    //     this.workers.push(new Worker(script));
    // let _w = new Worker(script);
    //     // This is the initial setting of the worker, as a key, in
    //     // the "workers" map. It's value is null, meaning there's no
    //     // resolve function, and it can take on work.
    // this.workers.set(_w, null);
    //   }
    this.postMessage = this.postMessage.bind(this);
  }

  addEventListener(elem) {
    return elem.addEventListener("message", e => {
      console.log("elem returns message ", e);
    });
  }

  init() {
    for (let i = 0; i < this.concurrency; i++) {
      this.workers.push(new window.Worker(this.script));
    }

    this.workers.map(elem => this.addEventListener(elem));

    return this;
  }

  postMessage(msg) {
    if (this.workers.length) {
      const _worker = this.workers.pop();
      _worker.postMessage(msg);
      // this.workers[0].postMessage(msg);
    }
  }

  terminate() {
    this.workers.length = 0;
    console.log("terminate inside workerpool ", this.workers);
    return this.workers;
  }

  isReady() {
    console.log("worker is ready from workperpool ", this.workers.length);
    return this.workers.length;
  }

  concurrency() {
    this.concurrency;
  }

  //   this.workers = new Map();

  //   var worker;
}

// export default function WorkerPool(size) {
//   var workers = 0;
//   const jobs = [];

// url: the url of the worker script
// msg: the initial message to pass to the worker
// cb : the callback to recieve messages from postMessage.
//      return true from cb to dismiss the worker and advance the queue.
// ctx: the context for cb.apply
//   this.queueJob = function(url, msg, cb, ctx) {
//     var job = {
//       url: url,
//       msg: msg,
//       cb: cb,
//       ctx: ctx
//     };
//     jobs.push(job);
//     if (workers < size) nextJob();
//   };

//   function nextJob() {
//     if (jobs.length) {
//       (function() {
//         var job = jobs.shift(),
//           worker = new Worker(job.url);
//         workers++;
//         worker.addEventListener(
//           "message",
//           function(e) {
//             if (job.cb.call(job.ctx, e.data, worker)) {
//               worker.terminate();
//               //   delete worker;
//               workers--;
//               nextJob();
//             }
//           },
//           false
//         );
//         worker.postMessage(job.msg);
//       })();
//     }
//   }
// }

// WorkerPool.prototype.postMessage = function(data) {
//   var workers = this.workers;

//   var queue = this.queue;

//   // Try finding an available worker.
//   var worker = this.getWorker();

//   return new Promise(function(resolve) {
//     if (worker) {
//       workers.set(worker, resolve);
//       worker.postMessage(data);
//     } else {
//       queue.push([data, resolve]);
//     }
//   });
// };
