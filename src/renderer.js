'use strict'

const { ipcRenderer } = require('electron')

var dst;
var tmp;
var ti;
var ldr;

// Chingadera
ipcRenderer.on('cerial', (event, datos) => {

    let aro = datos.split('|')
    try {
        const pre = document.getElementById(aro[0])
        pre.innerText = aro[1]

        switch(aro[0]){
          case "Distancia":
			let limo = 80;
            dst = document.querySelector(".gauge--2 .semi-circle--mask");
            dst.style.transform = `rotate(${(180*Math.min(aro[1], limo))/(limo)}deg) translate3d(0, 0, 0)`;
          break;
          case "Temperatura":
            tmp = document.querySelector(".gauge--3 .semi-circle--mask");
            tmp.style.transform = `rotate(${(180*aro[1])/(100)}deg) translate3d(0, 0, 0)`;
          break;
          case "Tilt":
            if(aro[1] == 27){
              ti = document.querySelector(".color");
              ti.style.boxShadow = `0px 6px #27AE60`;
              ti.style.background = `#2ECC71`;
              document.getElementById("textoTilt").innerHTML = "Encendido";
            }else{
              ti = document.querySelector(".color");
              ti.style.boxShadow = `0px 6px #C0392B`;
              ti.style.background = `#E74C3C`;
              document.getElementById("textoTilt").innerHTML = "Apagado";
            }
          break;
          case "LDR":
            ldr = document.querySelector(".dot");
          if(aro[1] <= 25){
            ldr.style.boxShadow = `0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FFED00, 0 0 20px #FFED00, 0 0 50px #FFED00, 0 0 60px #FFED00, 0 0 70px #FFED00`;
          }else if(aro[1] > 25 && aro[1] <= 50){
            ldr.style.boxShadow = `0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FFF142, 0 0 30px #FFF142, 0 0 60px #FFF142, 0 0 70px #FFF142, 0 0 80px #FFF142`;
          }else if(aro[1] > 50 && aro[1] <= 75){
            ldr.style.boxShadow = `0 0 30px #fff, 0 0 40px #fff, 0 0 50px #FFF57F, 0 0 40px #FFF57F, 0 0 70px #FFF57F, 0 0 80px #FFF57F, 0 0 90px #FFF57F`;
          }else{
            ldr.style.boxShadow = `0 0 40px #fff, 0 0 50px #fff, 0 0 60px #FFF9B2, 0 0 50px #FFF9B2, 0 0 80px #FFF9B2, 0 0 90px #FFF9B2, 0 0 100px #FFF9B2`;
          }
          break;
        }
    } catch(error) {
        console.log(datos)
    }
})

// cachador de errores del main
ipcRenderer.on('cerial:error', (event, error) => {
    console.error(error)
})
