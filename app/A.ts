import JQuery = require("../lib/JQuery");

class A{
  public add(number1:number, number2:number):number{
    return number1+number2;
  }

  public colorBG():void{
    $("body").css({"background-color":"black"})
  }
}

export = A;
