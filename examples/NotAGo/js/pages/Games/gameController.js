(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global.GameController = {}));
  }(this, function (exports) {
    'use strict';
  
  
    // var Events = {
    //     ON_LOAD_PROGRESS: "onLoadProgress",
    //     ON_LOAD_COMPLETE: "onLoadComplete",
    //     ON_LOAD_ERROR: "onLoadError",
    //     TICK: "tick",
  
    // }
    
    var Events = {
      LOGIN: 'LOGIN',
      LOGOUT: 'LOGOUT',
      BACK_TO_MENU: 'BACK_TO_MENU',
      REPLAY: 'REPLAY',
      REPLAY_2: 'REPLAY_2',
      CANCEL: 'CANCEL',
      OKAY: "OKAY",
      QUIT: "QUIT"
    };
  
   
    var data = [];
    var dataLoginFB;
    GetUserData(urlAPI  + 'user');
  
    var playerInfo;
    var _isLoadData = false;
  
    // Login fb 
    window.fbAsyncInit = function () {
      FB.init({
        appId: 672640736833599,
        // appId: 1093525944365848,
        // cookie: true,
        xfbml: true,
        version: 'v7.0'
      });
  
      FB.AppEvents.logPageView();
      // $(".fb-login-button").attr('onlogin', checkLoginState);
      // console.log("init FB")
    };
    (function (d, s, id) {
      
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  
    function basicAPIRequest() {
      FB.api('/me',
        { fields: "id,picture,email,first_name,middle_name,name" },
        function (response) {
          //$("#fb-profile-picture").append('<img src="' + response.picture.data.url + '"> ');
          dataLoginFB = response;
          
          if(data.filter((value)=>{
            return value.Fb_id === response.id;
          }).length === 0){
  
            PostUser(urlAPI + 'user');
            var evt = $.Event(Events.LOGIN);
            evt.playerInfo = dataLoginFB;
            
            //playerInfo = response;
            $(GameController).trigger(evt);
            
  
          }else{
            var evt = $.Event(Events.LOGIN);
            //console.log("Da login 2222222");
            evt.playerInfo = response;
            $(GameController).trigger(evt);
            playerInfo = response;
          }
          
  
        }
      );
     
    }
  
    function getPlayer () {
      return playerInfo
    }
    
    function init() {
      // PRELOADER.show();
      $("#facebook").on('click mousedown touchstart', function (e) {
        // login();
      });
  
      $("#load").on('click mousedown touchstart', function (e) {
        loadData();
      });
  
      // $(".fb-login-button").attr('onlogin', checkLoginState);
  
      // $("#logout").on('click mousedown touchstart', function (e) {
      //     logout();
      // });
      // if ()
      checkLoginState();
      var holderLoader = document.querySelector('.hoder-loader');
      holderLoader.setAttribute("style","display : none");
    }
  
  
    
    //loadDataFB();
  
    function checkLoginState() {
      //console.log("checkLoginState");
      FB.getLoginStatus(function (response) {
        
        if (response.status != "connected") {
          console.log("LOG", response.status)
          login();
        }else{
          loadData();
        }
       
      });
    }
  
  
    function login() {
      console.log("login");
  
      FB.login(function (response) {
        // handle the response 
        console.log("connect");
        loadData();
      });
  
    }
  
    function loadData() {
      console.log("loadData");
      if (_isLoadData)
        return;
      else
      {
        _isLoadData = true;
        basicAPIRequest();
      }
      // basicAPIRequest()
    }
  
    function logout () {
      // body
      FB.logout(function(response) {
        // Person is now logged out
    
     });
    
    }
    
  
    /////////////////
  
    
    async function GetUserData(URL = urlAPI + 'user') {
      $.ajax({
        url: URL,
        type: 'GET',
        success: await function (d) {
  
          data = d;
          console.log(d);
  
        },
        error: function (error) {
          // body
          console.log(error);
        }
      });
      // body
    }
   
  
    function PostUser(URL = urlAPI + 'user') {
      console.log(dataLoginFB);
      $.ajax({
        url: URL,
        type: 'POST',
        dataType: "json",
        data: dataLoginFB,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (d) {
          console.log("Post completed !");
          console.log(d);
          data.push(d);
          // var Player01 = getInfoPlayer(dataLoginFB.name);
          var evt = $.Event(Events.LOGIN);
          evt.playerInfo = dataLoginFB;
          console.log(evt)
          $(GameController).trigger(evt);
          playerInfo = dataLoginFB;
        },
        error: function (error) {
          // body
          console.log(error, " ERROR ");
        },
  
      });
  
    }
  
  
  //
  
  function getDataFB() {
    return dataLoginFB;
  }
  
  
    function getInfoPlayer(name) {
  
      return data.find((value) => {
        return value['name'] === name;
      });
  
      // get Player 
    }
  
    function getInfoPlayerFB(Fb_id) {
  
      return data.find((value) => {
        return value['Fb_id'] === Fb_id;
      });
  
      // get Player 
    }
  
    function setScorePlayer(name, score) {
      return data.find((value) => {
        return value['name'] === name;
      })["score"] = score;
  
      // set Player 
    }
  
  
    function getAllPlayer() {
     // console.log(data)
      return data.filter((value) => {
        return value;
      });
  
      // get All Player 
    }
  
  
  
    var Teams = [
  
      {
        color: COLOR_BLUE,
      },
  
      {
        color: COLOR_WHITE,
      }
  
    ]
  
  
    function getColorTeam(team) {
      return Teams[team]['color'];
      // getColorTeam
    }
  
    // function setColorTeam(team, color) {
    //   return getColorTeam(team) = color;
    //   // setColorTeam
    // }
  
    function startGame() {
  
  
    }
  
  
  
    function gameProcessing(box, arrBox) {
      //console.log(box)
      var colorBox = getColor(box);
      var positionBox = getPositionBox(box);
  
      var row = getRowBox(arrBox, positionBox[1]);      //  X
      var colum = getColumBox(arrBox, positionBox[0]);  //  Y
  
      var diagonalLine1 = getDiagonalBox1(arrBox, positionBox);
      var diagonalLine2 = getDiagonalBox2(arrBox, positionBox);
  
  
      onChangeMain(diagonalLine1, colorBox);
      onChangeMain(diagonalLine2, colorBox);
  
      onChangeMain(row, colorBox);
      onChangeMain(colum, colorBox);
  
  
  
  
      function onChangeMain(arrBlock, colorBox) {
        var _indexOfBox = arrBlock.indexOf(box);
  
        //
  
        var _arrColor1 = [];
        var _arrBoxX1 = [];
  
  
        for (var i = _indexOfBox + 1; i < arrBlock.length; i++) {
  
          _arrColor1.push(getColor(arrBlock[i]));
  
          _arrBoxX1.push(arrBlock[i])
  
          var _colorBox = getColor(arrBlock[i]);
  
          if (colorBox === _colorBox) {
  
            break;
  
          }
  
        }
  
  
        for (var i = 0; i < _arrBoxX1.length; i++) {
          if (_arrColor1.indexOf("none") != -1) {
  
            break;
          }
  
          if (getColor(_arrBoxX1[i]) === colorBox) {
  
            _arrBoxX1.splice(i);
  
            //console.log(_arrBoxX1);
  
            onChangeColor(_arrBoxX1, colorBox);
  
            break;
  
            //console.log("Change 01");
  
          }
        }
  
  
        //
  
        var _arrColor2 = [];
        var _arrBoxX2 = [];
  
        for (var i = _indexOfBox - 1; i > -1; --i) {
  
          _arrColor2.push(getColor(arrBlock[i]));
          _arrBoxX2.push(arrBlock[i])
  
          var _colorBox = getColor(arrBlock[i]);
  
          if (colorBox === _colorBox) {
  
            break;
  
          }
  
        }
  
  
        for (var i = 0; i < _arrBoxX2.length; i++) {
  
          if (_arrColor2.indexOf("none") != -1) {
  
            break;
  
          }
  
          if (getColor(_arrBoxX2[i]) === colorBox) {
  
            _arrBoxX2.splice(i);
  
  
            onChangeColor(_arrBoxX2, colorBox);
  
            break;
  
           
          }
        }
  
  
  
      }
  
  
      function getColumBox(arrBox, index) {
        return arrBox.filter(function (box) {
          return box.coord[0] == index;
        });
      }
  
  
      function getRowBox(arrBox, index) {
  
        return arrBox.filter(function (box) {
  
          return box.coord[1] == index;
  
        });
      }
  
  
      function getDiagonalBox1(arrBox, position) {
  
        return arrBox.filter(function (box) {
  
          return (box.coord[0] + box.coord[1] === position[0] + position[1])
  
        });
  
      }
  
  
      function getDiagonalBox2(arrBox, position) {
  
        var newArrBox = [];
        var positionX = position[0]     // X
          , positionY = position[1];    // Y
  
        for (let i = 0; i < Math.sqrt(arrBox.length); i++) {
  
          for (let j = (positionX - positionY); j < Math.sqrt(arrBox.length); j++) {
  
            newArrBox.push(...arrBox.filter(function (b) {
  
              return (b.coord[0] == j && b.coord[1] == i);
  
            }));
  
            i++;
  
            if (j === Math.sqrt(arrBox.length)) {
  
              break;
            }
  
  
          }
  
          break;
  
        }
  
        return newArrBox;
  
      }
  
  
  
      function getColor(box) {
        if (box == null) {
  
          return null;
  
        } else
  
          return box.children[0].attrs.colorBox;
      }
  
  
      function getPositionBox(box) {
  
        return box.coord;
  
      }
  
  
      function getBoxPositionXY(arrBoxOn, x, y) {
  
        return arrBoxOn.find(function (box) {
  
          return box.coord[0] == y && box.coord[1] == x;
  
        });
      }
  
  
      function onChangeColor(arrBox, color) {
  
        for (var i = 0; i < arrBox.length; i++) {
  
          arrBox[i].children[0].setAttrs({
            status: "on",
            colorBox: color,
          });
  
          arrBox[i].children[2].setAttrs({
            status: "on",
            colorBox: color,
  
          });
  
          arrBox[i].children[1].setAttrs({
            status: "on",
            colorBox: color,
  
          });
  
          arrBox[i].children[1].children[0].setAttrs({
            status: "on",
            colorBox: color
          });
  
  
  
          arrBox[i].children[1].changeColor(color);
          arrBox[i].children[1].show();
          arrBox[i].children[2].draw();
          arrBox[i].children[1].draw();
          arrBox[i].children[0].draw();
          arrBox[i].children[1].children[0].draw();
  
          animChangeColor(arrBox[i].children[1].children[0], "red");
  
  
        }
      }
  
    }
  
  
    function getBoxAccept(
      arrBox,
      colorTeam0 = gameProcessing.getColorTeam(0),
      colorTeam1 = gameProcessing.getColorTeam(1)) {
  
      ///////////////////////////////////////
  
      var arrBoxTeamOn = [];
      var arrBoxNone = [];
      var arrAccept = [];
  
      getBoxTeamOn(arrBox, arrBoxTeamOn, colorTeam0);
      getAllBoxNone(arrBoxTeamOn, colorTeam0, colorTeam1);
      filterBoxAccept(arrBox, arrBoxNone, colorTeam0, colorTeam1);
  
      return arrAccept;
  
      function filterBoxAccept(arrBox, arrBoxNone, colorTeam0, colorTeam1) {
  
        for (let i = 0; i < arrBoxNone.length; i++) {
  
          //var colorBox = getColor(arrBoxNone[i]); 
  
          var positionBox = getPositionBox(arrBoxNone[i]);
  
          var row = getRowBox(arrBox, positionBox[1]);      //  X
          var colum = getColumBox(arrBox, positionBox[0]);  //  Y
  
          var diagonalLine1 = getDiagonalBox1(arrBox, positionBox);
          var diagonalLine2 = getDiagonalBox2(arrBox, positionBox);
  
          onFilterMain(row, arrBoxNone[i], colorTeam0, colorTeam1);
          onFilterMain(colum, arrBoxNone[i], colorTeam0, colorTeam1);
          onFilterMain(diagonalLine1, arrBoxNone[i], colorTeam0, colorTeam1);
          onFilterMain(diagonalLine2, arrBoxNone[i], colorTeam0, colorTeam1);
  
        }
  
      }
  
  
      function getBoxTeamOn(arrBox, arrBoxTeamOn, colorBoxTeamOn) {
        for (var i = 0; i < arrBox.length; i++) {
  
          if (arrBox[i].children[1].children[0].attrs["status"] === "on"
            && arrBox[i].children[0].attrs["status"] === "on"
            && arrBox[i].children[0].attrs["colorBox"] === colorBoxTeamOn
            && arrBox[i].children[1].children[0].attrs["colorBox"] === colorBoxTeamOn) {
  
            arrBoxTeamOn.push(arrBox[i]);
  
          }
  
        }
      }
  
  
      function getAllBoxNone(arrBoxTeamOn, colorTeam0, colorTeam1) {
  
        for (let i = 0; i < arrBoxTeamOn.length; i++) {
  
          var position = getPositionBox(arrBoxTeamOn[i]);
  
          var columBox = getColumBox(arrBox, position[0]);
          var rowBox = getRowBox(arrBox, position[1]);
  
          var diagonalBox1 = getDiagonalBox1(arrBox, position);
          var diagonalBox2 = getDiagonalBox2(arrBox, position);
  
          getBoxNone(columBox, arrBoxTeamOn[i], colorTeam0, colorTeam1);
          getBoxNone(rowBox, arrBoxTeamOn[i], colorTeam0, colorTeam1);
  
          getBoxNone(diagonalBox1, arrBoxTeamOn[i], colorTeam0, colorTeam1);
          getBoxNone(diagonalBox2, arrBoxTeamOn[i], colorTeam0, colorTeam1);
  
        }
  
  
        function getBoxNone(groupBox, box, colorTeam0, colorTeam1) {
  
          var indexOfBox = groupBox.indexOf(box);
  
          if (groupBox[indexOfBox - 1]) {
  
            if (groupBox[indexOfBox - 1].children[1].children[0].attrs["status"] === "off"
              && groupBox[indexOfBox - 1].children[0].attrs["colorBox"] !== colorTeam0
              && groupBox[indexOfBox - 1].children[0].attrs["colorBox"] !== colorTeam1) {
  
              arrBoxNone.push(groupBox[indexOfBox - 1]);
  
            }
          }
  
          if (groupBox[indexOfBox + 1]) {
  
            if (groupBox[indexOfBox + 1].children[1].children[0].attrs["status"] === "off"
              && groupBox[indexOfBox + 1].children[0].attrs["colorBox"] !== colorTeam0
              && groupBox[indexOfBox + 1].children[0].attrs["colorBox"] !== colorTeam1) {
  
              arrBoxNone.push(groupBox[indexOfBox + 1]);
  
            }
          }
  
  
        }
  
  
      }
  
  
      /////////////////////////////////
  
  
      function onFilterMain(arrBlock, box, colorTeam0, colorTeam1) {
  
        var _indexOfBox = arrBlock.indexOf(box);
  
        var _arrColor1 = [];
        var _arrBoxX1 = [];
  
        for (var i = _indexOfBox + 1; i < arrBlock.length; i++) {
  
          var _colorTeam = getColor(arrBlock[i]);
          _arrColor1.push(getColor(arrBlock[i]));
          _arrBoxX1.push(arrBlock[i]);
  
          if (_colorTeam == colorTeam1 || _colorTeam === "none") {
  
            break;
  
          }
  
        }
  
        if (_arrBoxX1.length >= 2) {
          if (_arrColor1.indexOf(colorTeam1) !== -1) {
            //onChangeColorAccept(box);
            arrAccept.push(box);
          }
  
        }
  
        // // // // // // // // //
  
        var _arrColor2 = [];
        var _arrBoxX2 = [];
  
        for (var i = _indexOfBox - 1; i > -1; --i) {
  
          var _colorTeam = getColor(arrBlock[i]);
          _arrColor2.push(getColor(arrBlock[i]));
          _arrBoxX2.push(arrBlock[i]);
  
          if (_colorTeam == colorTeam1 || _colorTeam === "none") {
            break;
          }
  
        }
  
        if (_arrBoxX2.length >= 2) {
          if (_arrColor2.indexOf(colorTeam1) !== -1) {
            //onChangeColorAccept(box);
            arrAccept.push(box);
          }
        }
  
  
      }
  
  
      function getColumBox(arrBox, index) {
        return arrBox.filter(function (box) {
          return box.coord[0] == index;
        });
      }
  
  
      function getRowBox(arrBox, index) {
  
        return arrBox.filter(function (box) {
  
          return box.coord[1] == index;
  
        });
      }
  
  
      function getDiagonalBox1(arrBox, position) {
  
        return arrBox.filter(function (box) {
  
          return (box.coord[0] + box.coord[1] === position[0] + position[1])
  
        });
  
      }
  
  
      function getDiagonalBox2(arrBox, position) {
  
        var newArrBox = [];
        var positionX = position[0]     // X
          , positionY = position[1];    // Y
  
        for (let i = 0; i < Math.sqrt(arrBox.length); i++) {
  
          for (let j = (positionX - positionY); j < Math.sqrt(arrBox.length); j++) {
  
            newArrBox.push(...arrBox.filter(function (b) {
  
              return (b.coord[0] == j && b.coord[1] == i);
  
            }));
  
            i++;
  
            if (j === Math.sqrt(arrBox.length)) {
  
              break;
            }
  
          }
  
          break;
  
        }
  
        return newArrBox;
  
      }
  
  
  
      function getColor(box) {
        if (box == null) {
  
          return null;
  
        } else
  
          return box.children[0].attrs.colorBox;
      }
  
  
      function getPositionBox(box) {
  
        return box.coord;
  
      }
  
    }
  
  
  
    function getBoxNoneNearBoxTeamOn(
      arrBox,
      colorTeam0 = gameProcessing.getColorTeam(0),
      colorTeam1 = gameProcessing.getColorTeam(1)) {
  
  
      ///////////////////////////////////////
  
      var arrBoxTeamOn = [];
      var arrBoxNone = [];
  
      getBoxTeamOn(arrBox, arrBoxTeamOn, colorTeam0);
      getAllBoxNone(arrBoxTeamOn, colorTeam0, colorTeam1);
  
      return arrBoxNone;
  
      function getBoxTeamOn(arrBox, arrBoxTeamOn, colorBoxTeamOn) {
        for (var i = 0; i < arrBox.length; i++) {
  
          if (arrBox[i].children[1].children[0].attrs["status"] === "on"
            && arrBox[i].children[0].attrs["status"] === "on"
            && arrBox[i].children[0].attrs["colorBox"] === colorBoxTeamOn
            && arrBox[i].children[1].children[0].attrs["colorBox"] === colorBoxTeamOn) {
  
            arrBoxTeamOn.push(arrBox[i]);
  
          }
  
        }
      }
  
  
      function getAllBoxNone(arrBoxTeamOn, colorTeam0, colorTeam1) {
  
        for (let i = 0; i < arrBoxTeamOn.length; i++) {
  
          var position = getPositionBox(arrBoxTeamOn[i]);
  
          var columBox = getColumBox(arrBox, position[0]);
          var rowBox = getRowBox(arrBox, position[1]);
  
          var diagonalBox1 = getDiagonalBox1(arrBox, position);
          var diagonalBox2 = getDiagonalBox2(arrBox, position);
  
          getBoxNone(columBox, arrBoxTeamOn[i], colorTeam0, colorTeam1);
          getBoxNone(rowBox, arrBoxTeamOn[i], colorTeam0, colorTeam1);
  
          getBoxNone(diagonalBox1, arrBoxTeamOn[i], colorTeam0, colorTeam1);
          getBoxNone(diagonalBox2, arrBoxTeamOn[i], colorTeam0, colorTeam1);
  
        }
  
  
        function getBoxNone(groupBox, box, colorTeam0, colorTeam1) {
  
          var indexOfBox = groupBox.indexOf(box);
  
          if (groupBox[indexOfBox - 1]) {
  
            if (groupBox[indexOfBox - 1].children[1].children[0].attrs["status"] === "off"
              && groupBox[indexOfBox - 1].children[0].attrs["colorBox"] !== colorTeam0
              && groupBox[indexOfBox - 1].children[0].attrs["colorBox"] !== colorTeam1) {
  
              arrBoxNone.push(groupBox[indexOfBox - 1]);
  
            }
          }
  
          if (groupBox[indexOfBox + 1]) {
  
            if (groupBox[indexOfBox + 1].children[1].children[0].attrs["status"] === "off"
              && groupBox[indexOfBox + 1].children[0].attrs["colorBox"] !== colorTeam0
              && groupBox[indexOfBox + 1].children[0].attrs["colorBox"] !== colorTeam1) {
  
              arrBoxNone.push(groupBox[indexOfBox + 1]);
  
            }
          }
  
  
        }
  
  
      }
      /////////////////////////////////
  
  
      function getColumBox(arrBox, index) {
        return arrBox.filter(function (box) {
          return box.coord[0] == index;
        });
      }
  
  
      function getRowBox(arrBox, index) {
  
        return arrBox.filter(function (box) {
  
          return box.coord[1] == index;
  
        });
      }
  
  
      function getDiagonalBox1(arrBox, position) {
  
        return arrBox.filter(function (box) {
  
          return (box.coord[0] + box.coord[1] === position[0] + position[1])
  
        });
  
      }
  
  
      function getDiagonalBox2(arrBox, position) {
  
        var newArrBox = [];
        var positionX = position[0]     // X
          , positionY = position[1];    // Y
  
        for (let i = 0; i < Math.sqrt(arrBox.length); i++) {
  
          for (let j = (positionX - positionY); j < Math.sqrt(arrBox.length); j++) {
  
            newArrBox.push(...arrBox.filter(function (b) {
  
              return (b.coord[0] == j && b.coord[1] == i);
  
            }));
  
            i++;
  
            if (j === Math.sqrt(arrBox.length)) {
  
              break;
            }
  
          }
  
          break;
  
        }
  
        return newArrBox;
  
      }
  
  
      function getPositionBox(box) {
  
        return box.coord;
  
      }
  
    }
  
  
  
    function onClickTeam(board, team) {
  
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
  
      var allBox = board.children[0].children;
      for (let i = 0; i < allBox.length; i++) {
  
        allBox[i].children[0].on("click", function () {
  
          var status = "on";
  
          var colorBox = GameController.getColorTeam(team);
          console.log(colorBox);
          allBox[i].children[0].setAttrs({
            status: status,
            colorBox: colorBox,
  
          });
  
          allBox[i].children[1].setAttrs({
            status: status,
            colorBox: colorBox,
  
          });
  
          if (status === "on" && team === 0) {
            console.log("Draw Team 0")
            drawTeam0(allBox[i].children[1]);
            allBox[i].children[1].children[0].setAttrs({
              status: status,
              colorBox: colorBox
            });
  
            allBox[i].children[2].show();
            allBox[i].children[2].draw();
            allBox[i].children[1].children[0].draw();
            allBox[i].children[0].draw();
            //turn = 1;
  
  
          }
          if (status === "on" && team === 1) {
            console.log("Draw Team 1")
            drawTeam1(allBox[i].children[1]);
            allBox[i].children[1].children[0].setAttrs({
              status: status,
              colorBox: colorBox
            });
  
            allBox[i].children[2].show();
            allBox[i].children[2].draw();
            allBox[i].children[1].children[0].draw();
            allBox[i].children[0].draw();
            //turn = 0;
            // turnPlayer0();
  
          }
  
  
          gameProcessing(allBox[i], allBox[i].parent.children);
  
          //timeLine.start();
  
          //countPoint(board);
  
          //scope.batchDraw();
  
          allBox[i].draw();
          //nextTurn();
        });
  
      }
      //nextTurn();
  
  
      // body
    }
  
  
    //   lock && unlock box
  
    function lockAllBox(arrBox) {
  
      for (let i = 0; i < arrBox.length; i++) {
        arrBox[i].listening(false);
      }
  
    }
  
  
    function unlockBox(arrBox) {
  
      for (let i = 0; i < arrBox.length; i++) {
        arrBox[i].listening(true);
      }
  
    }
  
  
    function animScale(node, layer) {
  
      var tween = new Konva.Tween({
        node: node,
        duration: 0.1,
        x: node.getAttr("x") - 1,
        y: node.getAttr("y") - 1,
        scaleX: 1.14,
        scaleY: 1.14,
        stroke: 'rgb(199, 0, 57)',
        strokeWidth: 0.5
      });
  
      tween.play();
  
      setTimeout(function () {
        tween = new Konva.Tween({
          node: node,
          duration: 0.1,
          x: node.getAttr("x") + 1,
          y: node.getAttr("y") + 1,
          scaleX: 1,
          scaleY: 1,
          stroke:'rgb(199, 0, 57)',
          strokeWidth: 0
        });
        tween.play();
        setTimeout(function () {
    
          //tween.reset();
    
        }, 200);
  
      }, 750);
      
  
    }
  
    function animChangeColor(node, color = 'red') {
  
      var tween = new Konva.Tween({
        node: node,
        duration: 0.15,
        //fill : color,
        x: node.getAttr("x") - 1,
        y: node.getAttr("y") - 1,
        scaleX: 1.17,
        scaleY: 1.17,
  
      });
  
      tween.play();
      
      setTimeout(function () {
        tween = new Konva.Tween({
          node: node,
          duration: 0.15,
          x: node.getAttr("x") + 1,
          y: node.getAttr("y") + 1,
          scaleX: 1,
          scaleY: 1,
        });
    
        tween.play();
  
      }, 200);
  
      // return new Promise(resolve => {
      //   setTimeout(function () {
  
      //     tween.reset();
    
      //   }, 100);
      // });
  
    }
  
  
  
  
  
  
  
  
  
    exports.init = init;
    exports.startGame = startGame;
    exports.getColorTeam = getColorTeam;
    //exports.setColorTeam = setColorTeam;
    exports.getInfoPlayer = getInfoPlayer;
    exports.getInfoPlayerFB = getInfoPlayerFB;
    
    exports.getAllPlayer = getAllPlayer;
    exports.setScorePlayer = setScorePlayer;
    exports.gameProcessing = gameProcessing;
    exports.getBoxAccept = getBoxAccept;
    exports.getBoxNoneNearBoxTeamOn = getBoxNoneNearBoxTeamOn;
    exports.lockAllBox = lockAllBox;
    exports.unlockBox = unlockBox;
    exports.animScale = animScale;
    exports.getDataFB = getDataFB;
    exports.Events = Events;
    exports.playerInfo = playerInfo;
  
    
  
  
  
    exports.onClickTeam = onClickTeam;
  
  
    Object.defineProperty(exports, '__esModule', { value: true });
    Object.defineProperties(exports, {
      Teams: { get: function () { return Teams } },
      data: { get: function () { return data } },
      // Events: { get: function () { return Events; } },
      // stage: { get: function () { return stage; } },
      // canvas: { get: function () { return app.view; } },
      // app: { get: function () { return app; } },
      // holder: { get: function () { return holder; } },
  
  
    });
  
  }));
  