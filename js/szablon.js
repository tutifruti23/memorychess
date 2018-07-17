var scores=new Vue({
    el:'#right-panel',
    data:{
        scores:[],

    },
    methods:{},
    computed:{
        scores1_3:function(){
            let res=[];
            for(let i=0;i<3;i++){
                res.push(this.scores[i]==null?{name:'-',points:''}:this.scores[i]);

            }
            return res;
        },
        scores4_10:function(){
            let res=[];
            for(let i=3;i<10;i++){
                res.push(this.scores[i]==null?{name:'-',points:''}:this.scores[i]);
            }
            return res;
        }
    }
});
var gameProperties=new Vue({
    el:'#left-panel',
    data:{
        gameLevel:-1,
        gameType:-1,
        gameStatus:0,
        gameTime:0,
        gameScore:0
    },
    methods: {
        endOfGame:function(){
            if(this.gameScore>0 && this.gameStatus===1)
                this.gameStatus=2;
            else
                this.gameStatus=0;
        }
    }
    ,
    computed:{
        time:function(){
            let s=this.gameTime;
            function pad(n, z) {
                z = z || 2;
                return ('00' + n).slice(-z);
            }
            var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            return pad(mins) + ':' + pad(secs);
        }
    }
});
var coverPanels=new Vue({
    el:'#main-panel',
    data:{
        name:''
    },
    methods:{
        show(elem){
            let st=gameProperties.gameStatus;
           if(st===0){
             return elem==='red';

           }else if(st===1){
                return false;
           }
           else{
                return elem==='blue';
           }
        },
        saveScore:function(saveScore){
            if(saveScore){
                if(this.name!==''){
                    newScore(this.name,gameProperties.gameScore,gameProperties.gameType,gameProperties.gameLevel);
                    gameProperties.gameStatus=0;
                }

            }else{
                gameProperties.gameStatus=0;
            }
        },
    },
    computed:{}
});
var levelAndType=new Vue({
    el:'#buttonsMenu',
    data:{
        levels:[],
        types:[],
    },
    methods:{
        changeLevel:function(index){
            console.log('zmieniam');
            gameProperties.gameLevel=index;
            if(gameProperties.gameLevel!==-1 && gameProperties.gameType!==-1){
                console.log('laduje');
                getScores(gameProperties.gameLevel,gameProperties.gameType);
            }
        },
        changeType:function(index){
            console.log('zmieniam');
            gameProperties.gameType=index;
            if(gameProperties.gameLevel!==-1 && gameProperties.gameType!==-1){
                console.log('ladujeT');
                getScores(gameProperties.gameLevel,gameProperties.gameType);
            }
        }
    },
    computed:{
        typeLabel:function(){
          return gameProperties.gameType===-1?"Rodzaj gry":this.types[gameProperties.gameType].name;
        },
        levelLabel:function(){
            return gameProperties.gameLevel===-1?"Poziom":this.levels[gameProperties.gameLevel].name;
        },
        blockButtons:function(){
            return gameProperties.gameStatus!==0;
        }
    }
});
function getScores(level,type) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tab=JSON.parse(this.responseText);
            scores.scores=tab;
        }
    };
    xhttp.open("GET", "getScores.php?level="+level+"&type="+type, true);
    xhttp.send();
}
function newScore(name,score,type,level){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getScores(gameProperties.gameLevel,gameProperties.gameType);
        }
    };
    xhttp.open("GET", "newScore.php?level="+level+"&type="+type+"&score="+score+"&name="+name, true);
    xhttp.send();
}