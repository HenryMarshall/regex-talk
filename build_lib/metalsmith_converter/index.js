const R = require("ramda")
const marked = require("marked")

const converter = options => (files, metalsmith, done) => {
  R.forEachObjIndexed(file => {
    const markdown = file.contents.toString()

    // TODO: Regexify all delimiters with #map

    const slides = R.pipe(
      splitSlides(file),
      R.map(R.map(formatSubsection(file))),
      wrapSlidesInSections
    )(markdown)

    Object.assign(file, { contents: new Buffer(slides) })
  }, files)
  done()
}

const doesColumnHaveSingleSlide = R.pipe(R.length, R.gte(1))

// Anything wrapped should be converted from MD you already trust.
const wrap = contents => `<section>${contents}</section>`

const wrapSlidesInSections = R.pipe(
  R.map(R.pipe(
    R.ifElse(
      doesColumnHaveSingleSlide,
      R.head,
      R.pipe(
        R.map(wrap),
        R.join("\n")
      )
    ),
    wrap
  )),
  R.join("\n")
)

const formatSubsection = file => R.pipe(
  R.trim,
  wrapNotes(file["separator-notes"]),
  marked)

const wrapNotes = R.curry((noteSeparator, markdown) => {
  // The reveal.js spec has `^Notes?:` as the default separator. To enable
  // multiline notes (delimited by \n\n or end of string), we have to do some
  // special altenation magic wrt `^`.
  noteSeparator = R.replace(/^\^/, "", noteSeparator)
  const reg =
    new RegExp(`(^|\\n)${noteSeparator}\\s?([\\w\\W]+?)(?=$|\\n\\n)`, "g")

  return markdown.replace(reg, (match, p1, p2) => (
    `${p1}<aside class='notes'>${marked(p2)}</aside>`
  ))

  // TODO: We should ideally combine all notes into one. This is not part of the
  // behavior of the existing reveal.js spec
})

const splitSlides = file => R.pipe(
  R.split(new RegExp(file["separator"], "m")),
  R.map(R.split(new RegExp(file["separator-vertical"], "m")))
)

module.exports = converter
