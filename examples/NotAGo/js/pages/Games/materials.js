var COLOR_MAIN = '#A98C5C'
    , COLOR_WHITE = "#ffffff"
    , COLOR_BLUE = "#165470"
    , COLOR_LIGHT = "#FFE2B3"
    , COLOR_RED = "#CC564E"
    , COLOR_ACCEPT ='#8fb98f'
    ;


var SUFFIX = "@3x";

var urlAPI ="https://suphan.notago.digitop.vn/";

// var urlAPI ="http://localhost:8000/";

Object.assign(Konva.Image.prototype, {
    scaleByWidth: function (width) {
        return this.scale({
            x: width / this.width(),
            y: width / this.width(),
        })
    },
    scaleByHeight: function (height) {
        return this.scale({
            x: height / this.height(),
            y: height / this.height(),
        })
    },
});



function centerByWidth(width) {
    return sw / 2 - (width / 2)
}
function centerByHeight(height) {
    return sh / 2 - (height / 2)
}

function Logo(options) {
    var scope = this;
    Konva.Group.call(scope);

    var contentLogo = new Konva.Rect({
        x: sw / 2 - (273 / 2),
        y: 36,
        width: 272,
        height: 73,
        fill: '#FFE2B2',
        stroke: 'black',
        strokeWidth: 0,
        shadowColor: 'black',
        shadowBlur: 25,
        shadowOffset: { x: -10, y: 8 },
        shadowOpacity: 0.1,
        cornerRadius: 10
    });
    var image = new Konva.Image({
        x: sw / 2 - (245.02 / 2),
        y: 48.59,
        image: pGame.resouces[path_resource + "images/game/logo" + SUFFIX + ".png"],
        width: 245.02,
        height: 48.19
    });

    // var image = new Konva.Image({
    //     x: sw / 2 - (273 / 2),
    //     y: 36,
    //     image: pGame.resouces[path_resource + "images/game/tagline-logo" + SUFFIX + ".png"],
    //     width: 272,
    //     height: 72
    // });

    scope.add(contentLogo, image);
    //scope.add(image);

    // scope.on('mousedown touchstart', function () {
    //     Master.changeSceneById(0);
    // })

};
Logo.prototype = Object.assign(Object.create(Konva.Group.prototype), {})


function Copyright(options) {
    var scope = this;
    Konva.Group.call(scope);

    var image = new Konva.Image({
        x: sw / 2 - (212 / 2),
        y: 558,
        image: pGame.resouces[path_resource + "images/game/copyright" + SUFFIX + ".png"],
        width: 212,
        height: 23
    });

    scope.add(image);

};
Copyright.prototype = Object.assign(Object.create(Konva.Group.prototype), {})



function IconGame(options) {
    var scope = this;
    Konva.Group.call(scope);

    // var iconHolder = new Konva.Group();

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            var url = i + j == 1 ? path_resource + "images/game/dot_blue" + SUFFIX + ".png" : path_resource + "images/game/dot_white" + SUFFIX + ".png";
            var dot = new Konva.Image({
                x: i * 30,
                y: j * 30,
                image: pGame.resouces[url],
                width: 16,
                height: 16
            });
            scope.add(dot)
        }
    }
    // scope.add(iconHolder);

};
IconGame.prototype = Object.assign(Object.create(Konva.Group.prototype), {})




function ButtonMenu(options) {
    var scope = this;
    Konva.Group.call(scope);

    options = options || {};
    var text = options['text'] || "";
    var onClick = options['onClick'] || null;

    var _width = 330;

    var background = new Konva.Image({
        x: 0,
        y: 0,
        image: pGame.resouces[path_resource + "images/game/btn-background" + SUFFIX + ".png"],
        width: _width,
        height: 110
    });
    scope.add(background);

    var textObject = new Konva.Text({
        x: 55,
        y: 38,
        fill: COLOR_MAIN,
        text: text,
        fontFamily: 'Bungee',
        fontSize: 18,
        fontWeight: "bold",
        align: 'center',
    });
    scope.add(textObject);


    var arrow = new Konva.Image({
        x: 260,
        y: 34,
        image: pGame.resouces[path_resource + "images/game/arrow_white" + SUFFIX + ".png"],
        width: 17,
        height: 21
    });
    scope.add(arrow);


    scope.on('mousedown touchstart', function () {
        // var dur = .25;
        // var obj = { alpha: 1 }

        console.log(scope.text);

        // // scope.opacity(.5)
        // textObject.alpha(0.2);
        // textObject.opacity(0.2);

        // TweenMax.to(obj, dur, {
        //     alpha: 0,
        //     onUpdate: function () {
        //         console.log(scope.opacity())
        //         scope.opacity(obj.alpha)
        //     }
        //     // opacity:
        // })

        if (onClick) onClick();
    })

    scope.width = _width;
    scope.text = text;
};
ButtonMenu.prototype = Object.assign(Object.create(Konva.Group.prototype), {})




// Button in Popup
function ButtonPopup(options) {
    var scope = this;
    var text = options['text'] || "";
    Konva.Group.call(scope);

    var buttonContent = new Konva.Rect({
        width: 194,
        height: 40,
        fill: '#FFFFFF',
        shadowColor: '#000000',
        shadowBlur: 20,
        shadowOffset: { x: -10, y: 8 },
        shadowOpacity: 0.15,
        cornerRadius: 10
    });
    var text = new Konva.Text({
        x: 25,
        y: 12,
        fill: COLOR_MAIN,
        text: text,
        fontFamily: 'Bungee',
        fontSize: 18,
        fontWeight: "bold",
        align: 'center',
    });
    var arrow = new Konva.Image({
        x: 156.55,
        y: 10,
        image: pGame.resouces[path_resource + "images/game/arrow_yellow" + SUFFIX + ".png"],
        width: 15.56,
        height: 21
    });

    //btnMainMenuGroup.x(sw / 2 - (btnMainMenu.width() / 2));
    scope.add(buttonContent, text, arrow);

}
ButtonPopup.prototype = Object.assign(Object.create(Konva.Group.prototype), {})




// Konva.Image.prototype = Object.assign()

function Avatar(options) {
    var scope = this;
    Konva.Group.call(scope);

    options = options || {};
    var url = options['url'] || path_resource + "images/game/test/IMG_2480.jpg";
    var size = options['size'] || 50;



    var avatarImg = new Konva.Image({
        // x: sw / 2 - (245.02/ 2),
        // y: 48.59,
        image: pGame.resouces[path_resource + "images/game/test/IMG_2480.jpg"],
        x: 109,
        y: 75,
        width: 54,
        height: 54,
        radius: 70,
        //threshold: 10,
    });



    var containerImage = new Konva.Rect({
        x: 109,
        y: 75,
        width: 54,
        height: 54,
        cornerRadius: 15,
        stroke: COLOR_MAIN,
        strokeWidth: 5,

        // fillPatternOffset: { x: -220, y: 70 },
        // fillPatternImage: imagess,
    });
    var circle = new Konva.Rect({
        x: 104,
        y: 70,
        width: 64,
        height: 64,
        cornerRadius: 20,
        fill: '#ffffff00',
        stroke: COLOR_LIGHT,
        strokeWidth: 8
    });

   


    scope.add(avatarImg);
    scope.add(containerImage);
    scope.add(circle);






    // scope.on('mousedown touchstart', function () {
    //     console.log("click on avatar !")
    //     Master.changeSceneById(0);
    // })

};
Avatar.prototype = Object.assign(Object.create(Konva.Group.prototype), {});


// Button in Popup
function ButtonQuitGame(options) {
    var scope = this;
    var text = options['text'] || "";
    Konva.Group.call(scope);

    var buttonContent = new Konva.Rect({
        width: 179,
        height: 40,
        fill: COLOR_LIGHT,
        shadowColor: '#000000',
        shadowBlur: 20,
        shadowOffset: { x: -10, y: 8 },
        shadowOpacity: 0.15,
        cornerRadius: 10
    });
    var text = new Konva.Text({
        x: 25,
        y: 12,
        fill: COLOR_MAIN,
        text: text,
        fontFamily: 'Bungee',
        fontSize: 18,
        fontWeight: "bold",
        align: 'center',
    });
    var arrow = new Konva.Image({
        x: 156.55,
        y: 10,
        image: pGame.resouces[path_resource + "images/game/arrow_white" + SUFFIX + ".png"],
        width: 15.56,
        height: 21
    });

    //btnMainMenuGroup.x(sw / 2 - (btnMainMenu.width() / 2));
    scope.add(buttonContent, text, arrow);

}
ButtonQuitGame.prototype = Object.assign(Object.create(Konva.Group.prototype), {});




//
function PopupTeam2(options) {
    var scope = this;
    var text = options['text'] || "";
    var x  = options['x'] || 0;
    var y  = options['y'] || 0;
    var fill  = options['fill'] || COLOR_BLUE;
    Konva.Group.call(scope);


    var Group =new Konva.Group({
        x: x,
        y: y,
    })

    var container  = new Konva.Rect({
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        fill: '#af905e85',
        fontSize: 18,
        fontWeight: "bold",
        align: 'center',
    });
    
    var text = new Konva.Text({
        x: 300 / 2 - 180/ 2 ,
        y: 300 / 2 - 18/ 2 ,
        fill: fill,
        text: text,
        fontFamily: 'Bungee',
        fontSize: 18,
        fontWeight: "bold",
        align: 'center',
    });
    
    //btnMainMenuGroup.x(sw / 2 - (btnMainMenu.width() / 2));
    Group.add(container, text)
    scope.add(Group);

}
PopupTeam2.prototype = Object.assign(Object.create(Konva.Group.prototype), {});

function PopupTeam(options) {
    var scope = this;
    Konva.Group.call(scope);

    options = typeof options != "undefined" ? options : {};
    var statusResult = options.hasOwnProperty("statusResult") ? options.statusResult : -1;
    var routeLayer = options.hasOwnProperty("routeLayer") ? options.routeLayer : 2;
    var urlImage = options.hasOwnProperty("urlImage") ? options.urlImage : "";
    var team = options.hasOwnProperty("team") ? options.team : 1;
    //var teamText;
    //var color = GameController.getColorTeam(team);
    //console.log(options.team)
    // if(team === 1){
    //     teamText = "WHITE";
    // }else{
    //     teamText = "BLUE";
    // }
    var backBackground = new Konva.Rect({
        x: 0,
        y: 0,
        fill: "00000005",
        width: sw,
        height: sh,
        opacity: .5,
    });
    scope.add(backBackground);


    var content = new Konva.Group({
        x: sw / 2 - 272 / 2,
        y: 178
    })

    var _width = 272;
    var _height = 245;
    var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: _width,
        height: _height,
        fill: COLOR_LIGHT,
        // shadowBlur: 20,
        cornerRadius: 10
    });


    var congratTitle = new Konva.Text({
        x: 0,
        y: 20,
        fill: COLOR_MAIN,
        text: "YOUR TEAM",
        fontFamily: 'Bungee',
        fontSize: 14,
        fontWeight: "bold",
        align: 'center',
    });
    congratTitle.x(_width / 2 - (congratTitle.width() / 2));


    var congratTextWhite = new Konva.Text({
        x: 0,
        y: 37,
        fill: COLOR_WHITE,
        text: "WHITE",
        fontFamily: 'Bungee',
        fontSize: 24,
        fontWeight: "bold",
        align: 'center',
    });
    congratTextWhite.x(_width / 2 - (congratTextWhite.width() / 2));

    var congratTextBlue = new Konva.Text({
        x: 0,
        y: 37,
        fill: COLOR_BLUE,
        text: "BLUE",
        fontFamily: 'Bungee',
        fontSize: 24,
        fontWeight: "bold",
        align: 'center',
    });
    congratTextBlue.x(_width / 2 - (congratTextBlue.width() / 2));


    var closeIcon = new Konva.Image({
        x: 252,
        y: 10,
        image: pGame.resouces[path_resource + "images/game/close-icon" + SUFFIX + ".png"],
        width: 10,
        height: 10
    });

    var avatar = new Avatar2({
        url: urlImage
    });
 

    var buttonHolder = new Konva.Group({
        x: 39,
        y: 141
    });


    var outButton = new ButtonPopup({
        text: "OKAY!"
    });


    buttonHolder.add(outButton);

    outButton.on("click mousedown touchstart", function () {
        scope.destroy();
        changeSceneById(0);
        console.log("Destroy");
        console.log(scope);
        changeSceneById(routeLayer);
    });

    if(team === 0){
        content.add(
            background,
            congratTitle,
            congratTextBlue,
            avatar,
            buttonHolder,
            closeIcon
        );
        scope.add(content);
    }
    if(team === 1 ){
        content.add(
            background,
            congratTitle,
            congratTextWhite,
            avatar,
            buttonHolder,
            closeIcon
        );
        scope.add(content);
    }
 
    function changeSceneById(id) {
        Master.changeSceneById(id);
    }

};
PopupTeam.prototype = Object.assign(Object.create(Konva.Group.prototype), {});

function PopupColorTeam(options) {
    var scope = this;
    Konva.Group.call(scope);

    options = typeof options != "undefined" ? options : {};
    var statusResult = options.hasOwnProperty("statusResult") ? options.statusResult : -1;
    var routeLayer = options.hasOwnProperty("routeLayer") ? options.routeLayer : 2;
    var urlImage = options.hasOwnProperty("urlImage") ? options.urlImage : "";
    var team = options.hasOwnProperty("team") ? options.team : 0;
    //var teamText;
    //var color = GameController.getColorTeam(team);
    //console.log(options.team)
    // if(team === 1){
    //     teamText = "WHITE";
    // }else{
    //     teamText = "BLUE";
    // }
    var backBackground = new Konva.Rect({
        x: 0,
        y: 0,
        fill: "00000005",
        width: sw,
        height: sh,
        opacity: .5,
    });
    scope.add(backBackground);


    var content = new Konva.Group({
        x: sw / 2 - 272 / 2,
        y: 178
    })

    var _width = 272;
    var _height = 245;
    var background = new Konva.Rect({
        x: 0,
        y: 0,
        width: _width,
        height: _height,
        fill: COLOR_LIGHT,
        // shadowBlur: 20,
        cornerRadius: 10
    });


    var congratTitle = new Konva.Text({
        x: 0,
        y: 20,
        fill: COLOR_MAIN,
        text: "YOUR TEAM",
        fontFamily: 'Bungee',
        fontSize: 14,
        fontWeight: "bold",
        align: 'center',
    });
    congratTitle.x(_width / 2 - (congratTitle.width() / 2));


    var congratTextWhite = new Konva.Text({
        x: 0,
        y: 37,
        fill: COLOR_WHITE,
        text: "WHITE",
        fontFamily: 'Bungee',
        fontSize: 24,
        fontWeight: "bold",
        align: 'center',
    });
    congratTextWhite.x(_width / 2 - (congratTextWhite.width() / 2));

    var congratTextBlue = new Konva.Text({
        x: 0,
        y: 37,
        fill: COLOR_BLUE,
        text: "BLUE",
        fontFamily: 'Bungee',
        fontSize: 24,
        fontWeight: "bold",
        align: 'center',
    });
    congratTextBlue.x(_width / 2 - (congratTextBlue.width() / 2));


    var closeIcon = new Konva.Image({
        x: 252,
        y: 10,
        image: pGame.resouces[path_resource + "images/game/close-icon" + SUFFIX + ".png"],
        width: 10,
        height: 10
    });

    var avatar = new Avatar2({
        url: urlImage
    });
 

    var buttonHolder = new Konva.Group({
        x: 39,
        y: 141
    });


    var outButton = new ButtonPopup({
        text: "OKAY!"
    });


    buttonHolder.add(outButton);


    
    console.log(options.team);
    if(options.team === 0){
        outButton.on("click mousedown touchstart", function () {
            scope.destroy();
            changeSceneById(0);
            console.log("Destroy");
            changeSceneById(2);
        });
        content.add(
            background,
            congratTitle,
            congratTextBlue,
            avatar,
            buttonHolder,
            closeIcon
        );
        scope.add(content);
    }
    if(options.team === 1 ){
        outButton.on("click mousedown touchstart", function () {
            scope.destroy();
            changeSceneById(0);
            console.log("Destroy");
            changeSceneById(2);
        });
        content.add(
            background,
            congratTitle,
            congratTextWhite,
            avatar,
            buttonHolder,
            closeIcon
        );
        scope.add(content);
    }
 
    function changeSceneById(id) {
        Master.changeSceneById(id);
    }

};
PopupColorTeam.prototype = Object.assign(Object.create(Konva.Group.prototype), {});