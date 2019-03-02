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