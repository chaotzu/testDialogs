/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        document.getElementById('alert').addEventListener(
            'click',
            this.alerta,
            false
        );
        document.getElementById('confirm').addEventListener(
            'click',
            this.confirma,
            false
        );
        document.getElementById('promp').addEventListener(
            'click',
            this.prompfunc,
            false
        );
        document.getElementById('beep').addEventListener(
            'click',
            this.beepfunc,
            false
        );
        window.addEventListener("batterystatus", onBatteryStatus, false);
        function onBatteryStatus(status) {
            console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
            navigator.notification.confirm("Level: " + status.level + " isPlugged: " + status.isPlugged);
        }

        //Device
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            console.log(device.cordova);
            navigator.notification.confirm("Cordova: " + device.cordova + " modelo: " + device.model + " uuid: " + device.uuid + " plataforma: " + device.platform + " version: " + device.version + " manufacturer: " + device.manufacturer + " serial: " + device.serial);
        }


        //MEdia
        var myMedia = new Media("http://www.elongsound.com/images/mp3/pajaros_noctunos_en_la_lejania_1.mp3");
        myMedia.play();
        



        //Geolocation
        var onSuccess = function(position) {
            navigator.notification.confirm('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
        };
    
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            navigator.notification.confirm('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
/*        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    },
    alerta: function (){
        navigator.notification.alert("Esto es un mensaje", alertDismissed, 'Mensaje', 'Cerrar');
        function alertDismissed(){
            console.log("Ventana cerrada");
        }
    },
    confirma: function(){
        navigator.notification.confirm("Esto es un mensaje");
    },
    prompfunc: function(){
        navigator.notification.prompt("Estos es un mensaje", "Mensaje dos");
    },
    beepfunc: function(){
        navigator.notification.beep(2);
    }
};

app.initialize();