import A= require("./A");

class Main{
  constructor(){
    var sum:number = new A().add(2,3);
    console.log(sum);
    new A().colorBG();
  }
}

new Main();
