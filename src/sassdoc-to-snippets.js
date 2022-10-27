import sassdocToSnippets from "./index.js";

// Grab the first argument from the command line, the thing we're going to parse
const src = process.argv[2];

// Get the specified snippet format from the -f flag
const format = process.argv.indexOf('-f') > -1 ? process.argv[process.argv.indexOf('-f') + 1] : '';

// Get the output file from the -o flag
const outputFile = process.argv.indexOf('-o') > -1 ? process.argv[process.argv.indexOf('-o') + 1] : '';

const echoSnippets = async () => {
  const snippets = await sassdocToSnippets({
    "format": format,
    "src": src,
    "dist": outputFile,
  });
}

echoSnippets();
