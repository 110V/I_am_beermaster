const imgsJson = './Images/images.json';

let parent = document.querySelector("#cover");

function loadImgs(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', imgsJson, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText).imgs);
        }
    };
    xobj.send(null);
}
//sizing px
const minSize = 250;
const maxSize = 350;

function AddImgElement(src) {
    //init
    let img = document.createElement("img");
    img.src = src;

    //sizing
    let diameter = Math.min(img.naturalWidth, img.naturalHeight);
    diameter = Math.min(Math.max(minSize,diameter),maxSize);
    img.width = diameter;
    img.height = diameter;

    //positioning
    let y = GetNextY(diameter);
    let x = GetX(y)*0.5+25;//20 (0~60) 20
    img.style.translate = "calc("+x + "vw"+" - "+diameter/2+"px)";


    //animation
    img.setAttribute("data-aos","fade-up")
    parent.appendChild(img);
}

loadImgs((imgs) => {
    imgs.forEach(img => {
        AddImgElement("./Images/" + img)
    });
})


//batching
const cycleOffset = 0.005;
let currentY = 0;


function GetNextY(size) {
    const y = currentY;
    currentY += size;
    return y;
}


function GetX(y)
{
    return (Math.sin(cycleOffset*y)+1)*50;
}


