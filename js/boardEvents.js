$(function(){
    let gameMethods=new GameMethods('board');
    let game=new Game();
    let binding = new Binding();
    /*game.startGame(true,{
        play:function() {
            gameMethods.endlessGenerate();
        }
    });*/
    let onTime=function(time){
        binding.updateClock(time);
    };
    let onCloseToEnd=function(){
        console.log("koniec czasu");
    };
    let onEnd=function(){
        gameMethods.blockBoard();
        binding.gameNotInProgress();
    };
    let onStart=function(){
        binding.gameInProgress();
        binding.updateResult(0);
    };
    $("#newGame").on('click',function(){
        onEnd();
        game.newGame();
    });
    $("#redElem").on('click',function(){
        binding.gameInProgress();
        gameMethods.points=0;
        game.startGame(game.type==0,{
            time:game.type*1000,
            onTime:onTime,
            timeCloseEnd:10000,
            onCloseToEnd:onCloseToEnd,
            interval:1000,
            onStart:onStart,
            onEnd:onEnd,
            play:function() {
                gameMethods.endlessGenerate(game.level);
            }
        });
    });
    $('#level').on('change',function(){
        game.level=this.value;
    });
    $('#type').on('change',function(){
        game.type=this.value;
    });
    $('#stopGame').on('click',function(){
        game.endOfGame();
        binding.gameNotInProgress();
    });
    $('.levelOption').each(function(){
        let handler=$(this);

        $(this).on('click',function(){
            game.level=handler.attr('name');
            $('#level').text(handler.text());
        });
    });
    $('.typeOption').each(function(){
        let handler=$(this);

        $(this).on('click',function(){
            game.type=handler.attr('name');
            $('#type').text(handler.text());
        });
    });
    let resizeTimer;
    $(window).on('resize', function(){
        $('#board').hide();
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            gameMethods.redrawBoard();
            $('#board').show();
        }, 200);

    });
});