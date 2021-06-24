const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c"
 
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
const CASNVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CASNVAS_WIDTH,CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value
}

function handleModeClick(){
    if(fill){
        fill = false;
        mode.innerText = "FILL"
    }else{
        fill = true;;
        mode.innerText = "PAINT"
    }
}

function handleCanvasClick(){
    if(fill){
    ctx.fillRect(0,0 , CASNVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
  }
  
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}