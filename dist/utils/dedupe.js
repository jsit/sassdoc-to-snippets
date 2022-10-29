"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupe = void 0;
// Take an array of SassDoc data, and deduplicate the "name" values
var dedupe = function dedupe(data) {
  var existingNames = [];
  data.map(function (datum) {
    if (!existingNames.includes(datum.snippetTrigger)) {
      existingNames.push(datum.snippetTrigger);
    } else {
      var newName = datum.snippetTrigger;
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
exports.dedupe = dedupe;