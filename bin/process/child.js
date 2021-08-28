console.log("child process");
console.log("child pid", process.pid);

process.on("message", (msg) => {
  console.log("child on message: ", msg);
});

process.send("hello main process");
