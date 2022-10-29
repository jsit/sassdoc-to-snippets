"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _neosnippet = require("./neosnippet");
Object.keys(_neosnippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _neosnippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _neosnippet[key];
    }
  });
});
var _vscode = require("./vscode");
Object.keys(_vscode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vscode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vscode[key];
    }
  });
});