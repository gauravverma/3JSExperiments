var startTime = Date.now();
var container;
var camera, scene, renderer, stats;
var cube;

// ## Initialize everything
function init() {
if( Detector.webgl ){
        renderer = new THREE.WebGLRenderer({
          antialias   : true, // to get smoother output
          preserveDrawingBuffer : true  // to allow screenshot
        });
        //renderer.setClearColor( 0xBBBBBB, 1 );
        renderer.setSize(window.innerWidth, window.innerHeight);
      }else{
        Detector.addGetWebGLMessage();
        return true;
      }
      document.getElementById('container').appendChild(renderer.domElement);

      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild( stats.domElement );

      // create a scene
      scene = new THREE.Scene();
      var light = new THREE.AmbientLight( 0x404040 ); // soft white light
      scene.add( light );

      // put a camera in the scene
      camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
      camera.position.set(0, 0, 5);
      scene.add(camera);

      // create a camera contol
      //cameraControls  = new THREEx.DragPanControls(camera);
      cameraControls  = new THREE.OrbitControls(camera);

      // transparently support window resize
      THREEx.WindowResize.bind(renderer, camera);
      // allow 'p' to make screenshot
      THREEx.Screenshot.bindKey(renderer);
      // allow 'f' to go fullscreen where this feature is supported
      if( THREEx.FullScreen.available() ){
        THREEx.FullScreen.bindKey();
      }

      var geometry = new THREE.CubeGeometry(1,1,1);
      var material = new THREE.MeshNormalMaterial() ;
      cube = new THREE.Mesh(geometry, material);
      cube.rotation.x = 0.4;
      cube.rotation.y = 0.4;
      scene.add(cube);
}
// animation loop
    function animate() {

      // loop on request animation loop
      // - it has to be at the begining of the function
      // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
      requestAnimationFrame( animate );

      // do the render
      render();

      // update stats
      stats.update();
    }

    // render the scene
    function render() {

      // update camera controls
      cameraControls.update();
      // actually render the scene
      renderer.render( scene, camera );
    }
    init();
    animate();
