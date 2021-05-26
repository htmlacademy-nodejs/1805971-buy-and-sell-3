'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var chalk = require("chalk");

var fs = require("fs").promises;

var path = require("path");

var _require = require("../../utils"),
    getRandomInt = _require.getRandomInt,
    shuffle = _require.shuffle,
    getPictureFileName = _require.getPictureFileName;

var _require2 = require("../../constants"),
    ExitCode = _require2.ExitCode;

var DEFAULT_COUNT = 1;
var FILE_NAME = "mocks.json";
var FILE_SENTENCES_PATH = "../../data/sentences.txt";
var FILE_TITLES_PATH = "../../data/titles.txt";
var FILE_CATEGORIES_PATH = "../../data/categories.txt";
var OfferType = {
  OFFER: "offer",
  SALE: "sale"
};
var SumRestrict = {
  MIN: 1000,
  MAX: 100000
};
var PictureRestrict = {
  MIN: 1,
  MAX: 16
};

var readContent = function readContent(filePath) {
  var absolutePath, content;
  return regeneratorRuntime.async(function readContent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          absolutePath = path.join(__dirname, filePath);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fs.readFile(absolutePath, "utf8"));

        case 4:
          content = _context.sent;
          return _context.abrupt("return", content.split("\n"));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error(chalk.red(_context.t0));
          return _context.abrupt("return", []);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var generateOffers = function generateOffers(count, titles, categories, sentences) {
  return Array(count).fill({}).map(function () {
    return {
      category: [categories[getRandomInt(0, categories.length - 1)]],
      description: shuffle(sentences).slice(1, 5).join(" "),
      picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
      title: titles[getRandomInt(0, titles.length - 1)],
      type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX)
    };
  });
};

module.exports = {
  name: "--generate",
  run: function run(args) {
    var _args2, count, sentences, titles, categories, countOffer, content;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _args2 = _slicedToArray(args, 1), count = _args2[0];

            if (count > 1000) {
              console.info(chalk.red("\u041D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 1000 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439"));
              process.exit(ExitCode.invalidArgument);
            }

            _context2.next = 4;
            return regeneratorRuntime.awrap(readContent(FILE_SENTENCES_PATH));

          case 4:
            sentences = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(readContent(FILE_TITLES_PATH));

          case 7:
            titles = _context2.sent;
            _context2.next = 10;
            return regeneratorRuntime.awrap(readContent(FILE_CATEGORIES_PATH));

          case 10:
            categories = _context2.sent;
            countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
            content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));
            _context2.prev = 13;
            _context2.next = 16;
            return regeneratorRuntime.awrap(fs.writeFile(FILE_NAME, content));

          case 16:
            console.log(chalk.green("Operation success. File created."));
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](13);
            console.error(chalk.red("Can't write data to file..."));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[13, 19]]);
  }
};