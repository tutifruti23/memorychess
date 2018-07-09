function Timer(cfg){
    let run;
    const handler=this;
    let time=cfg===undefined||cfg['time']===undefined?0:cfg['time'];
    let timeCloseEnd=cfg===undefined||cfg['timeCloseEnd']===undefined?10000:cfg['timeCloseEnd'];
    let interval=cfg===undefined||cfg['interval']===undefined?1000:cfg['interval'];
    let onTime=cfg===undefined||cfg['onTime']===undefined?function(){}:cfg['onTime'];
    let onCloseToEnd=cfg===undefined||cfg['onCloseToEnd']===undefined?function(){}:cfg['onCloseToEnd'];
    let onEnd=cfg===undefined||cfg['onEnd']===undefined?function(){}:cfg['onEnd'];
    let onStart=cfg===undefined||cfg['onStart']===undefined?function(){}:cfg['onStart'];
    let countdown=function(){
        run=setInterval(function(){
            if(time<=0){
                time=0;
                if(time===0)
                    onTime(time);
                handler.stop();
                onEnd();
            }else{
                onTime(time);
                time-=interval;
                if(time<=timeCloseEnd&&time+interval>timeCloseEnd)
                    onCloseToEnd(time);
            }
        },interval);
    };
    this.start=function(){
        onStart();
        this.stop();
        countdown();
    };
    this.stop=function(){
        clearInterval(run);
    };
    this.addTime=function(miliseconds){
        time+=miliseconds;
    };
}
