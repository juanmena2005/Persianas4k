class Peticion {
mensajes = []
post = function(url,data,callback) {



var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(JSON.parse(this.responseText));
    return callback(JSON.parse(this.responseText))
    
  }
});

xhr.open("POST", url);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(data);
}

Get =function(url,callback){
    var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(JSON.parse(this.responseText));
    return callback(JSON.parse(this.responseText))
    
  }
});

xhr.open("GET", url);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(data);
}

ImprimirMensajes = function(tipo, mensaje) {
var mismensajes = document.getElementById("mismensajes")
this.mensajes.push({tipo:tipo,mensaje:mensaje})

mismensajes.innerHTML = ""
for (let a = 0; a < this.mensajes.length; a++) {
    mismensajes.innerHTML +=  ` <div class="alert alert-${this.mensajes[a].tipo}" role="alert">
    ${this.mensajes[a].mensaje}
  </div> `
    
}

setTimeout(()=> {
this.mensajes.splice(0,1)
mismensajes.innerHTML = ""
for (let a = 0; a < this.mensajes.length; a++) {
    mismensajes.innerHTML +=  ` <div class="alert alert-${this.mensajes[a].tipo}" role="alert">
    ${this.mensajes[a].mensaje}
  </div> `
    
}
},5000)

}

}
var mipeticion = new Peticion 
    var registrar = function(){
        var nombre = document.getElementById("nombre").value  
        var email = document.getElementById("email").value  
        var password = document.getElementById("password").value 
        var apellido = document.getElementById("apellido").value  

        var data =  `nombre=${nombre}&password=${password}&apellido=${apellido}&email=${email}`;
        
        
        mipeticion.post("http://localhost:3000/usuarios/Guardar", data, function(respuesta) {
            console.log(respuesta)
            if(respuesta.state == false) {
            mipeticion.ImprimirMensajes("danger", respuesta.mensaje)
          
            }
            else{
                mipeticion.ImprimirMensajes("success", respuesta.mensaje)
                setTimeout(() => {
                    window.open("http://localhost:3000/login.html")
                },3000)
              
         }   

        })

    }

// var mipeticion  = new Peticion 
// console.log(mipeticion.post("hola"))
// console.log(mipeticion.Get(""))




//"http://localhost:3000/usuarios/Guardar"
//var data = "nombre=mena&password=Jdmr2005&ciudad=cajica&departamento=cajica&email=sefop62243%40cumzle.com";