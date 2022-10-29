# SassDoc to Snippets

Convert [SassDoc](http://sassdoc.com)-commented Sass to snippets files.

Ignores `private`ly-scoped mixins/functions/variables.

Can be used in Gulp et al. (I think).

## Usage

```sh
sassdoc-to-snippets ./scss/ -f vscode -o ./scss.json
```

(requires trailing slash for directories)

### Flags

- `-o filename`: Output to `filename`
- `-f format`: Render snippets in `format` format
- `-p prefix`: Prefix snippet expansions with `prefix` (for when you're
    namespacing with [Sass modules](https://sass-lang.com/documentation/at-rules/use))
- `--debug`: Output the processed SassDoc data as well as the resulting snippets

## Example

### Input

```scss
/// Add padding around an element
///
/// @param {String} $value
@mixin add-padding($value) {
  padding: $value;
}
```

### Output

#### [VSCode](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

```json
{
  "add-padding": {
    "prefix": "add-padding",
    "description": "Add padding around an element",
    "body": [
      "add-padding(${1:$value})"
    ]
  }
}
```

#### [Neosnippet](https://github.com/Shougo/neosnippet.vim) (Vim)

```neosnippet
snippet add-padding
abbr Add padding around an element
  add-padding(${1:$value})
```

## Contributing

Edit in `src`, run `npm run build` to compile.

Know of a snippet syntax for some other editor? Please file an Issue or PR!
