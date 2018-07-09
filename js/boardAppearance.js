let BoardEvents=function(idBoard,cfg){
    let board,
        game = new Chess(),
        availableCaptures;
    let handler=this;
    let clickMethod;
    this.checkSquare=function(index){
        const orientation=board.orientation();
        const letter=orientation==='white'?String.fromCharCode(index%8+97):String.fromCharCode(7-index%8+97);
        const number=orientation==='white'?7-Math.floor(index/8)+1:Math.floor(index/8)+1;
        const square=letter+number.toString();
        return availableCaptures.find(x => x===square)!==undefined?1:game.get(square)===null||game.get(square).color===game.turn()?0:-1;
    };
    this.clearBoard=function(){
        board = ChessBoard(idBoard);
    };
    this.load=function(position,squareClickMethod){
      game.load(position);
      clickMethod=squareClickMethod;
      let allCaptures=game.moves({verbose:true}).filter(function(e){
          return e.flags==='c';
      });
      availableCaptures=[];
      allCaptures.forEach(function (el){
          if(availableCaptures.find(e=>e===el.to)===undefined)
              availableCaptures.push(el.to);
      });
      board.orientation(game.turn()==='w'?'white':'black');
      board.position(position);
      $('#'+idBoard + ' .square-55d63').each(function(index){
          let el=$(this);
          $(el).on("click",function(){
              squareClickMethod(el,index)
          });
      });
    };
    this.numberOfAvailableCaptures=function(){
        return availableCaptures.length;
    };
    this.redrawBoard=function(){
        board=ChessBoard(idBoard,cfg);
        if(clickMethod!==undefined){
            handler.load(game.fen(),clickMethod);
        }
    };
    board = ChessBoard(idBoard, cfg);
};
let GameMethods=function(idBoard){
    const cfg={
        position:'start'
    };
    let binding=new Binding();
    let handler=this;
    let clickedSquares;
    this.points;
    let numberOfAvailableCapture=0,numberOfGoodCapture=0;
    let boardEvents=new BoardEvents(idBoard,cfg);
    let fens;
    let fensLenght;
    this.blockBoard=function(){
        boardEvents.clearBoard();
    };
    let onClickSquare=function(squareEl,index){
        if(clickedSquares.find(x=>x===index)===undefined){
            clickedSquares.push(index);
            let result=boardEvents.checkSquare(index);
            let background='';
            if(result===1){
                background='green';
                numberOfGoodCapture++;
                handler.points++;
            }else if(result===-1){
                background='red';
                handler.points--;
            }
            squareEl.css('background', background);
            binding.updateResult(handler.points);
            if(numberOfGoodCapture===numberOfAvailableCapture)
                newPosition();
        }
    };
    let newPosition=function(){
        let nr=Math.floor((Math.random() * fensLenght));
        boardEvents.load(fens[nr],onClickSquare);
        clickedSquares=[];
        numberOfGoodCapture=0;
        numberOfAvailableCapture=boardEvents.numberOfAvailableCaptures();
    };
    this.endlessGenerate=function(level){
        fens=level==='easy'?easyFens:level==='medium'?mediumFens:hardFens;
        fensLenght=fens.length;
        numberOfAvailableCapture=0;
        numberOfGoodCapture=0;
        while(numberOfAvailableCapture===numberOfGoodCapture){
            newPosition();
        }
    }
    this.redrawBoard=function(){
        boardEvents.redrawBoard();
    };
};





