var ww = window.innerWidth,
    wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);
renderer.setClearColor(0xffffff);

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 40, 70);

var camera = new THREE.PerspectiveCamera(45, ww/wh, 1, 100);

var ambient = new THREE.AmbientLight( 0xffffff,0.5 );
scene.add( ambient );

var light = new THREE.PointLight( 0xffffff, 3, 200 );
scene.add(light);

var mouse = new THREE.Vector2(0.3,0.3);
window.addEventListener("mousemove", function(e){
  mouse.y = (1 - e.clientY / wh)*0.5;
});
window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

var curve, camera2, helper;
function createTube(){
  var points = [];
  var rings = 400;
  for(var i=0;i<rings;i++){
    var x = noise.simplex2(i*0.008, 0.1)*150;
    var y = noise.simplex2(i*0.008, 0.1)*150;
    var z = i*3;
    points.push(new THREE.Vector3(x,y,z));
  }
  curve = new THREE.CatmullRomCurve3(points);

  var geometry = new THREE.TubeGeometry( curve, rings, 2, 20, false );
  var color = new THREE.Color(0xff0000)
  for(i=0;i<geometry.faces.length;i++){
    var index = Math.abs(noise.simplex2(geometry.vertices[geometry.faces[i].a].z*0.02,2) );
    geometry.faces[i].color = new THREE.Color("hsl("+(index*100+180)+",50%,50%)");
  }
  
  var material = new THREE.MeshLambertMaterial({
    side : THREE.BackSide,
    color:0xfffff0,
    vertexColors: THREE.FaceColors
  });
  var mesh = new THREE.Mesh( geometry, material );
  scene.add(mesh);
}


var interval = 0.00001;
var progress = 0;
var rotate = 0;
function render(a){
  requestAnimationFrame(render);
  if(progress+interval>=1){
    progress = 0;
  }
  interval = mouse.y*0.001;
  var p1 = curve.getPointAt(progress);
  var p2 = curve.getPointAt(progress + interval);
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);
  if(progress+0.04 < 1){
    var p3 = curve.getPointAt(progress + 0.04);
    light.position.set(p3.x,p3.y,p3.z);
  }
  
  progress += interval;
  
  camera.rotation.z = rotate;
  rotate+=(interval*50);
  
  renderer.render(scene, camera);
  
}

createTube();
requestAnimationFrame(render);