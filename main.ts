import A= require("./A");
class Main{
  constructor(){
    var sum:number = new A().add(2,3);
    alert(sum);
  }
}

new Main();
