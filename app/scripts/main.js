import * as PIXI from 'pixi.js'

let type = 'WebGL'
if(!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

PIXI.utils.sayHello(type)
PIXI.utils.sayHello(type)

let app = new PIXI.Application({width: 256, height: 256})
document.body.appendChild(app.view)

app.renderer.backgroundColor = 0x061639;
app.renderer.autoResize = true
app.renderer.resize(512, 512)
console.log('hello')