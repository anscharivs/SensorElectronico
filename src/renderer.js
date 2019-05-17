'use strict'

const { ipcRenderer, remote } = require('electron');
const foco = document.querySelector('input[name=cbox]');
const porto = remote.getCurrentWindow().porto;

// Recibidor
ipcRenderer.on('cerial', (event, datos) => {
	foco.checked = datos == 'ENC';
})

// cachador de errores del main
ipcRenderer.on('cerial:error', (event, error) => {
    console.error(error)
})

foco.addEventListener('change', e => {
	porto.write(e.target.checked?  'ENC' : 'APA');
})