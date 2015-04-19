define(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        A.prototype.add = function (number1, number2) {
            return number1 + number2;
        };
        A.prototype.colorBG = function () {
            $("body").css({ "background-color": "black" });
        };
        return A;
    })();
    return A;
});
//# sourceMappingURL=A.js.map