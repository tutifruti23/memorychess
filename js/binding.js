let Binding=function(){
    let handler=this;
    this.updateResult=function(points){
        $('#points').html(points);
    };
    this.updateClock=function(time){
        time=time/1000;
        $('#time').html(time);
    };
    this.unlockLevelAndType=function(){
        $('#level').removeAttr('disabled');
        $('#type').removeAttr('disabled');
    };
    this.blockLevelAndType=function(){
        $('#level').attr('disabled', 'disabled');
        $('#type').attr('disabled', 'disabled');
    };
    this.showRedElement=function(){
        $('#redElem').show();
    }
    this.hideRedElement=function(){
        $('#redElem').hide();
    }
    this.gameInProgress=function(){
        handler.hideRedElement();
        handler.blockLevelAndType();
    };
    this.gameNotInProgress=function(){
        handler.showRedElement();
        handler.unlockLevelAndType();
    };
};

