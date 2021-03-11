To scaffold the webapp:
Create a new folder for your project.
Navigate into the folder.
Type: yo webapp
Install other stuff:
```
npm install --save-dev gulp-sourcemaps browserify babelify vinyl-buffer vinyl-source-stream
```
In your gulpfile.js, replace the existing scripts() function with:
```
function scripts() {
  const b = browserify({
    entries: 'app/scripts/main.js',
    transform: babelify,
    debug: true
  })
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe($.plumber())
    .pipe(buffer())
    .pipe($.if(!isProd, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(!isProd, $.sourcemaps.write('.')))
    .pipe(dest('.tmp/scripts'))
    .pipe(server.reload({stream: true}));
};
```
In your app/index.html file, and replace this line:
```
<script src="scripts/main.js"></script>
```
with this line:
```
<script src="scripts/bundle.js"></script>
```
To run: ``` npm start ```

# pixi-playground
a testbed for pixi.js stuff

```
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
```

