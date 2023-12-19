const { response, request } = require("express");

var obligasesion = function(request,response,next){
   var idusuario = request.session._id

   if(idusuario == undefined || idusuario == null || idusuario == "" ){
      response.json({state:false,mensaje:"Debe iniciar sesion "})
   }
   else{
      next()
   }
}


var soloAdmin = function(request,response,next){
   var rol = request.session.rol

   if( rol != 1 ){
      response.json({state:false,mensaje:"NO ERES ADMINISTRADOR"})
   }
   else{
      next()
   }
}

const productosController = require("./api/controlador/productosController.js").productosController

app.post('/Productos/Guardar', obligasesion, soloAdmin, function(request, response) {
  productosController.Guardar(request,response)
 });
  
app.post('/Productos/Modificar', obligasesion, soloAdmin, function(request, response) {
   productosController.modificar(request,response)
});
  

app.post('/Productos/Eliminar', obligasesion, soloAdmin, function (request, response) {
    productosController.eliminar(request,response)
});
  
app.post('/Productos/ListarTodos', (request, response) => {
   productosController.listar(request,response)
});

app.post('/Productos/ListarCliente', (request, response) => {
   productosController.listarCliente(request,response)
});
  
app.post('/Productos/ListarporID',  function(request, response) {
   productosController.ListarporID(request,response)
});



app.post('/Productos/SubirArchivo/:nombre', function(request, response) {
   productosController.SubirArchivo(request,response)
});



const usuariosController = require("./api/controlador/usuariosController.js").usuariosController

app.post('/usuarios/Guardar', function(request, response) {
  usuariosController.Guardar(request,response)
 });
  
app.post('/usuarios/Modificar',  function(request, response) {
   usuariosController.modificar(request,response)
});
  

app.post('/usuarios/Eliminar',  function (request, response) {
    usuariosController.eliminar(request,response)
});
  
app.post ('/usuarios/Listar', function(request, response) {
   usuariosController.listar(request,response)
});
  
app.post('/usuarios/ListarporID',  function(request, response) {
   usuariosController.ListarporID(request, response)
});


app.post('/usuarios/Login', function(request, response) { 
   usuariosController.Login(request, response)
});

app.post('/activarcuenta',function(request, response) {
   usuariosController.activarcuenta(request,response)
  });

  app.post('/usuarios/state', function(request, response) { 
  response.json(request.session)
});

app.post('/usuarios/logout', function(request, response) { 
   request.session.destroy()
   response.json({state: true, mensaje:"se cerro sesion"})
 });