"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatVscode = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var formatVscode = function formatVscode(data) {
  var output = "";
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var datum = _step.value;
      if (datum.name && (datum.context.type === "mixin" || datum.context.type === "function")) {
        var _datum$parameter;
        var parameters = "";
        output += "\"".concat(datum.snippetTrigger, "\": {\n");
        output += "\t\"prefix\": \"".concat(datum.snippetTrigger, "\",\n");
        if (datum.description) {
          output += "\t\"description\": \"".concat(datum.description.split("\n").slice(0, 1), "\",\n");
        }
        output += '\t"body": [\n';
        if ((datum === null || datum === void 0 ? void 0 : (_datum$parameter = datum.parameter) === null || _datum$parameter === void 0 ? void 0 : _datum$parameter.length) > 0) {
          var _iterator2 = _createForOfIteratorHelper(datum.parameter.entries()),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                idx = _step2$value[0],
                parameter = _step2$value[1];
              parameters += "${".concat(idx + 1, ":$").concat(parameter.name, "}");
              parameters += idx + 1 !== datum.parameter.length ? ", " : "";
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        if (parameters) {
          var _datum$context, _datum$context$value;
          output += "\t\t\"".concat(datum.prefix).concat(datum.name, "(").concat(parameters, ")");
          if (((_datum$context = datum.context) === null || _datum$context === void 0 ? void 0 : (_datum$context$value = _datum$context.value) === null || _datum$context$value === void 0 ? void 0 : _datum$context$value.indexOf("@content")) > -1) {
            output += ' {",\n\t\t"\t$0",\n\t\t"}",\n';
          } else {
            output += '",\n';
          }
        } else {
          output += "\t\t\"".concat(datum.prefix).concat(datum.name, "\",\n");
        }
        output += "\t],\n},\n\n";
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return output;
};
exports.formatVscode = formatVscode;