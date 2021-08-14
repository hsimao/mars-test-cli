#!/usr/bin/env node

const lib = require("mars-test-lib");
const argv = require("process").argv;

console.log("welcome mars-cli !!!");

// 取得第一個參數
const command = argv[2];

if (!command) {
  console.log("請輸入指令");
  return;
}

if (lib[command]) {
  lib[command](getOption(argv));
} else {
  console.log("無效的指令");
}

const globalOption = getGlobalOption(argv);
if (isVersion(globalOption)) {
  printVersion();
}

// 取得第一個之後所有參數
// 輸入 mars init --name mars => 返回 { option: 'name', param: 'mars'}
function getOption(argv) {
  const options = argv.slice(3);
  let [option, param] = options;
  option = option.replace("--", "");

  return { option, param };
}

// 取得全局指令判斷
// 輸入 mars --version、mars -version => version
function getGlobalOption(argv) {
  const command = argv[2];
  if (command.startsWith("--") || command.startsWith("-")) {
    return command.replace(/--|-/g, "");
  }
  return "";
}

function printVersion() {
  console.log("1.0.0");
}

function isVersion(str) {
  return str === "version" || str === "V";
}
