import * as PIXI from 'pixi.js'

let type = 'WebGL'
if(!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

PIXI.utils.sayHello(type)
PIXI.utils.sayHello(type)

//Aliases
let Application = PIXI.Application

let app = new Application({width: 256, height: 256})

let loader = app.loader
let resources = app.loader.resources
let Sprite = PIXI.Sprite

document.body.appendChild(app.view)

//Get shader code as a string
var shaderCode = document.getElementById('shader').innerHTML
//Create our Pixi filter using our custom shader code
// var simpleShader = new PIXI.AbstractFilter('',shaderCode);

app.renderer.backgroundColor = 0x061639;
app.renderer.autoResize = true
app.renderer.resize(800, 800)
console.log('ho')

loader
  .add('examples/images/cat.png')
  .add('examples/images/izzy.jpeg')
  .load(setup);

function setup(){
  let cat = new Sprite(
    loader.resources['examples/images/cat.png'].texture
  )

  let izzy = new Sprite(
    loader.resources['examples/images/izzy.jpeg'].texture
  )

  izzy.x = app.renderer.width / 2
  izzy.y = app.renderer.height / 2

  resizeAspectRatio(300, izzy)
  izzy.anchor.set(0.5)

  app.stage.addChild(cat)
  app.stage.addChild(izzy)

  izzy.filters = [simpleShader]
}

// animate(app.stage)

// function animate(stage) {
//   requestAnimationFrame(animate)

//   renderer.render(stage)
// }

function resizeAspectRatio(targetWidth, sprite) {
  let aspectRatio = sprite.height / sprite.width

  let newHeight = targetWidth * aspectRatio

  sprite.width = targetWidth
  sprite.height = newHeight
}