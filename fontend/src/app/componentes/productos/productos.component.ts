import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

declare var $:any

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  ngOnInit(): void {
    this.CargarTodas()
  }

constructor(private peticion:PeticionService, private msg:MensajesService){}
codigo:string =""
nombre:string =""

descripcion:string =""
precio:string =""
estado:string =""
miid:string =""

data:any[] = []

Nuevo(){
  this.miid = ""
  this.nombre = ""
  this.codigo = ""
  this.descripcion = ""
  this.precio = ""
  this.estado = "1"

  $('#exampleModal').modal('show')
}
Guardar(){

  let post = {
    host:this.peticion.urlLocal,
    path:"/Productos/Guardar",
    payload:{
      nombre:this.nombre,
      codigo:this.codigo,
      descripcion:this.descripcion,
      precio:this.precio,
      estado:this.estado

    }
  }

this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  if(res.state == false){
this.msg.Load("danger",res.mensaje)
  }
  else{
    this.msg.Load("succes",res.mensaje)
    this.CargarTodas()
    $('#exampleModal').modal('hide')
  }
})

}
  CargarTodas(){

    let post = {
      host:this.peticion.urlLocal,
      path:"/Productos/ListarTodos",
      payload:{
        
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {

   console.log(res)
   this.data = res
  
  })
  
  }

  EditarId(id:string){
this.miid = id
    let post = {
      host:this.peticion.urlLocal,
      path:"/Productos/ListarporID",
      payload:{
      _id:id,
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    this.codigo = res[0].codigo
this.nombre = res[0].nombre

this.descripcion = res[0].descripcion
this.precio = res[0].precio
this.estado = res[0].estado
$('#exampleModal').modal('show')

  })
  
  }
  Actualizar(){
    
  let post = {
    host:this.peticion.urlLocal,
    path:"/Productos/Modificar",
    payload:{
      codigo:this.codigo,
      nombre:this.nombre,
      precio:this.precio,
      descripcion:this.descripcion,
      estado:this.estado,
      
      _id:this.miid

    }
  }

this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  if(res.state == false){
this.msg.Load("danger",res.mensaje)
  }
  else{
    this.msg.Load("success",res.mensaje)
    this.CargarTodas()
    $('#exampleModal').modal('hide')
  }
  })
}

Eliminar(){
  
    let post = {
      host:this.peticion.urlLocal,
      path:"/Productos/Eliminar",
      payload:{
      _id:this.miid,
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    

$('#exampleModal').modal('hide')
this.CargarTodas()

})
}
}
