const Metalsmith = require("metalsmith")
const layouts = require("metalsmith-layouts")
const markdown = require("metalsmith-markdown")

Metalsmith(__dirname)
  .metadata({

  })
  .source("./src")
  .destination("./build")
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: "ejs",
    pattern: "**/*.html",
    default: "main.ejs",
  }))
  .build(err => {
    if (err) {
      throw err
    }
    console.log("DONE!")
  })
