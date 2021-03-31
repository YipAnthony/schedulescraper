"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var url = 'https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1d8290284480469a9311657beea043b5&random=5eea3c645f5c1&iframeid=&mode=p';
var clickSelectedDate = function (dateToClick, page) { return __awaiter(void 0, void 0, void 0, function () {
    var allDates, isLoaded, i, dateElement, innerHTML, date, number;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$$('.datepicker-available-day')];
            case 1:
                allDates = _a.sent();
                isLoaded = false;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i <= allDates.length - 1)) return [3 /*break*/, 9];
                dateElement = allDates[i];
                return [4 /*yield*/, dateElement.$eval('a', function (element) { return element.textContent; })];
            case 3:
                innerHTML = _a.sent();
                date = Number(innerHTML);
                if (!(date === dateToClick)) return [3 /*break*/, 8];
                return [4 /*yield*/, dateElement.click()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!!isLoaded) return [3 /*break*/, 8];
                return [4 /*yield*/, page.waitForTimeout(50)];
            case 6:
                _a.sent();
                return [4 /*yield*/, printSelectedDate(page)];
            case 7:
                number = _a.sent();
                if (number === dateToClick) {
                    isLoaded = true;
                }
                return [3 /*break*/, 5];
            case 8:
                i++;
                return [3 /*break*/, 2];
            case 9: return [2 /*return*/];
        }
    });
}); };
var printSelectedDate = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var currentSelectedDate, innerHTML, number;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$('#offering-page-selected-long-date')];
            case 1:
                currentSelectedDate = _a.sent();
                return [4 /*yield*/, (currentSelectedDate === null || currentSelectedDate === void 0 ? void 0 : currentSelectedDate.evaluate(function (element) { return element.textContent; }))];
            case 2:
                innerHTML = _a.sent();
                number = Number(innerHTML.replace(/[^\d.-]/g, ""));
                return [2 /*return*/, number];
        }
    });
}); };
var getNextDate = function (today, increment) {
    var tomorrow = new Date(today);
    tomorrow.setDate(new Date().getDate() + increment);
    return {
        date: tomorrow,
        dateNumber: tomorrow.getDate()
    };
};
var scraper = function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, todayDate, datesArray, i, nextDate, browser, page, i, date, output, nextMonthArrow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                todayDate = today.getDate();
                datesArray = [todayDate];
                // add in two weeks worth of dates
                for (i = 1; i <= 14; i++) {
                    nextDate = getNextDate(today, i).dateNumber;
                    datesArray.push(nextDate);
                }
                ;
                console.log(datesArray);
                return [4 /*yield*/, puppeteer_1.default.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 3:
                _a.sent();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i <= datesArray.length - 1)) return [3 /*break*/, 12];
                date = datesArray[i];
                return [4 /*yield*/, clickSelectedDate(date, page)];
            case 5:
                _a.sent();
                return [4 /*yield*/, printSelectedDate(page)];
            case 6:
                output = _a.sent();
                console.log("This is the date:", output);
                if (!(datesArray[i + 1] < date)) return [3 /*break*/, 10];
                return [4 /*yield*/, page.$('.ui-datepicker-next')];
            case 7:
                nextMonthArrow = _a.sent();
                return [4 /*yield*/, (nextMonthArrow === null || nextMonthArrow === void 0 ? void 0 : nextMonthArrow.click())];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(1000)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                ;
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 4];
            case 12: return [2 /*return*/];
        }
    });
}); };
scraper();
