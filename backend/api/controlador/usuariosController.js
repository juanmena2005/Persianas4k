

const usuariosModel= require("../modelos/usuariosModel.js").usuariosModel
const usuariosController={}

usuariosController.Guardar = function(request,response){
    try{
        const post ={
        
            
            
             nombre: request.body.nombre,
             email: request.body.email,
             password: request.body.password,
            apellido: request.body.apellido,
        }
        
                console.log(post)
              
                 
                  if (post.nombre == undefined || post.nombre == null || post.nombre ==""){
                    response.json({ state: false, mensaje:"el nombre es obligatorio"})
                    return false
                  
                  }
                  if (post.email == undefined || post.email == null || post.email ==""){
                    response.json({ state: false, mensaje:"el email es obligatorio"})
                    return false
                  
                  }

                  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.email) == false){
                    response.json({ state: false, mensaje: "el campo email no es un correo valido" })
                    return false
                }

                  if (post.password == undefined || post.password == null || post.password ==""){
                    response.json({ state: false, mensaje:"el password es obligatorio"})
                    return false
                  
                  }
                  if (post.apellido == undefined || post.apellido == null || post.apellido ==""){
                    response.json({ state: false, mensaje:"elapellido es obligatorio"})
                    return false
                  
                  }
                  
                  if(post.password.lenght > 13){
                    response.json({ state: false, mensaje:"el passwor no puede tener mas de 13 caracteres"})
                    return false
                  
                  }
                  if(post.password.lenght > 5){
                    response.json({ state: false, mensaje:"el passwor no puede tener menos de 5 caracteres"})
                    return false
                  
                  }

                  post.password = sha256(post.password + config.secretEncrypt)
                   
                  usuariosModel.ExisteEmail(post, function(res){
                    if(res.existe == "no"){

                      post.micodigo = "AC" + Math.floor((Math.random() * (99999 - 10000) + 10000))

                      usuariosModel.Guardar(post, function(respuesta){

                        if(respuesta.state == true){

                          //enciar corre3o 
                          var nodemailer = require("nodemailer")
                          var trasporter = nodemailer.createTransport ({

                            host:"smtp.gmail.com",
                            port: 587,
                            requireTLS:true,
                            secure:false,
                            auth:{
                              user: config.userGmail,
                              pass: config.passGmail
                            }

                          })
                          
                          var mailOptions = {

                            from:"persianas4k@gmail.com",
                            to:post.email,
                            subject:"verifica tu cuenta",
                            html: ` <div style="font-family: Arial, sans-serif;line-height: 1.6;background-color: #4CAF50;margin: 0;padding: 42px;">

                            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Activación de cuenta</h1>
                                <p>Hola,</p>
                                <p>Gracias por registrarte en nuestro sitio. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                                <p><a style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: #ffffff; text-decoration: none; border-radius: 3px;" href="http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}">Activar cuenta ${post.micodigo}</a></p>
                                <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
                                <p>http://localhost:4200/activarcuenta/${post.email}/${post.micodigo}</</p>
                                <p>Si no has creado una cuenta en nuestro sitio, puedes ignorar este correo electrónico.</p>
                                <p>Saludos,</p>
                                <p>El equipo de [NOMBRE_DE_LA_EMPRESA]</p>
                            </div>
                    
                        </div>`

                        //<p>http://localhost:3000/activarcuenta/${post.email}/${post.micodigo}</p>
                        //href="http://localhost:3000/activarcuenta/${post.email}/${post.micodigo}">Activar cuenta ${post.micodigo}</a></p>
                      
                          }

                          trasporter.sendMail(mailOptions, (error,info) =>{
                            if(error){
                              console.log(error)
                              response.json(error)

                            }
                            else{
                              response.json({state:true,mensaje:"Revisa tu correo"})
                            }
                          })
                        } else{
                          response.json(respuesta)
                        }

          
                       })
                    }else{
                      response.json({state:false,mensaje:"este correo ya existe"})
                    }
                  }) 

                
                
              }catch (error){
                  response.json({state: false, mensaje:"algo paso"})
                  console.log(error)
                  
              }
              
        }
usuariosController.listar = function(request,response){
    usuariosModel.listar(null,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.modificar = function(request,response){

    const post ={
      _id: request.body._id,
     nombre : request.body.nombre,
     rol : request.body.rol,
     apellido : request.body.apellido,

     
    }
   
    if (post._id == undefined ||post._id == null || post._id ==""){
      response. json({ state: false, mensaje:"el campo _id es obligatorio"})
      return false
    }
   
    if (post.nombre == undefined || post.nombre == null || post.nombre ==""){
      response. json({ state: false, mensaje:"el nombre es obligatorio"})
      return false
    }
    if (post.rol == undefined || post.rol == null || post.rol ==""){
        response. json({ state: false, mensaje:"el rol es obligatorio"})
        return false
      }
  usuariosModel.modificar(post, function(respuesta){
    response.json(respuesta)
  })
  
}

usuariosController.eliminar = function(request,response){
    
    const post ={
        _id: request.body._id
    }
    if (post._id == undefined ||post._id == null || post._id ==""){
        response. json({ state: false, mensaje:"el campo id es obligatorio"})
        return false
      }
    usuariosModel.eliminar(post,function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.ListarporID = function(request,response){
    const post ={
        _id: request.body._id
    }
    
    if (post._id == undefined ||post._id == null || post._id ==""){
        response. json({ state: false, mensaje:"el campo _id es obligatorio"})
        return false
      }
      
      usuariosModel.listarporID(post,function(respuesta){
        response.json(respuesta)
    })
  
  
    
}

usuariosController.Login = function(request,response){
    var post = {
        email: request.body.email,
        password: request.body.password
    }
    
    if (post.email == undefined ||post.email == null || post.email ==""){
        response. json({ state: false, mensaje:"el campo email es obligatorio"})
        return false
      }
      if (post.password == undefined ||post.password == null || post.password ==""){
        response. json({ state: false, mensaje:"el campo password es obligatorio"})
        return false
      }
      post.password = sha256(post.password + config.secretEncrypt )

      usuariosModel.EmailActivo(post, function(estado) {
        if(estado.state == false){
            response. json({ state: false, mensaje:"el email no es valido"})
        return false
        } else {
            if(estado.res[0].estado == 0){
                response. json({ state: false, mensaje:"la cuenta no es correcta"})
                return false
            } else {
                
      usuariosModel.Login(post, function(respuesta) {
        if (respuesta.state == true) {


request.session.nombre = respuesta.res[0].nombre
request.session.rol = respuesta.res[0].rol
request.session._id = respuesta.res[0]._id


            response.json({ state: true, mensaje:"Bienvenido " + respuesta.res[0].nombre })
        } else { 

            response.json({ state: false, mensaje:"Denegado" })
        } 

       
              })
            }
        }
      })
      
  
  
    
}

usuariosController.activarcuenta = function(request,response){
  var post = {
    email:request.body.email,
    codigo:request.body.codigo,

  }


  if (post.email == undefined ||post.email == null || post.email ==""){
    response. json({ state: false, mensaje:"el campo email es obligatorio"})
    return false
  }
  if (post.codigo == undefined ||post.codigo == null || post.codigo ==""){
    response. json({ state: false, mensaje:"el campo codigo es obligatorio"})
    return false
  }

usuariosModel.BuscarCodigoActivacion(post,function(respuesta){
  if(respuesta.state == false){
    console.log({ state:false, mensaje: "email o codigo invalido"})
    response.json({ state: false, mensaje: "email o codigo invalido"})
    return false
  } else{
    console.log(respuesta)
    if (respuesta.estado == 1){
     //response.json({ state: true, mensaje: "su cuenta ya se encontraba activa"})
     response.send('<h1 style=""width:100%; heigth:500px; background:red;>su cuenta ya esta activada<h1>')
    }
    else{
      usuariosModel.CambianEstado(post,function(resestado){
        if(resestado.state == true){
          response.json({ state: true, mensaje: "listo, inicia sesion"})
        }
        else{
          response.json({ state: false, mensaje: "se presento un error"})
        }
      })
    }
  }
})

}

module.exports.usuariosController = usuariosController