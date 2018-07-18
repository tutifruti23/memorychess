$(function(){
    let idBoard='board';
    let gameMethod;
    if(idGame === "m1")
        gameMethod=new GameMethodsMateInOne(idBoard);
    else
        gameMethod=new GameMethodsAllCaptures(idBoard);
    new GameController(gameMethod);
});