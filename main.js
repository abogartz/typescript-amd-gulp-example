define(["require", "exports", "./A"], function (require, exports, A) {
    var Main = (function () {
        function Main() {
            var sum = new A().add(2, 3);
            alert(sum);
        }
        return Main;
    })();
    new Main();
});
