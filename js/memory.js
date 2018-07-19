let BoardEventsMemory=function(idBoard){
    const emptyBoard='8/8/8/8/8/8/8/8';
    let board,
        game = new Chess(),
        gameCompare=new Chess();
    let handler=this;
    let actPosition;
    let quarterNr;
    let dropMethod;
    let displayMethod;
    let nextPosition;
    let hidePosition;
    let quarterDisplay=function(){
        let startNumber=quarterNr>2?0:32;
        $('#'+idBoard + ' .square-55d63').each(function(index){
            let inRange = index>=startNumber && index<(startNumber+32);
            if(inRange||(!inRange && index%8 < (quarterNr%2===0?4:8) && index%8 >= (quarterNr%2===0?0:4))){
                $(this).css('background','gray');
                const letter=String.fromCharCode(index%8+97);
                const number=7-Math.floor(index/8)+1;
                game.remove(letter+number.toString());
            }
        });
    };
    let quarterOnDrop=function(source,target){
        let letter=target.charCodeAt(0)-97;
        let number=parseInt(target.charAt(1));
        if((quarterNr%2===0&&letter<4)||(quarterNr%2===1&&letter>=4))
            return 'snapback';
        if((quarterNr>2&&number>4)||(quarterNr<=2&&number<=4))
            return 'snapback';
    };
    let halfDisplay=function(){
        $('#'+idBoard + ' .square-55d63').each(function(index){
            let inRange = (quarterNr===1&&index<32)||(quarterNr===2&&index>=32)||(quarterNr===3&&index%8<4)||(quarterNr===4&&index%8>=4) ;
            if(inRange){
                const letter=String.fromCharCode(index%8+97);
                const number=7-Math.floor(index/8)+1;
                game.remove(letter+number.toString());
                $(this).css('background','gray');
            }
        });
    };
    let halfOnDrop=function(source,target){
        let letter=target.charCodeAt(0)-97;
        let number=parseInt(target.charAt(1));
        if((quarterNr===1&&number>4)||(quarterNr===2&&number<=4)||(quarterNr===3&&letter<4)||(quarterNr===4&&letter>=4))
            return 'snapback';
    };
    this.setMethods=function(type){
        dropMethod=type==='quarter'?quarterOnDrop:type==='half'?halfOnDrop:function () {};
        displayMethod=type==='quarter'?quarterDisplay:type==='half'?halfDisplay:function () {};
    };
    let btn = $("<div class=' btn btn-primary spare-btn'></div>").text("Sprawdz");
    $('#main-panel').append(btn);
    btn.hide();
    btn.on('click',function(){
        btn.hide();
        let fen=board.fen();
        board.destroy();
        board=ChessBoard(idBoard,{
            position:actPosition
        });
        displayMethod();
        checkPosition(fen);
        nextPosition=setTimeout(function(){
            handler.newPosition();
        },3000);
    });
    this.fensLength=0;
    this.newPosition=function(){
        let nr=Math.floor((Math.random() * handler.fensLength));
        actPosition=easyFens[nr];
        game.load(actPosition);
        board=ChessBoard(idBoard);
        quarterNr=Math.floor((Math.random() * 4))+1;
        displayMethod();
        board.position(game.fen());
        if(board.fen()===emptyBoard){
            handler.newPosition();
            return;
        }
        actPosition=board.fen();
        hidePosition=setTimeout(function(){
            board.destroy();
            board=ChessBoard(idBoard,{
                draggable: true,
                dropOffBoard: 'trash',
                sparePieces: true,
                onDrop:dropMethod
            });
            displayMethod();
            btn.show();
        },5000);
    };
    let checkPosition=function (position){
        position+=" w - - 0 1";
        gameCompare.load(position);
        let board=game.board();
        let boardCompare=gameCompare.board();
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(board[i][j]!==null){
                    let index=i*8+j;
                    let color=boardCompare[i][j]===null||boardCompare[i][j].type !==board[i][j].type||boardCompare[i][j].color!==board[i][j].color?'red':'green';
                    $('#'+idBoard + ' .square-55d63:eq('+index+")").css('background', color);
                }
            }
        }
    };
    this.clearBoard=function(){
        console.log('dzialczam');
        clearTimeout(hidePosition);
        clearTimeout(nextPosition);
        btn.hide();

        board=ChessBoard(idBoard);
    };
    this.redrawBoard=function(){
       // board=ChessBoard(idBoard,cfg);
        //board.position(game.fen());
    };
    board = ChessBoard(idBoard);
};
let GameMethodsMemory=function(idBoard){
    this.levels = [
        {name: 'normal', value: 'normal'},
    ];
    this.types = [
        {name: '1/4', value:'quarter'},
        {name: '1/2', value: 'half'},
        {name: '1', value: 'whole'},
    ];
    let boardEvents=new BoardEventsMemory(idBoard);
    let fensLength;
    this.onEnd=function(){
        console.log('dzialam');
        boardEvents.clearBoard();
    };
    this.onCloseToEnd=function() {
    };
    this.isTimeGame=function(){
        return false;
    };
    this.getGameTime=function(){
        return 0;
    };
    this.getInterval=function(){
        return 1000;
    };
    this.getOnCloseToEndTime=function(){
        return 10000;
    };
    this.onStart=function(level,type){
        boardEvents.fensLength=easyFens.length;
        boardEvents.setMethods(type);
        boardEvents.newPosition();
    };
    this.redrawBoard=function(){
        boardEvents.redrawBoard();
    };
};





