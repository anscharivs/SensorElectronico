# SensorElectronico

Este es un programa que utiliza [Electron](https://electronjs.org/) para leer datos desde el serial de un Arduino.

Para utilizarlo, primero hay que clonar éste repo e instalar [Node.js](https://nodejs.org/).  Después hay que instalar todo lo necesario con 

```npm install```

Los usuarios de Windows probablemente quieran modificar la línea que dice ```const portName = '/dev/ttyACM0';``` y poner el nombre del puerto de Arduino ahí.

Una vez hecho lo anterior, se puede iniciar el programa con 

```npm start```
