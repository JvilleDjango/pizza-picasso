const { readdirSync } = require("fs");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      return { name: dirent.name, value: dirent.name };
    });

module.exports = (plop) => {
  let directories = getDirectories("src/pages");
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
      {
        // Raw text input
        type: "confirm",
        // Variable name for this input
        name: "isCommon",
        // Prompt to display on command line
        message: "Is it common component?",
      },
      {
        when: function (response) {
          return response.isCommon === false;
        },
        // Raw text input
        type: "list",
        // Variable name for this input
        name: "container",
        // Prompt to display on command line
        message: "Choose container?",
        choices: directories,
      },
    ],
    actions: (data) => {
      const path = data.isCommon
        ? "src/components/"
        : "src/pages/" + data.container + "/";

      let actions = data.isCommon
        ? [
            {
              // Add a new file
              type: "add",
              // Path for the new file
              path: path + "{{kebabCase name}}/{{kebabCase name}}.jsx",
              // Handlebars template used to generate content of new file
              templateFile: "plop-templates/Component/Component.jsx.hbs",
            },
            {
              type: "add",
              path: path + "{{kebabCase name}}/index.js",
              templateFile: "plop-templates/Component/index.js.hbs",
            },
            {
              type: "add",
              path: path + "{{kebabCase name}}/{{kebabCase name}}.styles.scss",
              templateFile: "plop-templates/Component/Styles.scss.hbs",
            },
            // {
            //   type: "add",
            //   path: path + "{{pascalCase name}}/{{pascalCase name}}.stories.js",
            //   templateFile: "plop-templates/Component/stories.js.hbs",
            // },
          ]
        : [
            {
              // Add a new file
              type: "add",
              // Path for the new file
              path: path + "{{kebabCase name}}/{{kebabCase name}}.js",
              // Handlebars template used to generate content of new file
              templateFile: "plop-templates/Component/Component.jsx.hbs",
            },
            {
              type: "add",
              path: path + "{{kebabCase name}}/index.js",
              templateFile: "plop-templates/Component/index.js.hbs",
            },
            {
              type: "add",
              path: path + "{{kebabCase name}}/{{kebabCase name}}.styles.scss",
              templateFile: "plop-templates/Component/Styles.scss.hbs",
            },
          ];
      return actions;
    },
  });

  plop.setGenerator("page", {
    description: "Create a page",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your page name?",
      },
    ],
    actions: [
      {
        // Add a new file
        type: "add",
        // Path for the new file
        path: "src/pages/{{kebabCase name}}/{{kebabCase name}}.jsx",
        // Handlebars template used to generate content of new file
        templateFile: "plop-templates/Component/Component.jsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{kebabCase name}}/index.js",
        templateFile: "plop-templates/Component/index.js.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{kebabCase name}}/{{kebabCase name}}.styles.scss",
        templateFile: "plop-templates/Component/Styles.scss.hbs",
      },
    ],
  });
};
