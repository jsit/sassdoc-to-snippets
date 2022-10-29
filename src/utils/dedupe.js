// Take an array of SassDoc data, and deduplicate the "name" values
export const dedupe = (data) => {
  const existingNames = [];

  data.map((datum) => {
    if (!existingNames.includes(datum.snippetTrigger)) {
      existingNames.push(datum.snippetTrigger);
    } else {
      let newName = datum.snippetTrigger;

      while (existingNames.includes(newName)) {
        newName += "_";
      }

      existingNames.push(newName);
      datum.snippetTrigger = newName;
    }

    return datum;
  });

  return data;
};
