#!/usr/bin/env node

const commander = require("commander");
const pkg = require("../package.json");
const path = require("path");

console.log("--dirName", __dirname);
console.log("--filename", __filename);
console.log("cdw", process.cwd());

const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .version(pkg.version)
  .option("-d, --debug", "是否開啟 debug 模式", false)
  .option("-e, --env <envName>", "取得環境變數");

// 註冊指令
// mars clone source destination -f
const clone = program.command("clone <source> [destination]");
clone
  .description("clone a repository into a newly created directory")
  .option("-f, --force", "是否強制拷貝")
  .action((source, destination, options) => {
    console.log("clone command called", source, destination, options);
  });

// addCommand 註冊子命令
const service = new commander.Command("service");

// mars service start 8888
service
  .command("start [port]")
  .description("start service at some port")
  .action((prot) => {
    console.log("do service start", prot);
  });

// mars service stop
service
  .command("stop")
  .description("stop service")
  .action(() => {
    console.log("stop service");
  });

program.addCommand(service);

// arguments 自動匹配捕獲所有未定義的指令
// program
//   .arguments("<cmd> [options]")
//   .description("test command", {
//     cmd: "command to run",
//     options: "options for command"
//   })
//   .action((cmd, options) => {
//     console.log("cmd", cmd);
//     console.log("options", options);
//   });

// 執行另一個腳手架的指令
// mars vue create test-project
program
  .command("vue [name]", "vue cli", {
    executableFile: "vue"
    // isDefault: true // 沒有傳任何參數時, 將預設調用此指令
    // hidden: true // 隱藏 help 提示說明
  })
  .alias("v");

// 高級定義: 自定義 help 訊息
program.helpInformation = () => "";
program.on("--help", () => {
  console.log("--help");
  console.log("your help information");
});

// 高級定義: 自定義 debug 模式
program.on("option:debug", () => {
  if (program.opts().debug) {
    process.env.LOG_LEVEL = "verbose";
  }
  console.log("process.env.LOG_LEVEL:", process.env.LOG_LEVEL);
});

// 高級定義: 未知指令監聽, 不可與 arguments 共用, 會被覆蓋
program.on("command:*", (obj) => {
  console.error(`未知指令: ${obj[0]}`);
  const commands = program.commands.map((cmd) => cmd.name());
  console.log(`可使用的指令: ${commands.join(", ")}`);
});

// parse 必須要擺在最後
program.parse(process.argv);
