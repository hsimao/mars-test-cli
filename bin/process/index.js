const cp = require("child_process");
const path = require("path");

// exec / execFile: 用在開銷比較小的任務, 因為只會在全部執行完後調用 callback
// cp.exec("ls -al|grep bin", (err, stdout, stderr) => {
//   console.log("err", err);
//   console.log("stdout", stdout);
//   console.log("stderr", stderr);
// });

// cp.execFile("ls", ["-al"], (err, stdout, stderr) => {
//   console.log("err", err);
//   console.log("stdout", stdout);
//   console.log("stderr", stderr);
// });

// spawn: 常用在耗時任務, 例如 npm install, 需要不斷顯示進度
// const child = cp.spawn("npm", ["install"], {
//   cwd: path.resolve("/Users/chenhsi-mao/Udemy/cli/mars-test-lib")
// });

// console.log("child.pid", child.pid);
// console.log("process.pid", process.pid);

// child.stdout.on("data", function (chunk) {
//   console.log(chunk.toString());
// });

// child.stderr.on("data", function (chunk) {
//   console.log(chunk.toString());
// });

// 直接在將流跟父進程綁定, 就無需在子進程監聽了 child.stdout.on('data', ()=>{})
const child = cp.spawn("npm", ["install"], {
  cwd: path.resolve("/Users/chenhsi-mao/Udemy/cli/mars-test-lib"),
  stdio: "inherit"
});

// fork node: 自動創建子進程, 適用耗時任務
// const child = cp.fork(path.resolve(__dirname, "child.js"));
// child.send("hello child process!");

// child.on("message", (msg) => {
//   console.log(msg);
// });

// console.log("main pid", process.pid);

// 同步方法
// const ret = cp.execSync("ls -al");
// console.log(ret.toString());

// const ret2 = cp.execFileSync("ls", ["-al"]);
// console.log(ret2.toString());

// const ret3 = cp.spawnSync("ls", ["-al"]);
// console.log(ret3.stdout.toString());
