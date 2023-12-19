const mongoose = require("mongoose")

var productosModel = {}
const Schema = mongoose.Schema

var ProductosSchema = new Schema({
  codigo:Number,
  nombre:String,
  descripcion:String,
  precio:String,
  estado:String
  
})


const Mymodel = mongoose.model("productos",ProductosSchema)



productosModel.Guardar = function(post, callback){

   

    const instancia = new Mymodel
    instancia.codigo = post.codigo
    instancia.nombre = post.nombre
    instancia.descripcion= post.descripcion
    instancia.precio = post.precio
  
    instancia.estado = post.estado

    instancia.save().then((res) => {
      console.log(res)
      return callback({state:true,mensaje:"se almaceno"})
    }).catch((error) =>{
      return callback({ state: false, mensaje:"error" + error})
    })

    
}
productosModel.listar=function(post,callback){
    Mymodel.find({},{}).then((res) => {

      return callback(res)
    })
    
}
productosModel.listarCliente=function(post,callback){
  Mymodel.find({ estado: '1' },{}).then((res) => {

    return callback(res)
  })
  
}

productosModel.modificar=function(post,callback){

  Mymodel.findByIdAndUpdate(post._id,{
    nombre: post.nombre,
    descripcion: post.descripcion,
    precio: post.precio,
    estado: post.estado
  
  }).then((res) => {
    console.log(res)
    callback({state: true, mensaje:"se actualizo trodo"})
  }).catch((error) => {
    callback({ state: false, mensaje:"no se encruntra id"})
  })
    
  
}



productosModel.eliminar =function(post,callback){

  Mymodel.findByIdAndDelete(post._id).then((res) => {
    callback({state: true, message: 'Producto eliminado correctamente' });
  }).catch((error) => {
    callback({ error: 'Producto no encontrado',error:error });
  })
    
}

productosModel.listarporID =function(post,callback){
  Mymodel.find({_id: post._id},{}).then((res) => {

    return callback(res)
  })

   
}

productosModel.ExisteCodigo = function(post, callback){

  Mymodel.find({codigo:post.codigo},{}).then((res) => {
    console.log(res.length)
    if (res.length ==0){
      return callback({ existe: "no"})

    }else{
      return callback({existe: "si"})
    }
  })

}
module.exports.productosModel = productosModel