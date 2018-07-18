let BoardEventsMatesInOne=function(idBoard){
    let board,
        game = new Chess();
    let handler=this;
    this.fensLength=0;
    let onDragStart = function(source, piece, position, orientation) {
        if (game.game_over() === true ||
            (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    let onDrop = function(source, target) {
        // see if the move is legal
        let move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return 'snapback';


    };
    this.newPosition=function(){
        let nr=Math.floor((Math.random() * handler.fensLength));
        let position=mates[nr];
        game.load(position);
        board.orientation(game.turn()==='w'?'white':'black');
        board.position(position);
    };

// update the board position after the piece snap
// for castling, en passant, pawn promotion
    var onSnapEnd = function() {
        if(game.in_checkmate())
            gameProperties.gameScore++;
        handler.newPosition();

    };
    let cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    this.clearBoard=function(){
        board = ChessBoard(idBoard);
    };
    this.redrawBoard=function(){
        board=ChessBoard(idBoard,cfg);
        board.position(game.fen());
    };
    board = ChessBoard(idBoard, cfg);
};
let GameMethodsMateInOne=function(idBoard){
    this.levels = [
        {name: 'easy', value: 'easy'},
        {name: 'medium', value: 'medium'},
        {name: 'hard', value: 'hard'}
    ];
    this.types = [
        {name: 'Bez limitu', value: 0},
        {name: '1 min', value: 60},
        {name: '2 mins', value: 120}
    ];
    let boardEvents=new BoardEventsMatesInOne(idBoard);
    let fensLength;
    this.onStart=function(){
        console.log('start');
    };
    this.onEnd=function(){

    };
    this.onCloseToEnd=function() {
        console.log('bliski koniec');
    };
    this.isTimeGame=function(level,type){
        return type===0;
    };
    this.getGameTime=function(level,type){
        return type*1000;
    };
    this.getInterval=function(){
        return 1000;
    };
    this.getOnCloseToEndTime=function(){
        return 10000;
    };
    this.onStart=function(){
        boardEvents.fensLength=mates.length;
        boardEvents.newPosition();
    };
    this.redrawBoard=function(){
        boardEvents.redrawBoard();
    };
};





