# 바닐라 JS로 그림판 만들기



### #0 INTRODUCTION

---

##### Requirements

- chrome

- visual studio code
- git

  

### #1 SETUP + STYLES

---

> 그림판 기본 뼈대 만들기



##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css" />
    <title>Paintjs</title>
</head>
<body>
    <canvas id="jsCanvas" class="canvas"></canvas>
    <div class="controls">
        <div class="controls__range">
            <input type="range" id="jsRange" min="0.1" max="5" value="2.5" step="0.1" />
        </div>
        <div class="controls__btns">
            <button id="jsMode">Fill</button>
            <button id="jsSave">Save</button>
        </div>
        <div class="controls__colors" id="jsColors">
            <div class="controls__color" style="background-color: #2c2c2c;"></div>
            <div class="controls__color" style="background-color: white;"></div>
            <div class="controls__color" style="background-color: #ff3b30;"></div>
            <div class="controls__color" style="background-color: #ff9500;"></div>
            <div class="controls__color" style="background-color: #ffcc00;"></div>
            <div class="controls__color" style="background-color: #4cd963;"></div>
            <div class="controls__color" style="background-color: #5ac8fa;"></div>
            <div class="controls__color" style="background-color: #0579ff;"></div>
            <div class="controls__color" style="background-color: #5856d6;"></div>
        </div>
    </div>
    <scripts src="app.js"></scripts>
</body>
</html>
```



##### style.css

```css
@import "reset.css";

body {
  background-color: #f6f9fc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
}

.canvas {
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls .controls__range {
  margin-bottom: 30px;
}

.controls .controls__btns {
  margin-bottom: 30px;
}

.controls__btns button {
  all: unset;
  cursor: pointer;
  background-color: white;
  padding: 5px 0px;
  width: 80px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
}

.controls__btns button:active {
  transform: scale(0.98);
}
.controls .controls__colors {
  display: flex;
}

.controls__colors .controls__color {
  width: 40px;
  height: 40px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
```



##### reset.css

```css
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
```



### #2 PAINTJS

---

>



#### 1. Canvas Events

- event 세팅



##### app.js

```js
const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

function onMouseDown(event) {
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}
```



#### 2. 2D Context

- canvas는 context를 갖고 있는 html의 요소고, 그 요소들 안에서 픽셀들을 다룰 수 있다.
- ctx로 선 그리기! => 뭔가가 좀 이상한걸, 그건 다음 시간에~!



##### app.js

```js
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    startPainting()
}

function onMouseUp(event) {
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown",  startPainting);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}
```

