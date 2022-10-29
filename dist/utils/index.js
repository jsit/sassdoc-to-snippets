"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _dedupe = require("./dedupe");
Object.keys(_dedupe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dedupe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dedupe[key];
    }
  });
});