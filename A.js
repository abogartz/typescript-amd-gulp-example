define(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        A.prototype.add = function (number1, number2) {
            return number1 + number2;
        };
        return A;
    })();
    return A;
});
