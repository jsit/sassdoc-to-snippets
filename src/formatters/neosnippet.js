export const formatNeosnippet = (data) => {
  let output = "";

  for (const datum of data) {
    if (
      datum.name &&
      (datum.context.type === "mixin" || datum.context.type === "function") &&
      datum.context.scope !== "private"
    ) {
      let parameters = "";
      output += `snippet ${datum.snippetTrigger}\n`;

      if (datum.description) {
        // Only use the first line of the description
        output += `abbr ${datum.description.split("\n").slice(0, 1)}\n`;
      }

      if (datum.context.type === "mixin") {
        output += "regexp '@include'\n";
      }

      if (datum?.parameter?.length > 0) {
        for (const [idx, parameter] of datum.parameter.entries()) {
          parameters += `$\{${idx + 1}:$${parameter.name}}`;
          parameters += idx + 1 !== datum.parameter.length ? ", " : "";
        }
      }

      if (parameters) {
        output += `\t${datum.prefix}${datum.name}(${parameters})`;
        if (datum.context?.value?.indexOf("@content") > -1) {
          output += " {\n\t\t$0\n\t}";
        }
      } else {
        output += `\t${datum.prefix}${datum.name}`;
      }

      output += "\n\n";
    }
  }

  return output;
};
