define('A', [
    'require',
    'exports'
], function (require, exports) {
    var A = function () {
        function A() {
        }
        A.prototype.add = function (number1, number2) {
            return number1 + number2;
        };
        return A;
    }();
    return A;
});
define('main', [
    'require',
    'exports',
    'A'
], function (require, exports, A) {
    var Main = function () {
        function Main() {
            var sum = new A().add(2, 3);
            alert(sum);
        }
        return Main;
    }();
    new Main();
});require(["main"]);