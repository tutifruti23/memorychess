let Game=function(){
    let handler=this;
    let timer;
    let parameters;
    this.inProgress=false;
    this.startGame=function(isTimeGame,params){
        parameters=params;
        if(!handler.inProgress){
            handler.inProgress=true;
            params.onStart();
            if(isTimeGame)
                timeGame(params);
        }
    };
    let timeGame=function(params){
        let cfg={
            time:params['time'],
            onTime:params['onTime'],
            timeCloseEnd:params['timeCloseEnd'],
            onCloseToEnd:params['onCloseToEnd'],
            interval:params['interval'],
            onEnd:handler.endOfGame
        };
        timer=new Timer(cfg);
        timer.start();
    };
    this.newGame=function(){
        handler.inProgress=false;
        if(timer!==undefined)
            timer.stop();
    };
    this.endOfGame=function(){
        handler.newGame();
        gameProperties.endOfGame();
        if(parameters['onEnd']!==undefined)
            parameters['onEnd']();
    };
};