define('app/A', [
    'require',
    'exports'
], function (require, exports) {
    var A = function () {
        function A() {
        }
        A.prototype.add = function (number1, number2) {
            return number1 + number2;
        };
        A.prototype.colorBG = function () {
            $('body').css({ 'background-color': 'black' });
        };
        return A;
    }();
    return A;
});
define('app/main', [
    'require',
    'exports',
    'app/A'
], function (require, exports, A) {
    var Main = function () {
        function Main() {
            var sum = new A().add(2, 3);
            console.log(sum);
            new A().colorBG();
        }
        return Main;
    }();
    new Main();
});require(["app/main"]);