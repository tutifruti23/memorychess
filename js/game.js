let Game=function(){
    let handler=this;
    let timer;
    this.inProgress=false;
    this.startGame=function(noTime,params){
        if(!handler.inProgress){
            handler.inProgress=true;
            params.onStart();
            if(!noTime)
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
            onEnd:function(){handler.endOfGame(params['onEnd'])}
        };
        timer=new Timer(cfg);
        timer.start();
    };
    this.newGame=function(){
        handler.inProgress=false;
        if(timer!==undefined)
            timer.stop();
    };
    this.endOfGame=function(exec){
        handler.newGame();
        gameProperties.endOfGame();
        if(exec!==undefined)
            exec();
    };
};