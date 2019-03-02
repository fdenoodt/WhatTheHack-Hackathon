//import https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js in html

/*var qrcode = new QRCode("test", {
    text: "http://jindo.dev.naver.com/collie",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
var qrcode = new QRCode("QRcode");

function makeCode () { 
    if(firebase.auth().currentUser.uid != null)     
    var value = firebase.auth().currentUser.uid;

    var elcode = document.getElementById("qrcode");
    
    if (!value) {
        alert("Input a text");
        //elText.focus();
        return;
    }
    
    qrcode.makeCode(value);
}


/*
$("#qrcode").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });
    */

   var qrcode = new QRCode("qrcode");

   function makeCode () {      
       var value = firebase.auth().currentUser.uid;
       
       if (value == null) {
           alert("Input a text");
           //elText.focus();
           return;
       }
       
       qrcode.makeCode(value);
   }
   
   makeCode();
   
   /*$("#text").
       on("blur", function () {
           makeCode();
       }).
       on("keydown", function (e) {
           if (e.keyCode == 13) {
               makeCode();
           }
       });*/