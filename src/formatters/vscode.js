export const formatVscode = (data) => {
  let output = "";

  for (const datum of data) {
    if (
      datum.name &&
      (datum.context.type === "mixin" || datum.context.type === "function")
    ) {
      let parameters = "";
      output += `"${datum.snippetTrigger}": {\n`;

      output += `\t"prefix": "${datum.snippetTrigger}",\n`;

      if (datum.description) {
        output += `\t"description": "${datum.description
          .split("\n")
          .slice(0, 1)}",\n`;
      }

      output += '\t"body": [\n';

      if (datum?.parameter?.length > 0) {
        for (const [idx, parameter] of datum.parameter.entries()) {
          parameters += `$\{${idx + 1}:$${parameter.name}}`;
          parameters += idx + 1 !== datum.parameter.length ? ", " : "";
        }
      }

      if (parameters) {
        output += `\t\t"${datum.prefix}${datum.name}(${parameters})`;
        if (datum.context?.value?.indexOf("@content") > -1) {
          output += ' {",\n\t\t"\t$0",\n\t\t"}",\n';
        } else {
          output += '",\n';
        }
      } else {
        output += `\t\t"${datum.prefix}${datum.name}",\n`;
      }

      output += "\t],\n},\n\n";
    }
  }

  return output;
};
