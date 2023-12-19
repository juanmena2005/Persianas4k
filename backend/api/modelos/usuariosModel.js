const mongoose = require("mongoose")

var usuariosModel = {}
const Schema = mongoose.Schema

var usuariosSchema = new Schema({
 
  nombre:String,
  email:String,
  password:String,
 apellido:String,
  rol:Number,
  codigoact:String,
  estado:Number
  
})


const Mymodel = mongoose.model("usuarios",usuariosSchema)



usuariosModel.Guardar = function(post, callback){

   

    const instancia = new Mymodel
    
    instancia.nombre= post.nombre
    instancia.email = post.email
    instancia.password = post.password
    instancia.apellido = post.apellido
    instancia.rol = 2
    instancia.codigoact = post.micodigo
    instancia.estado = 0
    

    instancia.save().then((res) => {
      console.log(res)
      return callback({state:true,mensaje:"se almaceno"})
    }).catch((error) =>{
      return callback({ state: false, mensaje:"error" + error})
    })

    
}
usuariosModel.listar=function(post,callback){
    Mymodel.find({},{password:0, codigoact:0}).then((res) => {

      return callback(res)
    })
    
}

usuariosModel.modificar=function(post,callback){

  Mymodel.findByIdAndUpdate(post._id,{
    nombre: post.nombre,
    apellido: post.apellido,
    rol: post.rol
   
  
  }).then((res) => {
    console.log(res)
    callback({state: true, mensaje:"se actualizo trodo"})
  }).catch((error) => {
    callback({ state: false, mensaje:"no se encruntra id",error:error })
  })
    
  
}



usuariosModel.eliminar =function(post,callback){

  Mymodel.findByIdAndDelete(post._id).then((res) => {
    callback({state: true, message: 'usuariosto eliminado correctamente' });
  }).catch((error) => {
    callback({ error: 'usuariosto no encontrado',error:error });
  })
    
}

usuariosModel.listarporID =function(post,callback){
  Mymodel.find({_id: post._id},{password:0, codigoact:0}).then((res) => {

    return callback(res)
  })

   
}

usuariosModel.Login =function(post,callback){
    Mymodel.find({email:post.email, password:post.password},{password:0, codigoact:0}).then((res) => {
  

        console.log(res)
        if(res.length == 0){

            return callback({state: false})
            
        }
        else{
            
            return callback({state: true, res: res })
        }

    //   return callback(res)
    })
  
     
  }

usuariosModel.ExisteEmail = function(post, callback){

  Mymodel.find({email:post.email},{}).then((res) => {
    console.log(res.length)
    if (res.length ==0){
      return callback({ existe: "no"})

    }else{
      return callback({existe: "si"})
    }
  })

}

usuariosModel.EmailActivo = function(post,callback){
    Mymodel.find({email: post.email},{estado:1}).then((res) => {
        console.log(res)
        if(res.length > 0){
            return callback({state:true, res:res })
        }
        else{
            return callback({state:false})
        }
    })
}
usuariosModel.CambianEstado=function(post, callback){

  Mymodel.findOneAndUpdate({email:post.email, codigoact:post.codigo}, {
    estado:1
  
  }).then((res) => {
    console.log(res)
    callback({state: true})
  }).catch((error) => {
    callback({ state: false })
  })
    
  
}


usuariosModel.BuscarCodigoActivacion =function(post,callback){
  Mymodel.find({ email: post.email, codigoact: post.codigo }, { estado: 1 }).then((res) => {


      console.log(res)
      if(res.length == 0){

          return callback({state: false})
      }
      else{
          
          return callback({state: true, estado: res[0].estado })
      }

  //   return callback(res)
  })

   
}
module.exports.usuariosModel = usuariosModel