---
title: "Intro to Regular Expressions"
author: "Henry Marshall"

separator: "^={4,}$"
separator-vertical: "^-{4,}$"
separator-notes: "^Notes?:"
charset: "utf-8"
---

# Regex 101

<p style="text-align: center;">Henry Marshall</p>
<p style="text-align: center;">SEM.js</p>
<p style="text-align: center;">2019-03-11</p>

==========

## Why Learn Regex

- Powerful and Concise
- Truly cross-platform
- Will be around forever

----------

## What's a Regex?

- Way of describing patterns
- Tool for extracting data

----------

## My History with Regex

==========

## The Problem

```javascript
const unix_str = "foo\nbar"
const windows_str = "foo\r\nbar"
```

----------

## Splitting on Lines

```javascript
const unix_str = "foo\nbar"
unix_str.split("\n")
// => [ 'foo', 'bar' ]

const windows_str = "foo\r\nbar"
windows_str.split("\n")
// => [ 'foo\r', 'bar' ]
```

----------

## Repeating Characters

| Pattern   | Description             | Matches                      |
| --------- | ----------------------- | ---------------------------- |
| `a?`      | One or Zero 'a'         | '' 'a'                       |
| `a*`      | Zero or More 'a'        | '' 'a' 'aa' 'aaa' 'aaaa'...  |
| `a+`      | One or More 'a'         | 'a' 'aa' 'aaa' 'aaaa'...     |
| `a{3}`    | Exactly three 'a'       | 'aaa'                        |
| `a{2,4}`  | Two to four 'a'         | 'aa' 'aaaa' 'aaaa'           |

Note: Omitting the first and second numbers implicitly means 0 and infinite respectively.

----------

## Splitting on Lines

```javascript
const reg = /\r?\n/

const unix_str = "foo\nbar"
unix_str.split(reg)
// => [ 'foo', 'bar' ]

const windows_str = "foo\r\nbar"
windows_str.split(reg)
// => [ 'foo', 'bar' ]
```

----------

![Crossword 1](./images/regex_xword_1.svg)

----------

![Crossword 1 Solution](./images/regex_xword_1_solution.svg)

----------

![Crossword 2](./images/regex_xword_2.svg)

----------

![Crossword 2 Solution](./images/regex_xword_2_solution.svg)

==========

## Character Class

```javascript
const reg = /???/

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")
```

----------


## Character Class

```javascript
const reg = /grand.a/

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")

reg.test(str)
// true

reg.test("My grandxa has a dog")
// true
```

----------

## Character Class

```javascript
const reg = /grand[mp]a/g

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")
// => "My family has a cat. My family has a dog."

reg.test(str)
// true

reg.test("My grandxa has a dog")
// false
```

Note: The `g` flag makes the regex global.

----------
## Shorthand Character Class

| Shorthand | Equivalent      |
| --------- | --------------- |
| `[0-9]`   | `[0123456789]`  |
| `\d`      | `[0-9]`         |
| `\w`      | `[A-Za-z\d_]`   |
| `\s`      | `[ \t\n\r]`     |

Note: I can (and did) use `\d` inside another character class!

----------

## Negation

```js
const reg = /???/

const containsNonVowel = str => reg.test(str)
containsNonVowel("foo")
// => true
```

----------

## Negation

```js
const reg = /[^aeiou]/

const containsNonVowel = str => reg.test(str)
containsNonVowel("foo")
// => true
```

----------

## Shorthand Negation

| Shorthand | Equivalent |
| --------- | ---------- |
| `.`       | `[^\r\n]`  |
| `\D`      | `[^\d]`    |
| `\S`      | `[^\s]`    |
| `\W`      | `[^\w]`    |

----------

![Crossword 3](./images/regex_xword_3.svg)

----------

![Crossword 3 Solution](./images/regex_xword_3_solution.svg)

==========

## Groups

```js
const reg = /???/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// => true
```

----------

## Groups

```js
const reg = /[na]+/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// => true

isTheme("aaaaannnnnnnnn Batman!")
// => true
```

----------

## Groups

```js
const reg = /(na)+/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// => true

isTheme("aaaaannnnnnnnn Batman!")
// => false
```

----------

## Alternation in Groups

```javascript
const reg = /???/g

const str = "My brother has a ferret. My sister has a cat."
str.replace(reg, "family")
// => "My family has a ferret. My family has a cat."
```

----------

## Alternation in Groups

```javascript
const reg = /(brother|sister)/g

const str = "My brother has a ferret. My sister has a cat."
str.replace(reg, "family")
// => "My family has a ferret. My family has a cat."
```

----------

## More than 1 way to match a query

```javascript
const regCharacterClass = /grand[mp]a/g
const regAlternationGroup = /grand(m|p)a/g
```

----------

## Backreferences

```javascript
const reg = /???/

const strings = ["foo-foo", "foo-bar", "bar-bar"]
strings.filter(str => reg.test(str))
// => [ "foo-foo", "bar-bar" ]
```

----------

## Backreferences

```javascript
const reg = /(\w+)-\1/

const strings = ["foo-foo", "foo-bar", "bar-bar"]
strings.filter(str => reg.test(str))
// => [ "foo-foo", "bar-bar" ]
```

Note: Backreferences are 1-indexed

----------

## Replace Interpolation

```javascript
const str = "My brother has a ferret."
str.replace(/(brother|sister)/g, "???")
// => "My step-brother has a ferret."
```


----------

## Replace Interpolation

```javascript
const str = "My brother has a ferret."
str.replace(/(brother|sister)/g, "step-$1")
// => "My step-brother has a ferret."
```

Note: Use `$1` instead of `\1`

----------

## Capture Groups

```js
const reg = /???/

const str = "Stripe costs 2.9% + $0.30"
const getPercentage = str => str.match(reg)[1]
getPercentage(str)
// => "2.9"
```

Note: To include `%`, move it inside the capture group

----------

## Capture Groups

```js
const reg = /(100|\d{1,2}(\.\d+)?)%/

const str = "Stripe costs 2.9% + $0.30"
const getPercentage = str => str.match(reg)[1]
getPercentage(str)
// => "2.9"
```

Note: To include `%`, move it inside the capture group


----------

## Named Captures

```js
const reg = /(?<day>\d{1,2})\/(?<month>\d{1,2})\/(?<year>\d{4})/

const str = "Apollo 11 landed on the moon on 20/7/1969"
const extractDate = str => str.match(reg)
extractDate(str).groups
// => {day: "20", month: "7", year: "1969"}
```

Note: 
- New to ES2018
- In pattern with `\k<year>`
- Backreference with `

==========

## JavaScript is Weird

```javascript
"bar baz".match(/ba\w/)    
// => [ "bar", index: 0, input: "bar baz",
//      groups: undefined ]
"bar baz".match(/ba(\w)/)  
// => [ "bar", "r", index: 0 input "bar baz", 
//      groups: undefined ]
"bar baz".match(/ba\w/g)   // => [ "bar", "baz" ]
"bar baz".match(/ba(\w)/g) // => [ "bar", "baz" ]
"bar baz".match(/foo/)     // => null
"bar baz".match(/foo/g)    // => null
```

Note: 
- I hereafter omit `groups: undefined` which are for named groups

----------

## `.exec` maintains an index

```javascript
const allMatches = (reg, str) => {
  let match
  const output = []
  while (match = reg.exec(str)) {
    output.push(match);
  }
  return output
}
allMatches(/ba(\w)/g, "bar baz") 
// => [ [ 'bar', 'r', index: 0, input: 'bar baz' ],
//      [ 'baz', 'z', index: 4, input: 'bar baz' ] ]
```

==========

## Dot All the Things

```javascript
const extract_comment = /\/\*(.+)\*\//s
const contains_comment = `this.bit.is.code()
/* this is a comment
this too */
more.code()`
contains_comment.match(extract_comment)[1].strip
// => "this is a comment\nthis too"

const es3_extract_comment = /\/\*([\w\W]+)\*\//
```

This is what [your](https://github.com/mooz/js2-mode/blob/master/js2-mode.el#L6160) [syntax](https://github.com/isagalaev/highlight.js/blob/master/src/highlight.js#L756) [highlighter](https://github.com/pangloss/vim-javascript/blob/master/syntax/javascript.vim#L202) [is](https://github.com/Benvie/JavaScriptNext.tmLanguage/blob/master/JavaScriptNext.tmLanguage#L70) [doing](https://github.com/atom/language-javascript/blob/master/grammars/javascript.cson#L1890)!

----------

## Other times `.` is too much

```javascript
const foo = 'foo="foo"'
foo.match(/"(.+)"/g)
// => [ [ '"foo"', "foo", index: 6, input: 'foo = "foo"' ] ]

const foobar = 'foo="foo",bar="bar"'
allMatches(/"(.+)"/g, foobar)
// => [ [ '"foo", bar="bar"','foo", bar="bar', index: 4,
//      input: 'foo="foo", bar="bar"' ] ]

allMatches(/"([^"]+)"/g, foobar)
// => [ [ '"foo"', "foo", index: 4, 
//        input: 'foo="foo",bar="bar"' ],
//      [ '"bar"', "bar", index: 14, 
//        input: 'foo="foo",bar="bar"' ] ]
```

Note: 
- Think about the interpretter
- You can make the regex engine lazy with `?`

----------

![Crossword 4](./images/regex_xword_4.svg)

----------

![Crossword 4 Solution](./images/regex_xword_4_solution.svg)

==========

## Matching Email Addresses

- [Rubular](http://rubular.com) (Ruby)
- [hifi RegExp Tool](http://www.gethifi.com/tools/regex) (JavaScript)

----------

## Matching Email Addresses

```regex
/[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
```

| Section          | Meaning                                         |
| ---------------- | ----------------------------------------------- |
| `[\w.%+-]+`      | 1+ of: letter, number, `.`, `_`, `%`, `+`, `-`  |
| `@`              | Literal `@`                                     |
| `[A-Z0-9.-]+`    | 1+ of: letter, number, `.`, `-`                 |
| `\.`             | Literal `.`                                     |
| `[A-Z]{2,}`      | Two or more letters                             |
| `i`              | Case Insensitive                                |

Note: 
- Escaping metacharacters was unnecessary inside char class.
- Not uncommon for regex to reject my personal email.

----------

## Matching the Whole String

```javascript
const codeInjection = 
  "<script>alert('uh oh')</script>\nfoo@bar.com"

const containsEmail = str => 
  /[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(str)
containsEmail(injection) // true

const containsOnlyEmail = str =>
  /^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(str)
containsOnlyEmail(injection) // false
```

Note: 
- Ruby treats as multi-line by default -- use `\A` & `\z`.
- If you *want* that behavior, use multiline flag `m`.

==========

## `^`'s various meanings

```javascript
const isFirstCharacterVowel = str => /^[aeiou]/i.test(str)
const containsNonVowel = str => /[^aeiou]/i
```

Note: `?` is also tricky

----------


## \ ^ $ . | ? * + ( ) [ ] { }

Note:
- Over-escaping not a problem
- You *may* escape in character classes.

----------

## Regex Often Fail Silently

```javascript
const reg =  /[abc]{2}[xyz]+/
reg.test("cbz")     // true
reg.test("axx")     // false
reg.test("a")       // false

const typo = /[abc}{2}[xyz]+/
```

----------

## Regex Often Fail Silently

```javascript
const reg =  /[abc]+[xyz]+/
reg.test("cbz")     // true
reg.test("axx")     // false
reg.test("a")       // false

const typo = /[abc}{2}[xyz]+/
typo.test("cbz")    // true
typo.test("axx")    // true
typo.test("a")      // true
typo.test("[")      // true
typo.test("2")      // true
```

Note: Test the negatives

==========

## Where to use RegEx

Note: Your code, your config files, your editor

----------

## Your word processor

![Google Docs](images/google_docs.png)

----------

## PDF

- [pdfgrep](https://pdfgrep.org/) Cross Platform CLI (FOSS)
- [dnGrep](http://dngrep.github.io/) GUI for Windows (FOSS)
- [FileLocator Pro](https://www.mythicsoft.com/filelocatorpro/) GUI for Windows ($60)

----------

## Chrome via DeepSearch

![Deep Search](images/deep_search.png)

----------

```plaintext
GREP(1)                                       User Commands

NAME
      grep, egrep, fgrep, rgrep - 
        print lines matching a pattern

SYNOPSIS
      grep [OPTIONS] PATTERN [FILE...]
      grep [OPTIONS] -e PATTERN ... [FILE...]
      grep [OPTIONS] -f FILE ... [FILE...]

DESCRIPTION
      grep  searches  for PATTERN in each FILE.  A FILE of 
      “-” stands for standard input.  If no FILE is given,
```

----------

[![Book Cover](images/parsing_html_with_regex.png)](https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags)

==========

## Wrapping Up

----------

## Flavors of Regex

- Backreferences are by either:
  - `\1 \2` (Javascript, Perl, Python)
  - `$1 $2` (Ruby, Rust, PHP, Java)
  - `%1 %2` (Clojure)
- Basics are ~universal across languages
- Some advanced features vary (e.g., lookarounds, named references)

----------

## Regex Crosswords

- [Original MIT Crossword](https://gregable.com/p/regexp-puzzle.html)
- [RegexCrossword.com](https://regexcrossword.com/) Web App
- [Regex Xword](https://play.google.com/store/apps/details?id=com.ilit.regexxword&hl=en_US) Android App

----------

## Next Steps

- [Unicode](http://2ality.com/2017/07/regexp-unicode-property-escapes.html)
- [Non-Capturing Groups](https://stackoverflow.com/a/3513858/1884044)
- [Laziness](https://www.regular-expressions.info/repeat.html)
- [Lookarounds](https://www.regular-expressions.info/lookaround.html)

----------

## Resources

- Slides: [http://bit.ly/regex101](http://bit.ly/regex101)
- Handout: [http://bit.ly/regex101-cheatsheet](http://bit.ly/regex101-cheatsheet)
- [Regular-Expressions.info](https://www.regular-expressions.info/)
- [ES2018 Regex changes in SmashingMagazine](https://www.smashingmagazine.com/2019/02/regexp-features-regular-expressions/)
- [Jeff Atwood's ode to regex](https://blog.codinghorror.com/regular-expressions-now-you-have-two-problems/)
- [github.com/aloisdg/awesome-regex](https://github.com/aloisdg/awesome-regex)

----------

Henry Marshall

Engineer at Stripe

henry@stripe.com

henry@isagoddamn.ninja

----------

![Crossword 5](./images/regex_xword_5.svg)

----------

![Crossword 5 Solution](./images/regex_xword_5_solution.svg)
