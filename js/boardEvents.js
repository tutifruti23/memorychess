$(function(){
    let idBoard='board';
    let gameMethod;
    if(idGame === "m1")
        gameMethod=new GameMethodsMateInOne(idBoard);
    else if (idGame === "memory")
        gameMethod=new GameMethodsMemory(idBoard);
    else
        gameMethod=new GameMethodsAllCaptures(idBoard);
    new GameController(gameMethod);
});