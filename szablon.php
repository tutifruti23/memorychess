<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Title</title>
    <script src="js/jquery.js"></script>
    <script src="js/chess.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700" rel="stylesheet">
    <link rel="stylesheet" href="css/chessboard.css" />
    <link rel="stylesheet" href="css/szablon.css" />
    <link rel="stylesheet" href="css/spareChess.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="js/chessboard.js"></script>
    <script src="js/easy.js"></script>
    <script src="js/medium.js"></script>
    <script src="js/hard.js"></script>
    <script src="js/mates.js"></script>
    <script src="js/timer.js"></script>
    <script src="js/game.js"></script>
    <script src="js/matesInOne.js"></script>
    <script src="js/memory.js"></script>
    <script>
        <?php
            if(isset($_GET['game'])){
                $game=$_GET['game'];
                echo "var idGame='$game';";
            }else{
                echo "var idGame='paczek'";
            }
        ?>
    </script>

    <script src="js/boardEvents.js"></script>
    <script src="js/gameController.js"></script>
</head>
<body>
<div id="menu">
    <div class="d-flex  mx-auto justify-content-center menuWidth vertical-align h-100">
        <div class="menuPanelWidth">
            <img src="img/viewElements/logo.png"/>
        </div>
        <div class="menuPanelWidth" id="buttonsMenu">
            <div class="d-flex flex-wrap justify-content-end">
                <div class="dropdown p-2 ">
                    <button class="btn btn-secondary dropdown-toggle levelAndTypeSelect menuButtons vertical-align h-100" v-text="typeLabel" v-bind:class="{disabled:blockButtons}"  type="button" id="type" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="type">
                        <div v-for="(type,index) in types">
                            <li class="divider mx-auto" v-if="index>0"></li>
                            <li class="dropdown-item typeOption"   v-on:click="changeType(index)" >{{type.name}}</li>
                        </div>
                    </ul>
                </div>
                <div class="dropdown p-2">
                    <button class="btn btn-secondary dropdown-toggle levelAndTypeSelect menuButtons vertical-align h-100"  v-text="levelLabel" v-bind:class="{disabled:blockButtons}"  type="button" id="level" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="level">
                        <div v-for="(level,index) in levels">
                            <li class="divider mx-auto" v-if="index>0"></li>
                            <li class="dropdown-item levelOption"   v-on:click="changeLevel(index)" >{{level.name}}</li>
                        </div>


                    </ul>
                </div>
                <div class="p-2 d-none d-sm-none d-md-block">
                    <button class="menuButtons btn " id="soundToggle">
                        <img class='vertical-align' src="img/viewElements/speaker.png"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div><div class="w-100"></div>
<div class="grayBack"></div>
    <div class="container-fluid  .center-block" id='whole'>
        <div class="row">
            <div class="d-flex  mx-auto justify-content-center flex-row-reverse flex-md-row flex-wrap-reverse flex-sm-nowrap">
                <div class="p-2" >
                    <div class="custom-div row" id="left-panel">
                        <div class="col-12 d-none d-sm-block">
                             <div id='infoGameLabelContainer' class="elemPanel">
                                 <div class="d-flex w-100">
                                     <div class="leftText w-100">
                                         TWOJA GRA:
                                     </div>

                                 </div>

                             </div>
                        </div>
                        <div class="col d-none d-sm-block">
                                <div class="elemPanel" id="levelContainer"></div>
                        </div>
                        <div class="col-5 col-sm-12 margin-xs ">
                            <div id="timerContainer" class="elemPanel ">
                                <div class="d-flex flex-column h-100">
                                    <div  id="time" class="topText align-self-top h-75 text-center " v-text="time">
                                        0
                                    </div>
                                    <div class="bottomText align-top text-center">
                                        CZAS
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-5 col-sm-12 margin-xs">
                            <div id="scoreContainer" class="elemPanel  ">
                                <div class="d-flex flex-column h-100 ">
                                    <div id='points' class="topText align-self-top h-75 text-center" v-text="gameScore">
                                        0
                                    </div>
                                    <div class="bottomText text-center">
                                        WYNIK
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col d-none d-sm-block">
                             <div id="resultsContainer" class="elemPanel clickable">
                                 <div class="d-flex h-100 justify-content-between">
                                     <div class="leftText">
                                             TABELA WYNIKÓW
                                     </div>
                                     <div class="rightElement">
                                         <img class="img-responsive" src="img/viewElements/table.png"/>
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 col-sm-12 margin-xs ">
                            <div class="elemPanel  clickable" id="stopGameContainer">

                                <div class="d-flex h-100 justify-content-center justify-content-sm-between " id="stopGame">
                                    <div class="leftText d-none d-sm-block">
                                        <span>ZAKOŃCZ GRĘ</span>
                                    </div>
                                    <div class="rightElement">
                                        <img class="img-responsive " src="img/viewElements/krzyzyk.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-2" >
                    <div class="custom-div" id="main-panel">
                            <div id="wholeBoard" class="mainElement">
                                <img  src="img/viewElements/chessboard.png"/>
                            </div>
                            <div id="boardContainer">
                                <div id="board"></div>
                            </div>
                            <div id="redElem" v-show="show('red')" class="mainElement coverPanel">
                                <div id="startGameInfo" class="row vertical-align h-100" >
                                        <div class="w-100  row">
                                            <div class="col-3"></div>
                                            <div class="col-4">
                                                <div class="startGameInfoElem imgPanelGame">
                                                    <img src="img/viewElements/play.png"/>
                                                </div>
                                            </div>
                                            <div class="col-4"></div>
                                            <div class="col-4"></div>
                                            <div class="col-7">
                                                <div class="startGameInfoElem textStartGame bigTextPanelGame">Rozpocznij grę</div>
                                            </div>
                                            <div class="col-4"></div>
                                            <div class="col-7">
                                                <div class="startGameInfoElem textStartGame smallTextPanelGame">
                                                    Wybierz rodzaj gry i poziom,
                                                    <div class="w-100"></div>
                                                    a następnie rozpocznij grę!
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div id="blueElem" v-show="show('blue')" class="mainElement coverPanel">
                                <div id="endGameInfo" class="row vertical-align h-100" >
                                    <div class="w-100  row">
                                        <div class="col-3"></div>
                                        <div class="col-4">
                                            <div class="startGameInfoElem imgPanelGame">
                                                <img src="img/viewElements/play.png"/>
                                            </div>
                                        </div>
                                        <div class="col-4"></div>
                                        <div class="col-4"></div>
                                        <div class="col-7">
                                            <div class="startGameInfoElem textStartGame bigTextPanelGame">Gra zakonczona</div>
                                        </div>
                                        <div class="col-4"></div>
                                        <div class="col-7">
                                            <div class="startGameInfoElem textStartGame smallTextPanelGame">
                                                Wpisz poniżej swoją nazwę
                                                <div class="w-100"></div>
                                                użytkownika, żeby zapisać wynik.
                                            </div>
                                        </div>
                                        <div class="col-4"></div>
                                        <div class="col-6">
                                            <input v-model="name" type="text" class="form-control"  >
                                        </div>
                                        <div class="col-4"></div>
                                        <div class="col-2 smallTextPanelGame">
                                            <a href="#" class="coverPanelLink" v-on:click="saveScore(true)" >Zapisz</a>
                                        </div>
                                        <div class="col-2"></div>
                                        <div class="col-3 smallTextPanelGame">
                                            <a href="#" class="coverPanelLink" v-on:click="saveScore(false)">Nie zapisuj</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="p-2 d-none d-sm-none d-md-block" >
                    <div class="custom-div" id="right-panel">
                        <div class="col hidden-sm-down">
                            <div class="elemPanel  clickable" id="top10ResultsLabelContainer">
                                <div class="d-flex justify-content-between">
                                    <div class="leftText">
                                        TOP10
                                    </div>
                                    <div class="rightElement">
                                        Dzisiaj
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="elemPanel" id="top10Results1-3Container" >
                                    <div class="d-flex  best-scores" v-for="(item,index) in scores1_3">
                                        <div class="px-1 number number1_3">{{index+1}}</div>
                                        <div class="px-1 mr-auto nick ">{{item.name}}</div>
                                        <div class="px-1 points">{{item.points}}</div>
                                    </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="elemPanel" id="top10Results4-10Container">
                                <div class="d-flex best-scores" v-for="(item,index) in scores4_10">

                                    <div class="px-1 number">{{index+4}}</div>
                                    <div class="px-1 mr-auto  nick">{{item.name}}</div>
                                    <div class="px-1 points">{{item.points}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="js/szablon.js"></script>
<script src="js/boardAppearance.js"></script>

</body>
</html>