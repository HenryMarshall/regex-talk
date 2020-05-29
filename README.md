# Intro to Regex

- [Slides](http://henrymarshall.github.io/regex-talk)
- [Crosswords](http://bit.ly/regex101-crossword)
- [Solutions](http://bit.ly/regex101-solutions)
- [More Resources](https://github.com/aloisdg/awesome-regex)

## Cheatsheet

### Metacharacters

| Char   | Purpose                                            |
| ------ | -------------------------------------------------- |
| `\`    | Escaping next character                            |
| `^`    | Start of String *or* Negation in Character Class   |
| `$`    | End of String                                      |
| `.`    | Any Character (Except Newlines)                    |
| `|`    | Alternation in Groups                              |
| `?`    | Zero or One *or* Lazy Mode *or* Lookarounds & more |
| `*`    | Zero or More                                       |
| `+`    | One or More                                        |
| `{}`   | Range Delimiters                                   |
| `()`   | Group Delimiters                                   |
| `[]`   | Character Class Delimiters                         |

Note: [Lazy Mode](https://www.rexegg.com/regex-quantifiers.html) & [Lookarounds](https://www.regular-expressions.info/lookaround.html) are not discussed in this workshop


### Repeating Characters

| Pattern    | Description              | Matches                      |
| ---------- | ------------------------ | ---------------------------- |
| `a?`       | Zero or One 'a'          | '' 'a'                       |
| `a*`       | Zero or More 'a'         | '' 'a' 'aa' 'aaa' 'aaaa'...  |
| `a+`       | One or More 'a'          | 'a' 'aa' 'aaa' 'aaaa'...     |
| `a{3}`     | Exactly three 'a'        | 'aaa'                        |
| `a{2,4}`   | Two to four 'a'          | 'aa' 'aaa' 'aaaa'            |
| `a{2,}`    | Two or more 'a'          | 'aa' 'aaa' 'aaaa' 'aaaaa'... |
| `a{,3}`    | Three or fewer 'a'       | '' 'a' 'aa' 'aaa'            |


### Character Class

| Pattern    | Description               | Matches                      |
| ---------- | ------------------------- | ---------------------------- |
| `[abc]`    | One of 'a', 'b' or 'c'    | 'a' 'b' 'c'                  |
| `[a-g]`    | Letters between a and g   | 'a' 'b' 'c' 'd' 'e' 'f' 'g'  |
| `[a-c1-3]` | Letters a-c or number 1-3 | 'a' 'b' 'c' '1' '2' '3'      |
| `[ab]{2}`  | Two of 'a' or 'b'         | 'aa' 'bb' 'ab' 'ba'          |


### Shorthand Character Class

| Shorthand | Equivalent      |
| --------- | --------------- |
| `[0-9]`   | `[0123456789]`  |
| `\d`      | `[0-9]`         |
| `\w`      | `[A-Za-z\d_]`   |
| `\s`      | `[ \t\n\r]`     |


### Shorthand Negation

| Shorthand | Equivalent |
| --------- | ---------- |
| `\D`      | `[^\d]`    |
| `\S`      | `[^\s]`    |
| `\W`      | `[^\w]`    |
| `.`       | `[^\r\n]`  |
| `[\w\W]`  | Anything   |


### Literal Characters

| Command | Matches |
| ------- | ------- |
| `a`     | `a`     |
| `\?`    | `?`     |
| `\.`    | `.`     |
| `\\`    | `\`     |


### Groups

```javascript
const reg = /(na)+/

const isTheme = str => reg.test(str)

isTheme("nanananananana Batman!")
// true

isTheme("aaaaannnnnnnnn Batman!")
// false
```

### Backreferences

```javascript
const reg = /(\w+)-\1/

const strings = ["foo-foo", "foo-bar", "bar-bar"]
strings.filter(str => reg.test(str))
// [ "foo-foo", "bar-bar" ]
```

Note: Backreferences are 1-indexed


### Flags

| Command | Purpose                                          |
| ------- | ------------------------------------------------ |
| `g`     | Global -- find all matches (default is 1st only) |
| `i`     | Insensitive -- Case insensitive                  |
| `m`     | Multi-line -- `^` and `$` refer to line ends     |
| `s`     | Dotall -- `.` == `[\w\W]`                        |