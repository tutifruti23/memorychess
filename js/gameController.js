function GameController(_gameMethods) {
    let gameMethods = _gameMethods;
    let game = new Game();
    levelAndType.levels =gameMethods.levels;
    levelAndType.types = gameMethods.types;
    let onTime = function (time) {
        gameProperties.gameTime = time;
        if(gameMethods.onTime!==undefined)
            gameMethods.onTime(time);
    };
    let onCloseToEnd = function (level,type) {
        if(gameMethods.onCloseToEnd!==undefined)
            gameMethods.onCloseToEnd(level,type);
    };
    let onEnd = function (level,type) {
        if(gameMethods.onEnd!==undefined)
            gameMethods.onEnd(level,type);
    };
    let onStart = function (level,type) {
        gameProperties.gameScore = 0;
        gameMethods.onStart(level,type);
    };
    $("#newGame").on('click', function () {
        onEnd();
        game.newGame();
    });
    $("#redElem").on('click', function () {
        if (gameProperties.gameType !== -1 && gameProperties.gameLevel !== -1) {
            let level = gameMethods.levels[gameProperties.gameLevel].value;
            let type = gameMethods.types[gameProperties.gameType].value;
            gameProperties.gameStatus = 1;
            game.startGame(gameMethods.isTimeGame(level,type), {
                time:gameMethods.getGameTime(level,type),
                onTime: onTime,
                timeCloseEnd:gameMethods.getOnCloseToEndTime(level,type),
                onCloseToEnd:function(){ onCloseToEnd(level,type)},
                interval:gameMethods.getInterval(level,type),
                onStart:function(){ onStart(level,type)},
                onEnd: function(){ onEnd(level,type)},
            });
        }
    });
    $('#stopGame').on('click', function () {
        game.endOfGame();
    });
    let resizeTimer;
    $(window).on('resize', function () {
        $('#board').hide();
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            gameMethods.redrawBoard();
            $('#board').show();
        }, 200);

    });
}