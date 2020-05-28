var namePlayer;
var infoPlayerFB;
var urlImgPlayerFB;
var infoTeamConnected; 
$(GameController).on(GameController.Events.LOGIN, function(e){
    
    infoPlayerFB =  e.playerInfo;
    namePlayer = e.playerInfo.name;
    urlImgPlayerFB = e.playerInfo.picture.data.url;
    console.log(urlImgPlayerFB);
    
});
//console.log(infoPlayerFB);
function PlayWithFriend(options) {
  var scope = this;
  Konva.Layer.call(scope);
  options = typeof options != "undefined" ? options : {};

  var Player01 = GameController.getInfoPlayerFB(infoPlayerFB.id);
  var Player02 = {
    "Fb_id" : "player02",
    "name" : "Van Su Phan",
    "score" : 0,
    "image" :"images/game/avatar.jpg",
    "winAmount" : 0,
  }

  var infoPlayers = [];
  infoPlayers.push( Player01, Player02 );
  var _scorePlayer1 = infoPlayers[0].score;
  var _scorePlayer2 = infoPlayers[1].score;


  //---------- socket init --------------

  var socket = io.connect(urlAPI);
  
  socket.on("send-all-id-client", (arrUser) => {
    
    arrUserLocal = [...arrUser];
   
    socket.emit("send-info-fb-client", 
    {
      id_socket : socket.id,
      infoPlayerFB : infoPlayerFB
    });

  });

 
  socket.on("SEND-DISCONNECT-TO-CLIENT",function  (infoFBClient) {
    
    //console.log("CLOSE TAB");  
    if(infoFBClient.id_socket === socket.id){
      // console.log("CLOSE TAB");
      // window.opener = self;
      // window.close();
     
    }
  })


  $(GameController).on(GameController.Events.LOGIN, function(){
    socket = io.connect(urlAPI);

  });

  $(GameController).on(GameController.Events.BACK_TO_MENU, function(){
    if(scope.children[8]){
      if(scope.children[8].getAttr('routeLayer')==2){
        socket.emit("BACK-MENU", infoPlayerSocket);
        console.log(" ROUTE 2222222");
        timeLine.stop();
        board.clearBoard();
        countPoint(board);
        //socket.disconnect();
      }else{
        return;
      }
    }
    
    //console.log("BACK MENU");
    
  });
  socket.on("BACK-MENU-TO-CLIENT", function (infoPlayerSocket) {
    
    
    if(scope.children[8]){
      timeLine.stop();
      board.clearBoard();
      countPoint(board);
      console.log("BACK MENU 2");
      scope.children[8].destroy();
      changeSceneById(0);
      changeSceneById(2);
      addPopupFriendOut();
      
    }  
    
  });
 
   

  $(GameController).on(GameController.Events.LOGOUT, function(){
    socket.disconnect();
    
  });

  $(GameController).on(GameController.Events.REPLAY, function(){
    if(scope.children[8]){
      if(scope.children[8].getAttr('routeLayer')==2){
        board.clearBoard();
        countPoint(board);
       // console.log(scope);
        scope.children[8].destroy();
        addPopupWaitting();
        socket.emit("REPLAY", infoPlayerSocket);
      }else{
        return;
      }
    }
  });

  socket.on("REPLAY-TO-CLIENT", function (infoPlayerSocket) {
   
    console.log("REPLAY ALL");
    board.clearBoard();
    if(scope.children[8]){
      scope.children[8].destroy();
    }
    // changeSceneById(0);
    // changeSceneById(2);
    addReplayPopup();
    socket.emit("REPLAY-AGAIN-TO-SERVER",infoPlayerSocket);
  });
  socket.on("REPLAY-AGAIN-TO-CLIENT", function  (infoPlayerSocket) {
    // body
    board.clearBoard();
    countPoint(board);
    if(scope.children[8]){
      scope.children[8].destroy();
      
    }
    changeSceneById(0);
    changeSceneById(2);
  });
  // ------------ REPLAY-2  -------------
  $(GameController).on(GameController.Events.REPLAY_2, function(){
    console.log("REPLAY-TO-CLIENT-2");
    board.clearBoard();
    countPoint(board);
    if(scope.children[8]){
      scope.children[8].destroy();
    }
    timeLine.stop();
    changeSceneById(0);
    changeSceneById(2);
    socket.emit("REPLAY-2", infoPlayerSocket);
  });
  socket.on("REPLAY-TO-CLIENT-2", function (infoPlayerSocket) {
    board.clearBoard();
    countPoint(board);
    if(scope.children[8]){
      scope.children[8].destroy();
    }
    timeLine.stop();
    changeSceneById(0);
    changeSceneById(2);
  });

  // ----------- EVENT CANCEL --------------
  $(GameController).on(GameController.Events.CANCEL, function(){
    
    //board.clearBoard();
    socket.emit("CANCEL", infoPlayerSocket);
    
  });
  socket.on("CANCEL-TO-CLIENT", function (infoPlayerSocket) {
    console.log("CANCEL-TO-CLIENT");
    
    board.clearBoard();
    if(scope.children[8]){
      scope.children[8].destroy();
      changeSceneById(0);
      changeSceneById(2);
    }
    addPopupFriendOut();
  });

  var roomClient = {
    name : null,
    value : null,
    team : null,
    infoPlayer : {},
    image :  Player01.image,
    
  }
  var infoPlayerSocket = {
    id : null,
    Fb_id : null,
    name : null,
    team : null,  
    score: 0,
    image : Player01.image,
    winAmount: 0,
    room : null,
  }

  socket.on('SEND_ROOM', (room)=>{
    console.log(room,"SEND_ROOM");
    roomClient.name = room.name;
    roomClient.value = room.value;
    
    infoPlayerSocket.id = socket.id;
    infoPlayerSocket.name = namePlayer;
    infoPlayerSocket.Fb_id = infoPlayerFB.id;
    infoPlayerSocket.room = roomClient.name;
    //console.log(GameController.getInfoPlayerFB(infoPlayerFB.id).winAmount);
    infoPlayerSocket.winAmount = GameController.getInfoPlayerFB(infoPlayerFB.id).winAmount
    var arrSockets = room.value;

    var arrClient = [];
    
    //infoPlayerSocket.team = 0;
    if(arrSockets.length === 2){
      for (var key in arrSockets.sockets) {

        if (arrSockets.sockets.hasOwnProperty(key)) {
          arrClient.push(key);
          
        }
      }
      
      infoPlayerSocket.team = arrClient.indexOf(socket.id);

      roomClient.team = arrClient.indexOf(socket.id);
      socket.emit("TEAM-CONNECTED", infoPlayerSocket);
      initSocket();

    }else{
      offEvent(board);
      popupAwaitTeam.show();
    }

  });


  var logo = new Logo();
  scope.add(logo);

  var board = new Board({

    x: sw / 2 - 300 / 2,
    y: 188,

  });

  var infoPlayerCard = new InfoPlayerCard({
    scoreX: 30,
    scoreY: 9,
    score: _scorePlayer1,
    image: Player01.image,
  });

  var infoPlayerCard2 = new InfoPlayerCard({
    scoreX: 30,
    scoreY: 9,
    score: _scorePlayer2,
    image: Player02.image,
  });

  var infoPlayerGroup = new Konva.Group({
    x: sw / 2 - 100 / 2 - 100,
    y: 136,
  });

  var infoPlayerGroup2 = new Konva.Group({
    x: sw / 2 - 100 / 2 + 100,
    y: 136,
  });

  var btnQuitGameGroup = new Konva.Group({
    x: sw / 2 - (179 / 2),
    y: 498,
  })

  var timeLineGroup = new Konva.Group({
    x: sw / 2 - 54 / 2,
    y: 124,
  });

  var timeLine = new TimeLine({
    //clock: clock,
  });

  var btnQuitGame = new ButtonQuitGame({
    text: "QUIT GAME"
  });


  var popupAwaitTeam = new PopupTeam2({
    text: "Please waiting...",
    x: sw / 2 - 300 / 2,
    y: 188,
  });
  var popupTeamBlue = new PopupTeam2({
    text: "YOUR TEAM BLUE  ",
    x: sw / 2 - 300 / 2,
    y: 188,
  });
  var popupTeamWhite = new PopupTeam2({
    text:  "YOUR TEAM WHITE",
    x: sw / 2 - 300 / 2,
    y: 188,
    fill : COLOR_WHITE
  });

  timeLine.on(timeLine.Events.ON_COMPLETE, onTimeOut);
  timeLine.on(timeLine.Events.ON_PLAY, getTime);

  timeLineGroup.add(timeLine);
  btnQuitGameGroup.add(btnQuitGame);
  infoPlayerGroup2.add(infoPlayerCard2);
  infoPlayerGroup.add(infoPlayerCard);

  var copyright = new Copyright();

  scope.add(
    infoPlayerGroup,
    infoPlayerGroup2,
    timeLineGroup,
    board,
    btnQuitGameGroup,
    copyright,
    popupAwaitTeam,
    // popupTeamBlue,
    // popupTeamWhite
  );

  infoPlayerGroup.draw();
  popupAwaitTeam.hide();
  // popupTeamBlue.hide();
  // popupTeamWhite.hide();

  btnQuitGameGroup.on("click mousedown touchstart", function () {
    console.log("BACK MENU");
    socket.emit("QUIT-GAME",infoPlayerSocket);
    socket.disconnect();
    //socket = io.connect(urlAPI);
    Master.init();
    //changeSceneById(0);

  });
  socket.on("QUIT-GAME-TO-CLIENT", function (infoPlayerSocket) {

    console.log("QUIT-GAME-TO-CLIENT 2222222222" );
    if(scope.getAttr("visible")=== false){
      return;

    }else{
    
      onTimeOut();
      scope.children[8].destroy();
      addPopupFriendOut(function () {
        
        scope.children[8].children[1].draw();
      });
      // console.log(scope.children[8].children[1].children[3]);
      // var avatar2 = new Avatar2({
      //   url:infoTeamConnected.image,
      // });
      // scope.children[8].children[1].add(avatar2);
      // console.log(infoTeamConnected.image)
      // scope.children[8].children[1].draw();
      // console.log( scope.children[8].children[1].children[6].children[0]);
      // scope.draw();
      // Master.stage.on("tick", function(){
      //   if (scope.children[8].children[1].children[3])
      //     console.log(scope.children[8].children[1].children[3].children[0]);
      // });
      // console.log(scope.children[8].children[1].children[3]);
      //console.log(scope.children[8].children[1].children[3].children[0]);
      //console.log(scope.children[8].children[1].children[3].children[0].attrs.image.src);
   
    }
    
    
    
  })
  
  
  function awake() {
    
    console.log(infoPlayerSocket.team);
    //addPopupTeam(infoPlayerSocket.team);

    if(infoPlayerSocket.team === 1){
      roomClient.infoPlayer = infoPlayerSocket;
      //console.log(roomClient);
      socket.emit("TEAM-2-JOIN", roomClient);
      //addPopupTeam(infoPlayerSocket.team);
    }
    //addPopupTeam(infoPlayerSocket.team);
    //console.log(scope.children);
  }
  scope.awake = awake

 




  var team;
  
  //var turn = 1;

  function turnPlayer0() {

    //team = 0;
    onClickBox(board, team);

  }


  function turnPlayer1() {

    //team = 1;
    onClickBox(board, team);

  }


  function initSocket() {
    socket.on("SEND-TEAM-2-JOIN-TO-CLIENT", (roomClient) =>{
      startAnimPopup(popupAwaitTeam);
      team = infoPlayerSocket.team;
      board.clearBoard();
      //addPopupTeam(infoPlayerSocket.team);
      onClickBox(board, team);
    });
    //nextTurn(turn);

  }


  function nextTurn(turn) {

    switch (turn) {
      case 0:
        turnPlayer1();
        return;
      case 1:
        turnPlayer0();
        return;
      default:
        turnPlayer0();
        return;

    }

  }


  function drawTeam0(aGoDot) {

    team = 0;
    onDraw(aGoDot);

  }

  function drawTeam1(aGoDot) {

    team = 1;
    onDraw(aGoDot);

  }

  function onDraw(aGoDot) {

    aGoDot.show();

    aGoDot.changeColor(GameController.getColorTeam(team));

    aGoDot.draw();

  }

  socket.on();
  
  function onClickBox(board, team) {
   
    var allBox = board.children[0].children;
    
      if (team === 0) {
        //offEvent(board);
        for (let i = 0; i < allBox.length; i++) {
  
          allBox[i].children[0].on("click mousedown touchstart", function () {
  
            var coord = getPositionBox(allBox[i]);
  
            var message = { 
              team : team,
              coord : coord,
              roomClient: roomClient
            }
  
            socket.emit("TEAM_0_CLICK" , message );
            var status = "on";
            colorBox = GameController.getColorTeam(team);
            allBox[i].children[0].setAttrs({
  
              status: status,
              colorBox: colorBox,
  
            });
  
            allBox[i].children[1].setAttrs({
              status: status,
              colorBox: colorBox,
  
            });
            if (status === "on") {
             
              drawTeam0(allBox[i].children[1]);
              allBox[i].children[1].children[0].setAttrs({
                status: status,
                colorBox: colorBox
              });
  
              allBox[i].children[2].show();
              //allBox[i].children[2].draw();
              GameController.animScale(allBox[i].children[1].children[0]);
              allBox[i].children[1].children[0].draw();
              allBox[i].children[0].draw();
              offEvent(board);
              //nextTurn(0);
  
            }
  
            GameController.gameProcessing(allBox[i], allBox[i].parent.children);
            timeLine.start();
            
            //countPoint(board);
            scope.batchDraw();
            allBox[i].draw();
  
          });
  
        }
  
        //nextTurn(0);
  
      }
  
      if (team === 1) {
       // offEvent(board);
        for (let i = 0; i < allBox.length; i++) {
  
          allBox[i].children[0].on("click mousedown touchstart", function () {
            
            var coord = getPositionBox(allBox[i]);
            
            var message = { 
              team : team,
              coord : coord,
              roomClient: roomClient
            }
  
            socket.emit("TEAM_01_CLICK" , message );

            var status = "on";
            colorBox = GameController.getColorTeam(team);
            //console.log(colorBox);
            allBox[i].children[0].setAttrs({
  
              status: status,
              colorBox: colorBox,
  
            });
  
            allBox[i].children[1].setAttrs({
              status: status,
              colorBox: colorBox,
  
            });
  
            if (status === "on") {
              //console.log("Draw Team 1");
              drawTeam1(allBox[i].children[1]);
              allBox[i].children[1].children[0].setAttrs({
                status: status,
                colorBox: colorBox
              });
  
              allBox[i].children[2].show();
              //allBox[i].children[2].draw();
              GameController.animScale(allBox[i].children[1].children[0]);
              allBox[i].children[1].children[0].draw();
              allBox[i].children[0].draw();
              offEvent(board);
            
            }
  
            GameController.gameProcessing(allBox[i], allBox[i].parent.children);
            timeLine.start();
            //countPoint(board);
            scope.batchDraw();
            allBox[i].draw();
  
          });
  
        }
        
  
      }
    
  }



  // on event team click
  socket.on("SEND-TO-PLAYER-1",(message)=>{
    var coord = message.coord;
    var allBox = board.children[0].children;
    var boxFind = getBoxPositionXY(allBox, coord[1], coord[0]);
    //GameController.animScale(boxFind[0].children[1].children[0]);
    changeBoxClick(boxFind,message.team);
    onClickBox(board,1);
    //countPoint(board);

  });

  socket.on("SEND-TO-PLAYER-0",(message)=>{
    var coord = message.coord;
    var allBox = board.children[0].children;
    var boxFind = getBoxPositionXY(allBox, coord[1], coord[0]);
    //GameController.animScale(boxFind[0].children[1].children[0]);
    changeBoxClick(boxFind, message.team);
    onClickBox(board, 0);
    //countPoint(board);

    
  });

  socket.on("SEND-TO-ALL-PLAYER", (message)=>{
    
    var coord = message.coord;
    var allBox = board.children[0].children;
    var boxFind = getBoxPositionXY(allBox, coord[1], coord[0]);
    GameController.animScale(boxFind[0].children[1].children[0]);
    //changeBoxClick(boxFind, message.team);
    timeLine.start();
    
    countPoint(board);
    scope.batchDraw();
    
  });


  socket.on("SERVER-SEND-TO-TEAM-CONNECTED", function (infoTeam) {
   
    infoTeamConnected = infoTeam;
    if(infoTeam.team === 0){

      infoPlayers[0] = infoTeam
      infoPlayerCard.children[3].getAttrs().image.src = infoTeam.image;
      
    }
    if(infoTeam.team === 1){
      
      infoPlayers[1] = infoTeam
      infoPlayerCard2.children[3].getAttrs().image.src = infoTeam.image;

    }
  });

  /// ------ Client Disconnect -----------
  socket.on("DISCONNECT-SEND-TO-CLIENT", function () {
    console.log("DISCONNECT-SEND-TO-CLIENT");
  });




  function offEvent(board) {
    console.log("OFF !!!!!");
    var allBox = board.children[0].children;
    for (let i = 0; i < allBox.length; i++) {

      allBox[i].children[0].off();

    }
    
  }

  function onTimeOut() {

    var indexPlayer = infoPlayers.findIndex(x => x.Fb_id === infoPlayerFB.id);
    var indexDif = Math.abs(indexPlayer - 1);

    if (infoPlayers[indexPlayer].score < infoPlayers[indexDif].score) {
      
      statusResult = 0;
      infoPlayers[indexPlayer].winAmount -=1;
      PostPointUser(urlAPI + 'setpoint', infoPlayers[indexPlayer]);
      timeLine.stop();
      //console.log(infoPlayers[indexPlayer].name, "LOSE !!!");
    }
    if (infoPlayers[indexPlayer].score > infoPlayers[indexDif].score) {

      statusResult = 1;
      infoPlayers[indexPlayer].winAmount +=1;
      PostPointUser(urlAPI + 'setpoint', infoPlayers[indexPlayer]);
      timeLine.stop();
      //console.log(infoPlayers[indexPlayer].name, "WIN !!!");

    }
    if (infoPlayers[indexPlayer].score == infoPlayers[indexDif].score) {

      statusResult = -1;
      timeLine.stop();

    }
   
    timeLine.stop();
    endGame();
    addPopup();
    console.log("SHOW POPUP HET GIO");

  }


  function getTime() {

    timeLine.getTime()
    //console.log("SHOW POPUP HET GIO");
  }

// ------------- POPUP -------------

  function addPopup() {
    if(statusResult == undefined){
      return;
    }else{
      popupholder = new Popup({
        statusResult: statusResult,
        routeLayer : 2,
        urlImage : infoPlayerSocket.image || urlImgPlayerFB
      });
      scope.add(popupholder);
    }
     
  }

  function addReplayPopup() {
    if(statusResult == undefined){
      return;
    }else{
      popupReplay = new PopupReplay({
        statusResult: statusResult,
        routeLayer : 2,
        urlImage : urlImgPlayerFB || infoPlayerSocket.image
      });
      scope.add(popupReplay);
      popupReplay.draw();
    }
    
  }
  
  function addPopupFriendOut(callback) {
      popupFriendOut = new PopupFriendOut({
        statusResult: statusResult || 1,
        routeLayer : 2,
        urlImage : infoTeamConnected.image, //urlImgPlayerFB || infoPlayerSocket.image
      }, callback);
      console.log("OUT FRIEND");
      scope.add(popupFriendOut);
      //console.log(popupFriendOut);
      popupFriendOut.draw();
    
  }

  function addPopupWaitting() {
    
      popupWait = new PopupWait({
        statusResult: statusResult,
        routeLayer : 2,
        urlImage : infoPlayerSocket.image || urlImgPlayerFB
      });
      //console.log("OUT FRIEND")
      scope.add(popupWait);
      popupWait.draw();
    
  }

  function addPopupTeam(team) {
    
    popupColorTeam = new PopupColorTeam({
      routeLayer : 2,
      urlImage : infoPlayerSocket.image || urlImgPlayerFB,
      team : team
    });
    popupColorTeam.setAttrs({
      team : team
    });
    
    scope.add(popupColorTeam);
    popupColorTeam.draw();
}

  // -------- Count ---------

  function countPoint(scope) {


    arrBox = scope.children[0].children;

    var scorePlayer1 = 0;
    var scorePlayer2 = 0;


    var boxOn = arrBox.filter(item => {
      return item.children[1].children[0].attrs["status"] === "on"
    }).length;

    for (var i = 0; i < arrBox.length; i++) {

      if (arrBox[i].children[1].children[0].attrs["fill"] === "#165470" &&
        arrBox[i].children[1].children[0].attrs["status"] === "on") {

        scorePlayer1 += 1;
      }

      if (arrBox[i].children[1].children[0].attrs["fill"] === "#ffffff" &&
        arrBox[i].children[1].children[0].attrs["status"] === "on") {
          
        scorePlayer2 += 1;
      }


    }

    _scorePlayer1 = scorePlayer1;
    _scorePlayer2 = scorePlayer2;
    infoPlayers[0].score = _scorePlayer1;
    infoPlayers[1].score = _scorePlayer2;



    infoPlayerCard2.children[1].children[1].setAttrs({
      text: _scorePlayer2.toString() || 0
    });

    infoPlayerCard.children[1].children[1].setAttrs({
      text: _scorePlayer1.toString() || 0
    });

    infoPlayerCard.children[2].draw();
    infoPlayerCard2.children[2].draw();
    
  
    if (boxOn === arrBox.length) {

      var indexPlayer = infoPlayers.findIndex(x => x.Fb_id === infoPlayerFB.id);
      var indexDif = Math.abs(indexPlayer - 1);
     
      if (infoPlayers[indexPlayer].score > infoPlayers[indexDif].score) {
       
        statusResult = 1;
        infoPlayers[indexPlayer].winAmount +=1;
        PostPointUser(urlAPI + 'setpoint', infoPlayers[indexPlayer]);
        GameController.setScorePlayer(infoPlayers[0]["name"], 0);

      } else {

        statusResult = 0;
        infoPlayers[indexPlayer].winAmount -=1;
        PostPointUser(urlAPI + 'setpoint', infoPlayers[indexPlayer]);
        GameController.setScorePlayer(infoPlayers[1]["name"], 0);

      }

      timeLine.stop();
      endGame();
      addPopup();

    }

  }

  function endGame() {
    board.lock();
  }


  function startGame() {
    
    board.unLock();
  }


  function startAnimPopup(node) {
    var tweenAnim = new Konva.Tween({

      duration: 1.5,
      node: node,
      opacity: 0,
      onFinish: function () {
        popupAwaitTeam.hide();
      }

    });
    tweenAnim.play();
  }

  function getPositionBox(box) {

    return box.coord;

  }


  function changeBoxClick(arrBoxs, team ,index=0) {
    color = GameController.getColorTeam(team);
    if(team === 0){
     
      drawTeam0(arrBoxs[index].children[1]);
      arrBoxs[index].setAttrs({
        status: "on",
        colorBox: color,
      });
      
      arrBoxs[index].children[0].setAttrs({
        status: "on",
        colorBox: color,
  
      });
  
      arrBoxs[index].children[1].setAttrs({
        status: "on",
        colorBox: color,
  
      });

      arrBoxs[index].children[1].children[0].setAttrs({
        status: "on",
        colorBox: color,
  
      });
  
      arrBoxs[index].children[1].show();
      arrBoxs[index].children[2].show();
      arrBoxs[index].children[1].draw();
      arrBoxs[index].children[2].draw();
      arrBoxs[index].children[1].children[0].draw();
      GameController.gameProcessing(arrBoxs[index], board.children[0].children);

    }else{
    
      drawTeam1(arrBoxs[index].children[1]);
      arrBoxs[index].setAttrs({
        status: "on",
        colorBox: color,

      });
      
  
      arrBoxs[index].children[0].setAttrs({
        status: "on",
        colorBox: color,
  
      });
  
      arrBoxs[index].children[1].setAttrs({
        status: "on",
        colorBox: color,
  
      });

      arrBoxs[index].children[1].children[0].setAttrs({
        status: "on",
        colorBox: color,
  
      });
  
      arrBoxs[index].children[1].show();
      arrBoxs[index].children[2].show();
      arrBoxs[index].children[1].draw();
      arrBoxs[index].children[2].draw();
      arrBoxs[index].children[1].children[0].draw();
      GameController.gameProcessing(arrBoxs[index], board.children[0].children);
      
    }


  }

  function getBoxPositionXY(arrBox, x, y) {

    return arrBox.filter(function (box) {

      return box.coord[0] == y && box.coord[1] == x;

    });
  }


  function PostPointUser(URL = urlAPI + 'setpoint', data) {
    
    $.ajax({
      url: URL,
      type: 'POST',
      dataType: "json",
      data: data,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function (d) {
        console.log("Post completed !");
      },
      error: function (error) {
        console.log(error, " ERROR ");
      },

    });

  }

};
PlayWithFriend.prototype = Object.assign(Object.create(Konva.Layer.prototype), {})