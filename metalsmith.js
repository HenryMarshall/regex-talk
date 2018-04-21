const Metalsmith = require("metalsmith")
const branch = require("metalsmith-branch")
const layouts = require("metalsmith-layouts")
const copy = require("metalsmith-copy")

const converter = require("./build_lib/metalsmith_converter")

Metalsmith(__dirname)
  .metadata({

  })
  .source("./src")
  .destination("./build")
  .clean(true)
  .use(branch("**/slides/*.md")
    .use(converter())
    .use(copy({
      pattern: "**/*.md",
      extension: ".html",
      move: true,
    }))
  )
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
