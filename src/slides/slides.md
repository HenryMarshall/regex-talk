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

==========

## Why Learn Regex

- Powerful and Concise
- Truly cross-platform
- Will be around forever
- Easy to learn

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
// [ 'foo', 'bar' ]

const windows_str = "foo\r\nbar"
windows_str.split("\n")
// [ 'foo\r', 'bar' ]
```

----------

## Repeating Characters

| Pattern   | Description             | Matches                      |
| --------- | ----------------------- | ---------------------------- |
| `a?`      | Zero or One 'a'         | '' 'a'                       |
| `a*`      | Zero or More 'a'        | '' 'a' 'aa' 'aaa' 'aaaa'...  |
| `a+`      | One or More 'a'         | 'a' 'aa' 'aaa' 'aaaa'...     |
| `a{3}`    | Exactly three 'a'       | 'aaa'                        |
| `a{2,4}`  | Two to four 'a'         | 'aa' 'aaa' 'aaaa'            |

Note: Omitting the first and second numbers implicitly means 0 and infinite respectively.

----------

## Splitting on Lines

```javascript
const reg = /\r?\n/

const unix_str = "foo\nbar"
unix_str.split(reg)
// [ 'foo', 'bar' ]

const windows_str = "foo\r\nbar"
windows_str.split(reg)
// [ 'foo', 'bar' ]
```

----------

![Crossword 1](./images/regex_xword_1.svg)

----------

![Crossword 1 Solution](./images/regex_xword_1_solution.svg)

==========

## The dot character

```javascript
const reg = /ba./

reg.test("foo") // false
reg.test("bar") // true
reg.test("baz") // true
```

----------

![Crossword 2](./images/regex_xword_2.svg)

----------

![Crossword 2 Solution](./images/regex_xword_2_solution.svg)

==========

## Matching Either Or

```javascript
const reg = /???/

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")
```

----------


## "Solution" with .

```javascript
const reg = /grand.a/g

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")
// "My family has a cat. My family has a dog."

reg.test(str)
// true

reg.test("My grandxa has a hamster")
// true
```

----------

## Character Class

```javascript
const reg = /grand[mp]a/g

const str = "My grandma has a cat. My grandpa has a dog."
str.replace(reg, "family")
// "My family has a cat. My family has a dog."

reg.test(str)
// true

reg.test("My grandxa has a hamster")
// false
```

Note: The `g` flag makes the regex global.

----------

## Regex Are Like Lego




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

```javascript
const reg = /???/

const containsNonVowel = str => reg.test(str)
containsNonVowel("foo")
// true

containsNonVowel("AAAAAAAA")
// false
```

----------

## Negation

```javascript
const reg = /[^aeiou]/i

const containsNonVowel = str => reg.test(str)
containsNonVowel("foo")
// true

containsNonVowel("AAAAAAAA")
// false
```

----------

## Shorthand Negation

| Shorthand | Equivalent |
| --------- | ---------- |
| `\D`      | `[^\d]`    |
| `\S`      | `[^\s]`    |
| `\W`      | `[^\w]`    |
| `.`       | `[^\r\n]`  |

----------

## Literal Characters

| Command | Matches |
| ------- | ------- |
| `a`     | `a`     |
| `\?`    | `?`     |
| `\.`    | `.`     |
| `\\`    | `\`     |

----------

![Crossword 3](./images/regex_xword_3.svg)

----------

![Crossword 3 Solution](./images/regex_xword_3_solution.svg)

==========

## Groups

```javascript
const reg = /???/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// true
```

----------

## "Solution" with Character Class

```javascript
const reg = /[na]+/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// true

isTheme("aaaaannnnnnnnn Batman!")
// true
```

----------

## Groups

```javascript
const reg = /(na)+/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// true

isTheme("aaaaannnnnnnnn Batman!")
// false
```

----------

## Alternation in Groups

```javascript
const reg = /???/g

const str = "My brother has a ferret. My sister has a cat."
str.replace(reg, "family")
// "My family has a ferret. My family has a cat."
```

----------

## Alternation in Groups

```javascript
const reg = /(brother|sister)/g

const str = "My brother has a ferret. My sister has a cat."
str.replace(reg, "family")
// "My family has a ferret. My family has a cat."
```

----------

## More than 1 way to match a query

```javascript
const regCharacterClass = /grand[mp]a/g
const regAlternationLetter = /grand(m|p)a/g
const regAlternationWord = /(grandma|grandpa)/g
```

----------

## Backreferences

```javascript
const reg = /???/

const strings = ["foo-foo", "foo-bar", "bar-bar"]
strings.filter(str => reg.test(str))
// [ "foo-foo", "bar-bar" ]
```

----------

## Backreferences

```javascript
const reg = /(\w+)-\1/

const strings = ["foo-foo", "foo-bar", "bar-bar"]
strings.filter(str => reg.test(str))
// [ "foo-foo", "bar-bar" ]
```

Note: Backreferences are 1-indexed

----------

## Capture Groups

```javascript
const reg = /???/

const str = "Stripe costs 2.9% + $0.30"
const getPercentage = str => str.match(reg)[1]
getPercentage(str)
// "2.9"
```

Note: To include `%`, move it inside the capture group

----------

## Capture Groups

```javascript
const reg = /(100|\d{1,2}(\.\d+)?)%/

const str = "Stripe costs 2.9% + $0.30"
const getPercentage = str => str.match(reg)[1]
getPercentage(str)
// "2.9"
```

Note: To include `%`, move it inside the capture group

==========

## Dot All the Things

```javascript
const extract_comment = /\/\*(.+)\*\//s
const contains_comment = `this.bit.is.code()
/* this is a comment
this too */
more.code()`
contains_comment.match(extract_comment)[1].strip
// "this is a comment\nthis too"

const es3_extract_comment = /\/\*([\w\W]+)\*\//
```

----------

## Syntax Highlighting

- [Vim](https://github.com/pangloss/vim-javascript/blob/master/syntax/javascript.vim#L202)
- [Emacs](https://github.com/mooz/js2-mode/blob/master/js2-mode.el#L6160)
- [Highlight.js](https://github.com/isagalaev/highlight.js/blob/master/src/highlight.js#L756) (including this talk)
- [Sublime](https://github.com/Benvie/JavaScriptNext.tmLanguage/blob/master/JavaScriptNext.tmLanguage#L70)
- [Atom](https://github.com/atom/language-javascript/blob/master/grammars/javascript.cson#L1890)


----------

## Other times `.` is too much

```javascript
const foo = 'foo="foo"'
foo.match(/"(.+)"/g)
// [ 'foo' ]

const foobar = 'foo="foo",bar="bar"'
foo.match(/"(.+)"/g, foobar)
// [ 'foo", bar="bar' ]

foo.match(/"([^"]+)"/g, foobar)
// [ 'foo',
//   'bar' ]
```

Note:
- Think about the interpretter
- You can make the regex engine lazy with `?`
- Quirk in js engine means this is a lie

----------

![Crossword 4](./images/regex_xword_4.svg)

----------

![Crossword 4 Solution](./images/regex_xword_4_solution.svg)

==========

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
const containsNonVowel = str => /[^aeiou]/i.test(str)
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

## Wrapping Up

----------

## Flavors of Regex

- Backreferences are by either:
  - `\1 \2` (Javascript, Perl, Python)
  - `$1 $2` (Ruby, Rust, PHP, Java)
  - `%1 %2` (Clojure)
- Basics are ~universal across languages
- Some advanced features vary (e.g., lookarounds, named references)
- Javascript methods for global regex are a mess

----------

## Where to use RegEx

Note: Your code, your config files, your editor

----------

## Your word processor

![Google Docs](images/google_docs.png)

----------

## Chrome via DeepSearch

![Deep Search](images/deep_search.png)

----------

## Resources

- Slides: [http://bit.ly/regex101](http://henrymarshall.github.io/regex-talk)
- Handout: [http://bit.ly/regex101-cheatsheet](http://bit.ly/regex101-cheatsheet)
- [RegexCrossword.com](https://regexcrossword.com/) Web App
- [github.com/aloisdg/awesome-regex](https://github.com/aloisdg/awesome-regex)

----------

Henry Marshall

Engineer at Stripe

henry@stripe.com

henry@isagoddamn.ninja

----------

## Questions

----------

![Crossword 5](./images/regex_xword_5.svg)

----------

![Crossword 5 Solution](./images/regex_xword_5_solution.svg)

