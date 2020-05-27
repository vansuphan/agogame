(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.Master = {}));
}(this, function (exports) {
    'use strict';

    
    var Events = {
        ON_LOAD_PROGRESS: "onLoadProgress",
        ON_LOAD_COMPLETE: "onLoadComplete",
        ON_LOAD_ERROR: "onLoadError",
        TICK: "tick",
        CLICK_PLAY_NOW: "PLAY_NOW"

    }
    $(GameController).on(GameController.Events.LOGIN, function(){
        console.log("Master GameController GameController.Events.LOGIN");
        init();
    });


    var statusResult = 1;

    var app
        , renderer
        ;

    var ratio = 1,
        scaleRatio = 1;

    var _width = sw
        , _height = sh
        ;

    var currentLayerId = -1;


    var stage
        , homeLayer
        , playWithComputerLayer
        , playWithFriendLayer
        , leaderboardLayer
        ;

    function init() {
        
        createStage();

        changeSceneById(0);

        update();
        //console.log("init game")
        // var holderLoader = document.querySelector('.hoder-loader');
        // holderLoader.setAttribute("style","display : none");
    //     FBInstant.startGameAsync()
    //     .then(function() {
      
    //     // once startGameAsync() resolves
    //     var contextId = FBInstant.context.getID();
    //     var contextType = FBInstant.context.getType();
  
    //     var playerName = FBInstant.player.getName();
    //     var playerPic = FBInstant.player.getPhoto();
    //     var playerId = FBInstant.player.getID();

  
    //     console.log("contextId : ", contextId);
    //     console.log("contextType : ", contextType);
    //     console.log("playerName : ", playerName);
    //     console.log("playerPic : ", playerPic);
    //     console.log("playerId : ", playerId);
    //     var holderLoader = document.querySelector('.hoder-loader');
    //     holderLoader.setAttribute("style","display : none");
    //   });
        // FBInstant.startGameAsync()
        // .then(function() {
        // });
    }

    function update(e) {

        stage.fire("tick", { deltaTime: e });

        window.requestAnimationFrame(update);
    }

    

    function createStage() {

        stage = new Konva.Stage({
            container: 'holder-home', // id of container <div>
            width: _width,
            height: _height
        });


        homeLayer = new Home();
        homeLayer.setAttrs({
            idLayer : 0
        });

        playWithComputerLayer = new PlayWithComputer({
            statusResult: statusResult,

        });
        //playWithComputerLayer.on(CLICK_PLAY_NOW, )
        
        playWithComputerLayer.setAttrs({
            idLayer : 1
        });

        playWithFriendLayer = new PlayWithFriend({
            statusResult: statusResult,
        });
        playWithFriendLayer.setAttrs({
            idLayer : 2
        });

        leaderboardLayer = new Leaderboard();
        leaderboardLayer.setAttrs({
            idLayer : 3
        });
        
        stage.add(
            homeLayer,
            playWithComputerLayer,
            playWithFriendLayer,
            leaderboardLayer,
            //popupholder

        );
        // homeLayer.draw();

        
        function fitStageIntoParentContainer() {
            var container = document.querySelector('#holder-master');
          
            // now we need to fit stage into parent
            var containerWidth = container.offsetWidth;
            // to do this we need to scale the stage
            var scale = containerWidth / _width;
          
            stage.width(_width * scale);
            stage.height(_height * scale);
            stage.scale({ x: scale, y: scale });
            stage.draw();
        }
          
        fitStageIntoParentContainer();
          // adapt the stage on any window resize
        window.addEventListener('resize', fitStageIntoParentContainer);
          
          // Add click listener
        // stage.on("click", e => {
        //     console.log(stage.getPointerPosition());
        // });

    }


    function changeSceneById(id) {

        if (currentLayerId == id) return;
        
        for (var i = 0; i < stage.children.length; i++) {
            var item = stage.children[i];

            if (i == id) {

                item.show();

                item.draw();
                
                if (item.awake) item.awake();
                //if (item.init) item.initMain();

            }
            else {
                item.hide();
                //item.remove();
            }
        }

        currentLayerId = id;
    }





    exports.init = init;
    exports.changeSceneById = changeSceneById;
    exports.playWithFriendLayer = playWithFriendLayer;


    Object.defineProperty(exports, '__esModule', { value: true });
    Object.defineProperties(exports, {
        // scene: { get: function () { return scene } },
        Events: { get: function () { return Events; } },
        stage: { get: function () { return stage; } },
        playWithFriendLayer:{get : function(){return playWithFriendLayer;}},
        // canvas: { get: function () { return app.view; } },
        // app: { get: function () { return app; } },
        // holder: { get: function () { return holder; } },


    });

}));
