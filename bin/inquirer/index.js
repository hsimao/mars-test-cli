const inquirer = require("inquirer");

console.log(inquirer);

inquirer
  .prompt([
    // 字串 input
    {
      type: "input",
      name: "yourName",
      message: "your name:",
      default: "noname",
      // 驗證輸入值, 返回 true 才能繼續
      validate: function (v) {
        return typeof v === "string";
      },
      // 只會作用在輸入當下作為顯示用, 但不影響輸出值
      transformer: function (v) {
        return `name: [${v}]`;
      },
      // 影響輸出值, 不會顯示在出入當下
      filter: function (v) {
        return `@${v}`;
      }
    },
    // 輸字
    {
      type: "number",
      name: "num",
      message: "your number:"
    },
    // yes or no 選擇
    {
      type: "confirm",
      name: "choice",
      message: "your choice",
      default: false
    },
    // 列表
    {
      type: "list",
      name: "framework",
      message: "choice framework",
      default: "vue",
      choices: [
        { value: "vue", name: "Vue" },
        { value: "react", name: "React" },
        { value: "angular", name: "Angular" }
      ]
    },
    // 快捷選擇
    {
      type: "expand",
      name: "color",
      message: "choice color",
      default: "red",
      choices: [
        { key: "r", value: "red" },
        { key: "g", value: "green" },
        { key: "b", value: "blue" }
      ]
    },
    // 複選 checkbox
    {
      type: "checkbox",
      name: "language",
      message: "use languages",
      choices: [
        { value: "javascript", name: "JavaScript" },
        { value: "css", name: "CSS" },
        { value: "golang", name: "Golang" },
        { value: "java", name: "Java" },
        { value: "php", name: "PHP" },
        { value: "c++", name: "C++" }
      ]
    },
    // password
    {
      type: "password",
      name: "password",
      message: "enter your password"
    },
    // editor, 編輯器, 會開啟 vi 編輯功能
    {
      type: "editor",
      name: "editor",
      message: "editor"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log("answers", answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
