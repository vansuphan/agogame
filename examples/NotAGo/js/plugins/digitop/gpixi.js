var GPixi={enterFrameItems:[],changedSizeItems:[],usePivotPercent:function(e,t){if(!e.pivotPercent)return e.originalSize=GPixi.getOriginalSize(e),e.pivotPercent={get x(){return e.pivot.x/e.originalSize.width},set x(t){e.pivot.x=e.originalSize.width*t},get y(){return e.pivot.y/e.originalSize.height},set y(t){e.pivot.y=e.originalSize.height*t},set:function(t,i){e.pivotPercent.x=t,e.pivotPercent.y=i}},e.updatePivotPercent=function(){this.pivotPercent.x=this.pivot.x/this.originalSize.width,this.pivotPercent.y=this.pivot.y/this.originalSize.height},GPixi.onSizeChanged(e,function(e){var t=e.target;t.updatePivotPercent&&t.updatePivotPercent()}),e.anchor&&(e.pivotPercent.x=e.anchor.x,e.pivotPercent.y=e.anchor.y,e.anchor.set(0,0)),e.pivotPercent},setPivotPercentWithoutMoving:function(e,t,i){if(e.pivotPercent){e.pivotPercent;var r={x:e.originalSize.width*t,y:e.originalSize.height*i},n=new PIXI.Point(r.x,r.y),o=e.toGlobal(e.pivot).x,a=e.toGlobal(e.pivot).y,h=e.toGlobal(n).x-o,c=e.toGlobal(n).y-a;e.x+=h,e.y+=c,e.pivotPercent.set(t,i)}else GPixi.usePivotPercent(e)},setPivotPercent:function(e,t,i){if(!e.pivotPercent)throw"GPixi.usePivotPercent(target) has not been enabled yet.";return e.pivotPercent.set(t,i),{x:e.pivotPercent.x,y:e.pivotPercent.y}},getBoundSize:function(e){var t=new PIXI.Container,i=e.parent,r=this.copyPropertiesOf(e);(t=new PIXI.Container).addChild(e),e.x=0,e.y=0;var n=new PIXI.Rectangle(0,0,t.width,t.height);return console.log(e.width,e.height),console.log(n.width,n.height),i&&i.addChild(e),GPixi.applyPropertiesTo(e,r),n},onSizeChanged:function(e,t){var i=GPixi;e.gpixiCurrentSize={width:e.width,height:e.height},e.sizeChangedCallback=t,i.changedSizeItems.push(e)},removeSizeChanged:function(e){var t=GPixi;if(!e)throw"Object is undefined.";GArray.remove(e,t.changedSizeItems),e.sizeChangedCallback=null},onUpdate:function(e,t){var i=GPixi;e.callback=t,i.enterFrameItems.push(e)},offUpdate:function(e){var t=GPixi;if(!e)throw"Object is undefined.";t.enterFrameItems.indexOf(e)<0||(GArray.remove(e,t.enterFrameItems),e.callback=null)},offAllUpdateEvents:function(){for(var e=GPixi,t=0;t<e.enterFrameItems.length;t++){e.enterFrameItems[t].callback=null}e.enterFrameItems=[]},onEnterFrame:function(e,t){var i=GPixi;e.callback=t,i.enterFrameItems.push(e)},removeEnterFrame:function(e){var t=GPixi;if(!e)throw"Object is undefined.";t.enterFrameItems.indexOf(e)<0||(GArray.remove(e,t.enterFrameItems),e.callback=null)},removeAllEnterFrame:function(){for(var e=GPixi,t=0;t<e.enterFrameItems.length;t++){e.enterFrameItems[t].callback=null}e.enterFrameItems=[]},exportBase64:function(e,t,i){i&&i.cropSize;var r,n=!!i&&i.ignoreRotation;n&&(r=e.rotation,e.rotation=0);var o=e.getBounds(),a=new PIXI.BaseRenderTexture(t.width,t.height,PIXI.SCALE_MODES.LINEAR,1),h=new PIXI.RenderTexture(a,new PIXI.Rectangle(o.x,o.y,Math.floor(o.width),Math.floor(o.height)));t.render(e,h);var c=t.extract.base64(h);return n&&(e.rotation=r),c},containerToBase64:function(e,t,i){var r=GPixi.containerToTexture(e,t,i);return e.extract.base64(r)},containerToTexture:function(e,t,i){var r=i||{width:t.width,height:t.height},n=new PIXI.BaseRenderTexture(r.width,r.height,PIXI.SCALE_MODES.LINEAR,1),o=new PIXI.RenderTexture(n);return e.render(t,o),o},newButton:function(e,t){var i,r,n=new PIXI.Container,o=GPixi.addNewSpriteTo("normal",n,e);return n.interactive=!0,n.buttonMode=!0,n.state="normal",t&&t.hover&&((i=GPixi.addNewSpriteTo("hover",n,t.hover)).visible=!1),t&&t.press&&((r=GPixi.addNewSpriteTo("press",n,t.press)).visible=!1),t&&t.auto&&(n.on("mouseover",function(){n.changeState("hover")}),n.on("mouseout",function(){n.changeState("normal")})),n.changeState=function(e){switch(this.state=e,e){case"press":i&&(i.visible=!1),o&&(o.visible=!1),r&&(r.visible=!0);break;case"hover":o&&(o.visible=!1),r&&(r.visible=!1),i&&(i.visible=!0);break;default:i&&(i.visible=!1),r&&(r.visible=!1),o.visible=!0}},n.setStateTexture=function(e,t){switch(e){case"press":r&&(r.texture=GPixi.textureFromLoader(t));break;case"hover":i&&(i.texture=GPixi.textureFromLoader(t));break;default:o.texture=GPixi.textureFromLoader(t)}},n},addNewButtonTo:function(e,t,i,r){var n=GPixi.newButton(i,r);return t[e]=n,t.addChild(n),n},getRootStage:function(e){if(e.parent){if(e.parent.parent){if(e.parent.parent.parent){if(e.parent.parent.parent.parent)throw"Can only get max 4 levels of parent";return e.parent.parent.parent}return e.parent.parent}return e.parent}return!1},setAnchor:function(e,t,i){var r,n={x:t,y:i};e.originalSize=GPixi.getOriginalSize(e),e.anchor||(e.anchor={x:e.pivot.x/e.originalSize.width,y:e.pivot.y/e.originalSize.height}),r=e.anchor,e.position.x+=e.width*n.x-e.width*r.x,e.position.y+=e.height*n.y-e.height*r.y,e instanceof PIXI.Sprite?e.anchor=n:(e.pivot.set(e.originalSize.width*n.x,e.originalSize.height*n.y),e.anchor=n)},textureFromLoader:function(e,t){var i=t||PIXI.loader;if(!i.resources[e])throw"[GPixi Error] No texture was found from the loader. Please double check your texture name.";return i.resources[e].texture},spriteFromTextureName:function(e,t){var i=t||PIXI.loader,r=GPixi.textureFromLoader(e,i);return new PIXI.Sprite(r)},addNewSpriteTo:function(e,t,i,r){var n=r||PIXI.loader,o=GPixi.spriteFromTextureName(i,n);return t[e]=o,t.addChild(o),o},createSpriteWithCallback:function(e,t){var i=new PIXI.Sprite,r=new PIXI.loaders.Loader;return r.add("texture",e),r.once("complete",function(){var e=GPixi.textureFromLoader("texture",r);i.texture=e,t&&t(i)}),r.load(),i},cloneSprite:function(e,t){var i=new PIXI.Sprite(e.texture);return t&&GPixi.copyProperties(i,e),i},copyProperties:function(e,t){this.copyPropertiesOf(t);return this.applyPropertiesTo(e),!0},copyPropertiesOf:function(e){var t={};return e.anchor&&(t.anchor={x:e.anchor.x,y:e.anchor.y}),t.pivot={x:e.pivot.x,y:e.pivot.y},t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height,t.alpha=e.alpha,t.rotation=e.rotation,t.scale=e.scale,t},resetPropertiesOf:function(e){e.anchor&&(e.anchor=new PIXI.Point(0,0)),e.pivot&&(e.pivot=new PIXI.Point(0,0)),e.x=0,e.y=0,e.origialSize&&(e.width=e.origialSize.width),e.origialSize&&(e.height=e.origialSize.height)},applyPropertiesTo:function(e,t,i){var r=t;return r.anchor&&(e.anchor=r.anchor),r.pivot&&(e.pivot=r.pivot),r.x&&(e.x=r.x),r.y&&(e.y=r.y),r.width&&(e.width=r.width),r.height&&(e.height=r.height),r.alpha&&(e.alpha=r.alpha),r.rotation&&(e.rotation=r.rotation),r.scale&&(e.scale=r.scale),!0},getOriginalSize:function(e){var t=e.scale.x,i=e.scale.y,r={};return r.width=e.width/t,r.height=e.height/i,r},createMovieClip:function(e,t,i){for(var r=[],n=Number(t);n<=Number(i);n++){var o=e+n,a=PIXI.loader.resources[o].texture;r.push(a)}return new PIXI.extras.MovieClip(r)},remove:function(e){if(!e.parent)throw"[GPixi Error: remove] This object doesn't have any parents.";e.parent.removeChild(e),e.destroy(),e=null},removeItems:function(e){for(var t=0;t<e.length;t++){var i=e[t];GPixi.remove(i)}},moveToTop:function(e){for(var t=e.parent,i=t.children.length-1,r=0;r<t.children.length;r++)t.children[r].zIndex=r,t.children[r].zIndex>e.zIndex&&(t.children[r].zIndex=parseInt(t.children[r].zIndex)-1);e.zIndex=i,t.children.sort(function(e,t){return e.zIndex=e.zIndex||0,t.zIndex=t.zIndex||0,e.zIndex-t.zIndex})},moveToBottom:function(e){for(var t=e.parent,i=0;i<t.children.length;i++)t.children[i].zIndex=i+1;e.zIndex=0,t.children.sort(function(e,t){return e.zIndex=e.zIndex||0,t.zIndex=t.zIndex||0,e.zIndex-t.zIndex})},moveAboveItem:function(e,t){for(var i=t.parent,r=0;r<i.children.length;r++)i.children[r].zIndex=r;for(r=0;r<i.children.length;r++)r>t.zIndex&&(i.children[r].zIndex+=1);e.zIndex=t.zIndex+1,i.children.sort(function(e,t){return e.zIndex=e.zIndex||0,t.zIndex=t.zIndex||0,e.zIndex-t.zIndex})},moveBelowItem:function(e,t){for(var i=t.parent,r=0;r<i.children.length;r++)i.children[r].zIndex=r;for(r=0;r<i.children.length;r++)r>=t.zIndex&&(i.children[r].zIndex+=1);e.zIndex=t.zIndex-1,i.children.sort(function(e,t){return e.zIndex=e.zIndex||0,t.zIndex=t.zIndex||0,e.zIndex-t.zIndex})},swapIndex:function(e,t){if(e.parent==t.parent){for(var i=e.parent,r=0;r<i.children.length;r++)i.children[r].zIndex=r;var n=t.zIndex;t.zIndex=e.zIndex,e.zIndex=n,i.children.sort(function(e,t){return e.zIndex=e.zIndex||0,t.zIndex=t.zIndex||0,e.zIndex-t.zIndex})}else console.log("[GPixi Error] Children are not in the same parent.")}};function gpixiRepeater(){if(GPixi.enterFrameItems.length>0)for(var e=0;e<GPixi.enterFrameItems.length;e++){if(i=GPixi.enterFrameItems[e]){if(!i.callback)throw"[onEnterFrame] Object doesn't contain any callbacks.";var t={target:i};i.callback(t)}else GArray.remove(i,GPixi.enterFrameItems)}if(GPixi.changedSizeItems.length>0)for(e=0;e<GPixi.changedSizeItems.length;e++){var i;if(!(i=GPixi.changedSizeItems[e]))throw"Object is undefined";t={target:i};if(i.gpixiCurrentSize&&(i.gpixiCurrentSize.width!=i.width||i.gpixiCurrentSize.height!=i.height)){if(i.gpixiCurrentSize.width=i.width,i.gpixiCurrentSize.height=i.height,t.size=i.gpixiCurrentSize,!i.sizeChangedCallback)throw"[onSizeChanged] Object doesn't contain any callbacks.";i.sizeChangedCallback(t)}}requestAnimationFrame(gpixiRepeater)}requestAnimationFrame(gpixiRepeater);