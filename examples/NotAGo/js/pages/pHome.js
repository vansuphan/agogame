var pHome={init:function(){console.log("<pHome> => INIT!"),$(window).on("resize",pHome.onResize),pHome.onResize()},preloadImage:function(){var o=0;$(" img").each(function(n,e){e.onload=function(){++o==$(" img").length&&console.log("complete")}})},onResize:function(o){console.log("Browser size: "+window.innerWidth+"x"+window.innerHeight)},galleryInit:function(){}};