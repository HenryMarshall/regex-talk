const Metalsmith = require("metalsmith")
const branch = require("metalsmith-branch")
const layouts = require("metalsmith-layouts")
const copy = require("metalsmith-copy")

const R = require("ramda")
const marked = require("marked")


const converter = options => (files, metalsmith, done) => {
  R.forEachObjIndexed(file => {
    const markdown = file.contents.toString()

    // Anything wrapped should be converted from MD you already trust.
    const wrap = contents => `<section>${contents}</section>`

    const splitSlides = R.pipe(
      R.split(new RegExp(file["data-separator"], "m")),
      R.map(R.split(new RegExp(file["data-separator-vertical"], "m")))
    )

    const isOnlySlideInColumn = R.pipe(R.length, R.gte(1))
    const formatSubsection = R.pipe(R.trim, marked)

    const slides = R.pipe(
      splitSlides,
      R.map(R.map(formatSubsection)),
      R.map(R.pipe(
        R.ifElse(
          isOnlySlideInColumn,
          R.head,
          R.pipe(
            R.map(wrap),
            R.join("\n")
          )
        ),
        wrap
      )),
      R.join("\n")
    )(markdown)

    Object.assign(file, { contents: new Buffer(slides) })
  }, files)
  done()
}

Metalsmith(__dirname)
  .metadata({

  })
  .source("./src")
  .destination("./build")
  .clean(true)
  .use(branch("**/*.md")
    .use(converter())
    .use(copy({
      pattern: "**/*.md",
      extension: ".html",
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
