#!/usr/bin/env node

const yargs = require("yargs/yargs");
const dedent = require("dedent");
const pkg = require("../package.json");

const cli = yargs();
const argv = process.argv.slice(2);

const context = {
  marsVersion: pkg.version
};

cli
  .usage("Usage: $0 [command] <options>")
  // 至少第一個參數要輸入
  .demandCommand(
    1,
    "A command is required. Pass --help to see all available commands and options."
  )
  .strict()
  // 參數輸入錯誤時, 會自動判斷給予提示
  // 例如輸入 mars lis, 會提示：您是指 list 嗎？
  .recommendCommands()
  // 自訂錯誤顯示文字
  .fail((err, msg) => {
    console.log(err);
  })
  .alias("h", "help")
  .alias("v", "version")
  // 指令每行文字寬度, 使用 terminalWidth 可撐滿
  .wrap(cli.terminalWidth())
  // 底部註解文字, 使用 dedent 方法可自動將字串每行頭、尾空格去除, 靠左對齊排列
  .epilogue(
    dedent(`
  When a command fails, all logs are written to lerna-debug.log in the current working directory.

  For more information, find our manual at https://github.com/lerna/lerna`)
  )
  .options({
    debug: {
      type: "boolean",
      describe: "Bootstrap debug mode",
      alias: "d"
    }
  })
  .option("registry", {
    type: "string",
    describe: "Define global registry",
    alias: "r"
  })
  .group(["debug"], "Dev Options: ")
  .group(["registry"], "Extra Options: ")
  // 使用順序參數設定
  .command(
    "init [name]",
    "Do init a project",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: "Name of a project",
        alias: "n"
      });
    },
    (argv) => {
      console.log("argv", argv);
    }
  )
  // 使用 object options 方式
  .command({
    command: "list",
    aliases: ["ls", "la", "ll"],
    describe: "List local packages",
    builder: (yargs) => {},
    handler: (argv) => {
      console.log(/(?:^|\/)\.?\.$/.test("users/"));
    }
  })
  .parse(argv, context);
