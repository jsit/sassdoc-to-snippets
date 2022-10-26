export default (data) => {
  let output;

  for (const datum of data) {
    if (datum.name && (datum.context.type == 'mixin' || datum.context.type == 'function')) {
      let parameters;
      output += `snippet ${datum.name}\n`;

      if (datum.description) {
        // Only use the first line of the description
        output += `abbr ${datum.description.split('\n').slice(0, 1)}\n`;
      }

      if (datum.context.type == 'mixin') {
        output += 'regexp \'@include\'\n';
      }

      if (datum?.parameter?.length > 0) {
        for (const [idx, parameter] of datum.parameter.entries()) {
          parameters += `\$\{${idx + 1}:${parameter.name}\}`
          parameters += idx + 1 !== datum.parameter.length ? ', ' : '';
        }
      }

      if (parameters) {
        output += `\t${datum.name}(${parameters})`;
        if (datum.context.type == 'mixin') {
          output += ' {\n\t\t${0}\n\t}'
        }
      } else {
        output += `\t${datum.name}`;
      }

      output += '\n\n';
    }
  }

  return output;
}