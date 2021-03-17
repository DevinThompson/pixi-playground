import * as PIXI from "pixi.js";
import * as THREE from "three";

initThree();
// initPixi()

function initThree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  animate();
}
function initPixi() {
  var uniforms = {};
  uniforms.time = {
    type: "f",
    value: 1.0,
  };
  uniforms.rOffset = {
    type: "f",
    value: 0.5,
  };
  uniforms.gOffset = {
    type: "f",
    value: 0.7,
  };
  uniforms.bOffset = {
    type: "f",
    value: 0.1,
  };
  uniforms.uScale = {
    type: "f",
    value: 0.8,
  };
  uniforms.uYrot = {
    type: "f",
    value: 0.01,
  };
  uniforms.dotSize = {
    type: "f",
    value: 1.1,
  };
  uniforms.gridRotation = {
    type: "f",
    value: 45,
  };
  uniforms.uDims = {
    type: "v2",
    value: [],
  };
  uniforms.u_resolution = {
    type: "v2v",
    value: [],
  };
  uniforms.u_width = {
    type: "f",
    value: 800,
  };
  uniforms.u_height = {
    type: "f",
    value: 800,
  };

  console.log(uniforms.time.value);

  // Autodetect and create the renderer
  var renderer = PIXI.autoDetectRenderer(800, 800);
  PIXI.utils.sayHello();
  // Set the background color of the renderer to a baby-blue'ish color
  renderer.backgroundColor = 0x3498db;
  // Append the renderer to the body of the page
  document.body.appendChild(renderer.view);
  // Create the main stage for your display objects
  var stage = new PIXI.Container();
  // Add our image as a sprite
  var goose = new PIXI.Sprite.from("https://i.imgur.com/XR1WQ8K.png");
  var doggo = PIXI.Sprite.from("https://i.imgur.com/KKXUU9r.jpeg");
  // Set the anchor in the center of our sprite
  doggo.anchor.x = 0.5;
  doggo.anchor.y = 0.5;
  doggo.x = renderer.width / 2;
  doggo.y = renderer.width / 2;
  doggo.anchor.set(0.5);
  resizeAspectRatio(1000, doggo);
  // uDims = [doggo.width, doggo.height]
  let u_resolution = [doggo.width, doggo.height];
  // Position our goose in the center of the renderer
  goose.position.x = renderer.width / 2;
  goose.position.y = renderer.height / 2;
  // Add the goose to the stage
  stage.addChild(goose);
  stage.addChild(doggo);

  // const loader = PIXI.Loader.shared;
  var app = new PIXI.Application();
  if (app.renderer.gl.getExtension("OES_standard_derivatives")) {
    console.log("GL_OES_standard_derivatives is supported!");
    app.renderer.gl.getExtension("OES_standard_derivatives");
    app.renderer.gl.getExtension("EXT_texture_filter_anisotropic");
    app.renderer.gl.getExtension("EXT_shader_texture_lod");
  }
  app.loader.add(["./scripts/halftone.frag"]);
  app.loader.load(() => {
    // var shaderCode = document.getElementById("shader").innerHTML
    var shaderCode = app.loader.resources["./scripts/halftone.frag"].data;
    //Create our Pixi filter using our custom shader code
    var simpleShader = new PIXI.Filter("", shaderCode, uniforms);
    //Apply it to our object
    doggo.filters = [simpleShader];
    // Start animating
    animate();
    var shouldAnimateForward = true;
    function animate() {
      // requestAnimationFrame(animate);
      // Rotate our goose clockwise
      // goose.rotation += 0.1;
      if (uniforms.time.value >= 1) {
        shouldAnimateForward = false;
      } else if (uniforms.time.value <= 0) {
        shouldAnimateForward = true;
      }
      if (shouldAnimateForward) {
        uniforms.time.value += 0.01;
      } else {
        uniforms.time.value -= 0.01;
      }
      let i = uniforms.time.value;
      // simpleShader.uniforms.time.value = 0.0
      // uniforms.time.value += 0.1;
      // console.log(uniforms.time.value)
      // Rotate our goose counter-clockwise
      // goose.rotation -= 0.1;
      // Render our container
      renderer.render(stage);
      requestAnimationFrame(animate);
    }
  });
  function resizeAspectRatio(targetWidth, sprite) {
    let aspectRatio = sprite.height / sprite.width;
    let newHeight = targetWidth * aspectRatio;
    sprite.width = targetWidth;
    sprite.height = newHeight;
  }
}
