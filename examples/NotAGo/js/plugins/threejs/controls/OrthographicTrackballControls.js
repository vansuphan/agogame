THREE.OrthographicTrackballControls=function(e,t){var o=this,n={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=e,this.domElement=void 0!==t?t:document,this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.radius=0,this.rotateSpeed=1,this.zoomSpeed=1.2,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.noRoll=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.keys=[65,83,68],this.target=new THREE.Vector3;var s=!0,i=n.NONE,c=n.NONE,a=new THREE.Vector3,r=new THREE.Vector3,h=new THREE.Vector3,p=new THREE.Vector2,d=new THREE.Vector2,u=0,E=0,m=new THREE.Vector2,g=new THREE.Vector2;this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone(),this.left0=this.object.left,this.right0=this.object.right,this.top0=this.object.top,this.bottom0=this.object.bottom;var l={type:"change"},v={type:"start"},b={type:"end"};this.handleResize=function(){if(this.domElement===document)this.screen.left=0,this.screen.top=0,this.screen.width=window.innerWidth,this.screen.height=window.innerHeight;else{var e=this.domElement.getBoundingClientRect(),t=this.domElement.ownerDocument.documentElement;this.screen.left=e.left+window.pageXOffset-t.clientLeft,this.screen.top=e.top+window.pageYOffset-t.clientTop,this.screen.width=e.width,this.screen.height=e.height}this.radius=.5*Math.min(this.screen.width,this.screen.height),this.left0=this.object.left,this.right0=this.object.right,this.top0=this.object.top,this.bottom0=this.object.bottom};var y,w,f,T,O,j,R=(y=new THREE.Vector2,function(e,t){return y.set((e-o.screen.left)/o.screen.width,(t-o.screen.top)/o.screen.height),y}),L=function(){var e=new THREE.Vector3,t=new THREE.Vector3,n=new THREE.Vector3;return function(s,i){n.set((s-.5*o.screen.width-o.screen.left)/o.radius,(.5*o.screen.height+o.screen.top-i)/o.radius,0);var c=n.length();return o.noRoll?c<Math.SQRT1_2?n.z=Math.sqrt(1-c*c):n.z=.5/c:c>1?n.normalize():n.z=Math.sqrt(1-c*c),a.copy(o.object.position).sub(o.target),e.copy(o.object.up).setLength(n.y),e.add(t.copy(o.object.up).cross(a).setLength(n.x)),e.add(a.setLength(n.z)),e}}();function N(e){!1!==o.enabled&&(window.removeEventListener("keydown",N),c=i,i===n.NONE&&(e.keyCode!==o.keys[n.ROTATE]||o.noRotate?e.keyCode!==o.keys[n.ZOOM]||o.noZoom?e.keyCode!==o.keys[n.PAN]||o.noPan||(i=n.PAN):i=n.ZOOM:i=n.ROTATE))}function H(e){!1!==o.enabled&&(i=c,window.addEventListener("keydown",N,!1))}function k(e){!1!==o.enabled&&(e.preventDefault(),e.stopPropagation(),i===n.NONE&&(i=e.button),i!==n.ROTATE||o.noRotate?i!==n.ZOOM||o.noZoom?i!==n.PAN||o.noPan||(m.copy(R(e.pageX,e.pageY)),g.copy(m)):(p.copy(R(e.pageX,e.pageY)),d.copy(p)):(r.copy(L(e.pageX,e.pageY)),h.copy(r)),document.addEventListener("mousemove",A,!1),document.addEventListener("mouseup",M,!1),o.dispatchEvent(v))}function A(e){!1!==o.enabled&&(e.preventDefault(),e.stopPropagation(),i!==n.ROTATE||o.noRotate?i!==n.ZOOM||o.noZoom?i!==n.PAN||o.noPan||g.copy(R(e.pageX,e.pageY)):d.copy(R(e.pageX,e.pageY)):h.copy(L(e.pageX,e.pageY)))}function M(e){!1!==o.enabled&&(e.preventDefault(),e.stopPropagation(),i=n.NONE,document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",M),o.dispatchEvent(b))}function V(e){!1!==o.enabled&&(e.preventDefault(),e.stopPropagation(),p.y+=.01*e.deltaY,o.dispatchEvent(v),o.dispatchEvent(b))}function Y(e){if(!1!==o.enabled){switch(e.touches.length){case 1:i=n.TOUCH_ROTATE,r.copy(L(e.touches[0].pageX,e.touches[0].pageY)),h.copy(r);break;case 2:i=n.TOUCH_ZOOM_PAN;var t=e.touches[0].pageX-e.touches[1].pageX,s=e.touches[0].pageY-e.touches[1].pageY;E=u=Math.sqrt(t*t+s*s);var c=(e.touches[0].pageX+e.touches[1].pageX)/2,a=(e.touches[0].pageY+e.touches[1].pageY)/2;m.copy(R(c,a)),g.copy(m);break;default:i=n.NONE}o.dispatchEvent(v)}}function X(e){if(!1!==o.enabled)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:h.copy(L(e.touches[0].pageX,e.touches[0].pageY));break;case 2:var t=e.touches[0].pageX-e.touches[1].pageX,s=e.touches[0].pageY-e.touches[1].pageY;E=Math.sqrt(t*t+s*s);var c=(e.touches[0].pageX+e.touches[1].pageX)/2,a=(e.touches[0].pageY+e.touches[1].pageY)/2;g.copy(R(c,a));break;default:i=n.NONE}}function C(e){if(!1!==o.enabled){switch(e.touches.length){case 1:h.copy(L(e.touches[0].pageX,e.touches[0].pageY)),r.copy(h);break;case 2:u=E=0;var t=(e.touches[0].pageX+e.touches[1].pageX)/2,s=(e.touches[0].pageY+e.touches[1].pageY)/2;g.copy(R(t,s)),m.copy(g)}i=n.NONE,o.dispatchEvent(b)}}function P(e){e.preventDefault()}this.rotateCamera=(w=new THREE.Vector3,f=new THREE.Quaternion,function(){var e=Math.acos(r.dot(h)/r.length()/h.length());e&&(w.crossVectors(r,h).normalize(),e*=o.rotateSpeed,f.setFromAxisAngle(w,-e),a.applyQuaternion(f),o.object.up.applyQuaternion(f),h.applyQuaternion(f),o.staticMoving?r.copy(h):(f.setFromAxisAngle(w,e*(o.dynamicDampingFactor-1)),r.applyQuaternion(f)),s=!0)}),this.zoomCamera=function(){if(i===n.TOUCH_ZOOM_PAN){var e=E/u;u=E,o.object.zoom*=e,s=!0}else{e=1+(d.y-p.y)*o.zoomSpeed;Math.abs(e-1)>1e-6&&e>0&&(o.object.zoom/=e,o.staticMoving?p.copy(d):p.y+=(d.y-p.y)*this.dynamicDampingFactor,s=!0)}},this.panCamera=(T=new THREE.Vector2,O=new THREE.Vector3,j=new THREE.Vector3,function(){if(T.copy(g).sub(m),T.lengthSq()){var e=(o.object.right-o.object.left)/o.object.zoom,t=(o.object.top-o.object.bottom)/o.object.zoom;T.x*=e,T.y*=t,j.copy(a).cross(o.object.up).setLength(T.x),j.add(O.copy(o.object.up).setLength(T.y)),o.object.position.add(j),o.target.add(j),o.staticMoving?m.copy(g):m.add(T.subVectors(g,m).multiplyScalar(o.dynamicDampingFactor)),s=!0}}),this.update=function(){a.subVectors(o.object.position,o.target),o.noRotate||o.rotateCamera(),o.noZoom||(o.zoomCamera(),s&&o.object.updateProjectionMatrix()),o.noPan||o.panCamera(),o.object.position.addVectors(o.target,a),o.object.lookAt(o.target),s&&(o.dispatchEvent(l),s=!1)},this.reset=function(){i=n.NONE,c=n.NONE,o.target.copy(o.target0),o.object.position.copy(o.position0),o.object.up.copy(o.up0),a.subVectors(o.object.position,o.target),o.object.left=o.left0,o.object.right=o.right0,o.object.top=o.top0,o.object.bottom=o.bottom0,o.object.lookAt(o.target),o.dispatchEvent(l),s=!1},this.dispose=function(){this.domElement.removeEventListener("contextmenu",P,!1),this.domElement.removeEventListener("mousedown",k,!1),this.domElement.removeEventListener("wheel",V,!1),this.domElement.removeEventListener("touchstart",Y,!1),this.domElement.removeEventListener("touchend",C,!1),this.domElement.removeEventListener("touchmove",X,!1),document.removeEventListener("mousemove",A,!1),document.removeEventListener("mouseup",M,!1),window.removeEventListener("keydown",N,!1),window.removeEventListener("keyup",H,!1)},this.domElement.addEventListener("contextmenu",P,!1),this.domElement.addEventListener("mousedown",k,!1),this.domElement.addEventListener("wheel",V,!1),this.domElement.addEventListener("touchstart",Y,!1),this.domElement.addEventListener("touchend",C,!1),this.domElement.addEventListener("touchmove",X,!1),window.addEventListener("keydown",N,!1),window.addEventListener("keyup",H,!1),this.handleResize(),this.update()},THREE.OrthographicTrackballControls.prototype=Object.create(THREE.EventDispatcher.prototype),THREE.OrthographicTrackballControls.prototype.constructor=THREE.OrthographicTrackballControls;