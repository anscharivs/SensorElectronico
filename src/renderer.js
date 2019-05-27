'use strict'

const { ipcRenderer, remote } = require('electron');
const porto = remote.getCurrentWindow().porto;

var dst;
var tmp;
var ti;
var ldr;

ipcRenderer.on('cerial', (event, datos) => {

    let aro = datos.split('|')
    try {
        const pre = document.getElementById(aro[0])
        pre.innerText = aro[1]

        switch(aro[0]){
          case "LDR":
            ldr = document.querySelector(".dot");
            if(aro[1] <= 5){
              ldr.style.boxShadow = `0 0 10px #000, 0 0 20px #000, 0 0 30px #6A6A6A, 0 0 20px #6A6A6A, 0 0 50px #6A6A6A, 0 0 60px #6A6A6A, 0 0 70px #6A6A6A`;
              ldr.style.backgroundColor = `#6A6A6A`;
          }else if(aro[1] > 5 && aro[1] <= 25){
            ldr.style.boxShadow = `0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FFED00, 0 0 20px #FFED00, 0 0 50px #FFED00, 0 0 60px #FFED00, 0 0 70px #FFED00`;
            ldr.style.backgroundColor = `#FFF9B2`;
          }else if(aro[1] > 25 && aro[1] <= 50){
            ldr.style.boxShadow = `0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FFF142, 0 0 30px #FFF142, 0 0 60px #FFF142, 0 0 70px #FFF142, 0 0 80px #FFF142`;
            ldr.style.backgroundColor = `#FFF9B2`;
          }else if(aro[1] > 50 && aro[1] <= 75){
            ldr.style.boxShadow = `0 0 30px #fff, 0 0 40px #fff, 0 0 50px #FFF57F, 0 0 40px #FFF57F, 0 0 70px #FFF57F, 0 0 80px #FFF57F, 0 0 90px #FFF57F`;
            ldr.style.backgroundColor = `#FFF9B2`;
          }else{
            ldr.style.boxShadow = `0 0 40px #fff, 0 0 50px #fff, 0 0 60px #FFF9B2, 0 0 50px #FFF9B2, 0 0 80px #FFF9B2, 0 0 90px #FFF9B2, 0 0 100px #FFF9B2`;
            ldr.style.backgroundColor = `#FFF9B2`;
          }
          break;
        }
    } catch(error) {
        console.log(datos)
    }
})

//Caso de error
ipcRenderer.on('cerial:error', (event, error) => {
    console.error(error)
})

//Valor del slider
const slid = document.getElementById('slider');
slid.addEventListener('change', e => {
    let val = e.target.value;
    let ans = '>' + val.toString().padStart(4, "0");
	porto.write(ans);
})
