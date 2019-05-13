'use strict'

const { ipcRenderer } = require('electron')

// Chingadera
ipcRenderer.on('cerial', (event, datos) => {
    let aro = datos.split('|')
    try {
        const pre = document.getElementById(aro[0])
        pre.innerText = aro[1]
    } catch(error) {
        console.log(datos)
    }    
})

// cachador de errores del main
ipcRenderer.on('cerial:error', (event, error) => {
    console.error(error)
})
