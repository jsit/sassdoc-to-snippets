import path from 'path';
import fs from 'node:fs';
import { parse } from "scss-sassdoc-parser";
import { glob } from "glob";
import formatNeosnippet from "./formatters/neosnippet.js";
import formatVscode from "./formatters/vscode.js";

// Grab the first argument from the command line
const target = process.argv[2];

const format = () => {
  if (process.argv.indexOf('-f') > -1) {
    return process.argv[process.argv.indexOf('-f') + 1];
  } else {
    return null;
  }
};

// The data array will store all our parsed SassDoc data
let data = [];
let output;
    
const doParse = async (file) => {
  const result = await parse(file);
  return result;
}


const parseAll = async () => {
  if (!target) {
    console.log("Argument required, directory or file.");
  } else {
    if (fs.lstatSync(target).isDirectory()) {
      // If we were passed a directory, parse all the files in it
      console.log("We were passed a directory");

      const files = glob.sync(`${target}**/*.scss`);

      for (const file of files) {
        const parseResults = await doParse(file);
        parseResults.length > 0 && data.push(...parseResults);
      }
    } else if (fs.lstatSync(target).isFile()) {
      // If we were passed a file, parse just that file
      console.log("We were passed a file");
      const parseResults = await doParse(target);
      data.push(...parseResults);
    } else {
      console.log("You need to specify a file or directory");
    }
  }

  // Iterate over all data and create string of snippets
  if (format() == 'vim') {
    output = formatNeosnippet(data);
  } else if (format() == 'vscode') {
    output = formatVscode(data);
  }

  console.log(output);
}

parseAll();
