import path from 'path';
import fs from 'node:fs';
import { parse } from "scss-sassdoc-parser";
import { glob } from "glob";
import { formatNeosnippet, formatVscode } from "./formatters";

// The data array will store all our parsed SassDoc data
let data = [];

// The output will be the text of the snippet file
let output = '';
    
const doParse = async (file) => {
  const result = await parse(file);
  return result;
}

const sassdocToSnippets = async ({src, dist, format}) => {
  if (!src) {
    console.log("Argument required, directory or file.");
    return null;
  } else {
    if (fs.lstatSync(src).isDirectory()) {
      // If we were passed a directory, parse all the files in it
      const files = glob.sync(`${src}**/*.scss`);

      for (const file of files) {
        const parseResults = await doParse(file);
        parseResults.length > 0 && data.push(...parseResults);
      }
    } else if (fs.lstatSync(src).isFile()) {
      // If we were passed a file, parse just that file
      const parseResults = await doParse(src);
      data.push(...parseResults);
    } else {
      console.log("You passed an argument that is neither a file nor a directory.");
      return null;
    }

    // Format data based on chosen format
    switch(format) {
      case 'vscode':
        output = formatVscode(data);
        break;
      case 'neosnippet':
        output = formatNeosnippet(data);
        break;
      default:
        // Use VSCode by default, I guess
        output = formatVscode(data);
    }

    // If an output file is specified, write to it
    if (dist) {
      fs.appendFile(dist, output, (err) => {
        err && console.log(err);
      }); 
    }

    return output;
  }
}

export default sassdocToSnippets;
