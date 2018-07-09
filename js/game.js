let Game=function(){
    let handler=this;
    let timer;
    this.type=0;
    this.level='easy';
    this.inProgress=false;
    this.startGame=function(noTime,params){
        if(!handler.inProgress){
            handler.inProgress=true;
            params.onStart();
            if(noTime)
                unlimitedGame(params);
            else
                timeGame(params);
        }
    };
    let unlimitedGame=function(params){
        params['play']();
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
        params['play']();
    };
    this.newGame=function(){
        handler.inProgress=false;
        if(timer!==undefined)
            timer.stop();
    };
    this.endOfGame=function(exec){
        handler.newGame();
        if(exec!==undefined)
            exec();
    };
};