let BoardEvents=function(idBoard,cfg){
    let board,
        game = new Chess(),
        availableCaptures;
    this.checkSquare=function(index){
        const orientation=board.orientation();
        const letter=orientation==='white'?String.fromCharCode(index%8+97):String.fromCharCode(7-index%8+97);
        const number=orientation==='white'?7-Math.floor(index/8)+1:Math.floor(index/8)+1;
        const square=letter+number.toString();
        return availableCaptures.find(x => x===square)!==undefined?1:game.get(square)===null||game.get(square).color===game.turn()?0:-1;
    };
    this.load=function(position,squareClickMethod){
      game.load(position);
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
    board = ChessBoard(idBoard, cfg);
};
let Game=function(idBoard){
    const cfg={
        position:'start'
    };
    let clickedSquares;
    let numberOfAvailableCapture=0,numberOfGoodCapture=0;
    let boardEvents=new BoardEvents(idBoard,cfg);
    let onClickSquare=function(squareEl,index){
        if(clickedSquares.find(x=>x===index)===undefined){
            clickedSquares.push(index);
            let result=boardEvents.checkSquare(index);
            let background='';
            if(result===1){
                background='green';
                numberOfGoodCapture++;
            }else if(result===-1){
                background='red';
            }
            squareEl.css('background', background);
            if(numberOfGoodCapture===numberOfAvailableCapture)
                newPosition();
        }
    };
    let newPosition=function(){
        let nr=Math.floor((Math.random() * positions.length));
        boardEvents.load(positions[nr],onClickSquare);
        clickedSquares=[];
        numberOfGoodCapture=0;
        numberOfAvailableCapture=boardEvents.numberOfAvailableCaptures();
    };
    this.startGame=function(){
            if(numberOfGoodCapture===numberOfAvailableCapture){
                   newPosition();
                   numberOfAvailableCapture=boardEvents.numberOfAvailableCaptures();
            }
    };
};
$(function(){
    let game=new Game('board');
    game.startGame();
});



const positions=[
    "6k1/1p2qppp/p3p3/3p4/3P1P2/PrrQ4/1P3RPP/1R4K1 w - - 0 30",
    "8/5r2/2p3k1/2P2qp1/3Q4/6n1/5P2/4NRK1 w - - 0 53",
    "3r1nk1/1p1Nppb1/p1p3pp/4P3/5P2/3RB3/1PP3PP/6K1 w - - 3 22",
    "5rk1/p1p1Rrp1/2p3Q1/3p3p/2b5/1B5P/PP3qP1/4R2K w - - 0 26",
    "5rk1/p4ppp/8/1N1B4/2P5/P2nnR2/1r4PP/R5K1 b - - 1 28",
    "2bN4/p6k/4N1pp/3pp3/R4p2/7P/P1r3PB/6K1 w - - 2 35",
    "rn1q2k1/ppp2ppp/8/4r2b/2p5/3B4/PP2NPPP/R2Q1RK1 w - - 0 14",
    "r2q2k1/ppp2ppp/3bR3/8/8/8/PPP2PPP/R1BQ2K1 b - - 0 15",
    "r3r1k1/1pNb1pbp/p1pp2p1/8/2P1Pq2/5P2/PP2BBPP/2R2RK1 w - - 0 21"
];




