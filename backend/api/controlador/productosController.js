
const productosModel= require("../modelos/productosModel.js").productosModel
const productosController={}

productosController.Guardar = function(request,response){
    try{
        const post ={
        
            
             codigo: request.body.codigo,
             nombre: request.body.nombre,
             descripcion: request.body.descripcion,
            precio: request.body.precio,
            estado: request.body.estado
        }
        
                console.log(post)
              
                  if (post.codigo == undefined || post.codigo == null || post.codigo ==""){
                    response.json({ state: false, mensaje:"el  codigo es obligatorio"})
                    return false
               
                  }
                  if (post.nombre == undefined || post.nombre == null || post.nombre ==""){
                    response.json({ state: false, mensaje:"el nombre es obligatorio"})
                    return false
                  }
                  if (post.descripcion == undefined || post.descripcion == null || post.descripcion ==""){
                    response.json({ state: false, mensaje:"el  descripcion  es obligatorio"})
                    return false
                  }
                
                  if (post.precio == undefined || post.precio == null || post.precio ==""){
                    response.json({ state: false, mensaje:"el  precio es obligatorio"})
                    return false
                  }
                  if (post.estado == undefined || post.estado == null || post.estado ==""){
                    response.json({ state: false, mensaje:"el  estado es obligatorio"})
                    return false
                  }
              
                  productosModel.ExisteCodigo(post,function(res){
                    if(res.existe == "no"){
                      productosModel.Guardar(post,function(respuesta){
                        response.json(respuesta)
                       })
                    }else{
                      response.json({state:false,mensaje:"este codigo ya existe"})
                    }
                  }) 


                  
                
              }catch (error){
                  response.json({state: false, mensaje:"algo paso"})
                  console.log(error)
                  
              }
              
        }
productosController.listar = function(request,response){
    productosModel.listar(null,function(respuesta){
        response.json(respuesta)
    })
}
productosController.listarCliente = function(request,response){
  productosModel.listarCliente(null,function(respuesta){
      response.json(respuesta)
  })
}

productosController.modificar = function(request,response){

    const post ={
      _id: request.body._id,
     nombre : request.body.nombre,
     codigo : request.body.codigo,
     descripcion : request.body.descripcion,
     precio : request.body.precio,
     estado : request.body.estado
    }
   
    if (post._id == undefined ||post._id == null || post._id ==""){
      response. json({ state: false, mensaje:"el campo _id es obligatorio"})
      return false
    }
    if (post.codigo == undefined ||post.codigo == null || post.codigo ==""){
      response. json({ state: false, mensaje:"el campo codigo es obligatorio"})
      return false
    }
    if (post.nombre == undefined || post.nombre == null || post.nombre ==""){
      response. json({ state: false, mensaje:"el nombre es obligatorio"})
      return false
    }
    if (post.descripcion == undefined || post.descripcion== null || post.descripcion ==""){
      response. json({ state: false, mensaje:"el campo descripcion  es obligatorio"})
      return false
    }
  
    if (post.precio == undefined || post.precio == null || post.precio ==""){
      response. json({ state: false, mensaje:"el campo precio es obligatorio"})
      return false
    }
    if (post.estado == undefined || post.estado == null || post.estado ==""){
      response. json({ state: false, mensaje:"el campo estado es obligatorio"})
      return false
    }
  
  productosModel.modificar(post, function(respuesta){
    response.json(respuesta)
  })
  
}

productosController.eliminar = function(request,response){
    
    const post ={
        _id: request.body._id
    }
    if (post._id == undefined ||post._id == null || post._id ==""){
        response. json({ state: false, mensaje:"el campo id es obligatorio"})
        return false
      }
    productosModel.eliminar(post,function(respuesta){
        response.json(respuesta)
    })
}
productosController.ListarporID = function(request,response){
  const post ={
      _id: request.body._id
  }
  
  if (post._id == undefined ||post._id == null || post._id ==""){
      response. json({ state: false, mensaje:"el campo _id es obligatorio"})
      return false
    }
    
    productosModel.listarporID(post,function(respuesta){
      response.json(respuesta)
  })


  
}

productosController.ListarporCodigo = function(request,response){
    const post ={
        _id: request.body._id
    }
    
    if (post._id == undefined ||post._id == null || post._id ==""){
        response. json({ state: false, mensaje:"el campo _id es obligatorio"})
        return false
      }
      
      productosModel.ListarporCodigo(post,function(respuesta){
        response.json(respuesta)
    })
  
  
    
}

productosController.SubirArchivo = function(request,response){
  
  var post = {
    nombre:request.params.nombre
  }

  if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
    response.json({state:false,mensaje:"campo nombre obligatorio"})
    return(false)
  }

  const storage = multer.diskStorage({

    destination: (req,file,cb) => {
      cb(null,"servicios/")
    },
    filename: (request,file,cb) => {
      cb(null,post.nombre + '.png')
    }
  })

  //filtrado
const filefilter = (request,file,cb) => {
  const extensionesSoportadas =[".jpg", ".jpeg", ".png", ".gif"]

  var ext = path.extname(file.origninalname).toLocaleLowerCase()

  if(extensionesSoportadas.includes(ext) == true){
    //aceptar archivo 
    cb(null,true)

  }
  else{
    cb({mensaje:"Aceptamos solo formatos" + extensionesSoportadas.join(" | ")},false)
  }

}

const upload = multer({storage,filefilter}).single("archivo")

upload(request,response, function(err){
  if(err){
    console.log(err)
    response.join({state:false,mensaje:err.mensaje})
  }
  else{
    console.log("todo esta correcto")
    response.json({state:true,mensaje:"Archivo cargado"})
  }
})

}

module.exports.productosController = productosController