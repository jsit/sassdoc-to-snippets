#!/usr/bin/env node

import sassdocToSnippets from "./index.js";

// Grab the first argument from the command line, the thing we're going to parse
const src = process.argv[2];

// Get the specified snippet format from the -f flag
const format =
  process.argv.indexOf("-f") > -1
    ? process.argv[process.argv.indexOf("-f") + 1]
    : "";

const prefix =
  process.argv.indexOf("-p") > -1
    ? process.argv[process.argv.indexOf("-p") + 1]
    : "";

// Get the output file from the -o flag
const outputFile =
  process.argv.indexOf("-o") > -1
    ? process.argv[process.argv.indexOf("-o") + 1]
    : "";

const debug = process.argv.indexOf("--debug") > -1;

const generateSnippets = async () => {
  await sassdocToSnippets({
    format,
    src,
    dist: outputFile,
    debug,
    prefix,
  });
};

generateSnippets();
