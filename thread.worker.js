// function work(n) {
//   var i = 0;
//   while (++i < n * n) {}
//   return i;
// }

// addEventListener("message", e => {
//   postMessage(work(e.data));
// });

// const fib = i => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

// self.addEventListener("message", ({ data }) => {
//   let { type, payload } = data;
//   console.log("inside worker!!! ", type, " ", payload);
//   if (type === "UPDATE") {
//     payload = payload > 11 ? 11 : payload; // upper limit we set
//     const result = fib(payload * 5);
//     console.log(result);
//     self.postMessage({ type: "UPDATE_SUCCESS", payload: result });
//   } else {
//     console.log("inside worker!!!");
//   }
// });

// self.addEventListener(
//   "exit",
//   () => {
//     process.exit(0);
//   },
//   false
// );
