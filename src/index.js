import util from "util";
import fs from "node:fs";
import { parse } from "scss-sassdoc-parser";
import { glob } from "glob";
import { dedupe } from "./utils";
import { formatNeosnippet, formatVscode } from "./formatters";

const sassdocToSnippets = async ({ src, dist, format, debug, prefix }) => {
  // The data array will store all our parsed SassDoc data
  let data = [];

  // The output will be the text of the snippet file
  let output = "";

  if (!src) {
    console.log("Argument required, directory or file.");
    return null;
  } else {
    if (fs.lstatSync(src).isDirectory()) {
      // If we were passed a directory, parse all the files in it
      const files = glob.sync(`${src}**/*.scss`);

      for (const file of files) {
        const parseResults = await parse(file);
        parseResults.length > 0 && data.push(...parseResults);
      }
    } else if (fs.lstatSync(src).isFile()) {
      // If we were passed a file, parse just that file
      const parseResults = await parse(src);
      data.push(...parseResults);
    } else {
      console.log(
        "You passed an argument that is neither a file nor a directory."
      );
      return null;
    }

    // Add new `snippetTrigger` property for use and deduplication
    // Add `prefix` if one has been specified
    data.map((datum) => {
      datum.prefix = prefix;
      datum.snippetTrigger = datum.name;
      return datum;
    });

    // Deduplicate snippetTriggers
    data = dedupe(data);

    // Format data based on chosen format
    switch (format) {
      case "neosnippet":
        output = formatNeosnippet(data);
        break;
      case "vscode":
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

    debug &&
      console.log(
        util.inspect(data, { showHidden: false, depth: null, colors: true })
      );

    debug && console.log(output);

    return output;
  }
};

export default sassdocToSnippets;
