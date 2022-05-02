const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = 'image1.png';



//var imgData = ctx.createImageData(100, 100);

image1.addEventListener('load', function(){
    ctx.drawImage(image1, 0, 0);
})
// var i;
// for (i = 0; i < imgData.data.length; i += 4) {
//     imgData.data[i + 0] = 255;
//     imgData.data[i + 1] = 0;
//     imgData.data[i + 2] = 0;
//     imgData.data[i + 3] = 255;
// }

// ctx.putImageData(imgData, 10, 10);