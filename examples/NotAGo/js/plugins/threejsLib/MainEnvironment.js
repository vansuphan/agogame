!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).MainEnvironment={})}(this,function(e){"use strict";pMain.container[0];var n,t,i,o,r,a,d,s,c=new THREE.Clock;function u(){}var f=0;function E(){requestAnimationFrame(E);c.getDelta();var e=1/((performance.now()-f)/1e3);if(f=performance.now(),isTestingLocal){var n="";n+=`fps: ${e.toFixed(0)}`+"<br>",$("#debugText").html(n)}i.far=e<40?1500:2e3,d&&d.enabled&&d.update(),r.render(c.getDelta())}e.init=function(){n=new THREE.Scene,(i=new THREE.PerspectiveCamera(36,window.innerWidth/window.innerHeight,1,2e3)).position.set(0,45,120),i.rotation.x=THREE.Math.degToRad(-7),o=new THREE.Object3D,n.add(o),o.add(i),n.background=new THREE.Color(9295861),n.fog=new THREE.Fog(9295861,1500,2e3),n.add(new THREE.AmbientLight(16777215));var e=new THREE.DirectionalLight(16777215,.25);e.position.z=300,n.add(e),s=new THREE.AudioListener,i.add(s),window.addEventListener("touchstart",u),document.addEventListener("click",u),(t=new THREE.WebGLRenderer({antialias:!0})).setPixelRatio(window.devicePixelRatio),t.setSize(sw,sh),pMain.container.append(t.domElement),r=new POSTPROCESSING.EffectComposer(t),(a=new POSTPROCESSING.EffectPass(i,new POSTPROCESSING.BloomEffect({luminanceSmoothing:.05}))).renderToScreen=!0,r.addPass(new POSTPROCESSING.RenderPass(n,i)),r.addPass(a),isTestingLocal&&(d=new THREE.OrbitControls(i,t.domElement))&&d.update(),E()},e.resize=function(){null!=i&&(i.aspect=sw/sh,i.updateProjectionMatrix(),t.setPixelRatio(window.devicePixelRatio),t.setSize(sw,sh)),isTestingLocal&&d&&d.update()},e.setMasterVolume=function(e){s.setMasterVolume(e)},Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperties(e,{scene:{get:function(){return n}},renderer:{get:function(){return t}},camera:{get:function(){return i}},cameraHolder:{get:function(){return o}},controls:{get:function(){return d}},composer:{get:function(){return r}},listener:{get:function(){return s}}})});