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

var Mihost = "http://localhost:3000"

    var mipeticion = new Peticion 
        var IniciarSesion = function(){
             
            var email = document.getElementById("email").value  
            var password = document.getElementById("password").value 
            
    if(email == undefined || email == null || email == "" ){
        mipeticion.ImprimirMensajes("danger", "el campo email es obligatorio - frontEnd")
        return false
    }
    
    if(password == undefined || password == null || password == "" ){
        mipeticion.ImprimirMensajes("danger", "el campo password es obligatorio - frontEnd")
        return false
    }
            
            var post = {
                host: Mihost, 
                path:"/usuarios/Login",
                payload:`password=${password}&email=${email}`
            }
            mipeticion.post(post.host + post.path, post.payload, function(respuesta) {
                console.log(respuesta)
                if(respuesta.state == false) {
                mipeticion.ImprimirMensajes("danger", respuesta.mensaje)
              
                }
                else{
                    mipeticion.ImprimirMensajes("success", respuesta.mensaje)
                    //window.open("http://localhost:3000/login.html")
             }   
    
            })
    
        }
    
    // var mipeticion  = new Peticion 
    // console.log(mipeticion.post("hola"))
    // console.log(mipeticion.Get(""))
    
    
    
    
    //"http://localhost:3000/usuarios/Guardar"
    //var data = "nombre=mena&password=Jdmr2005&ciudad=cajica&departamento=cajica&email=sefop62243%40cumzle.com";