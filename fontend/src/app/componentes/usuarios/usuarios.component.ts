import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';


declare var $:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  ngOnInit(): void {
    this.CargarTodas()
  }

constructor(private peticion:PeticionService, private msg:MensajesService){}
nombre:string =""
email:string =""
password:string =""
apellido:string =""
rol:string ="2"
miid:string =""

data:any[] = []

Nuevo(){
  this.miid = ""
  this.nombre =""
  this.apellido =""
  this.email =""
  this.rol ="2"

  $('#exampleModal').modal('show')
}
Registrar(){

  let post = {
    host:this.peticion.urlLocal,
    path:"/usuarios/Guardar",
    payload:{
      nombre:this.nombre,
      email:this.email,
      password:this.password,
      apellido:this.apellido

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
  CargarTodas(){

    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/Listar",
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
      path:"/usuarios/ListarporID",
      payload:{
      _id:id,
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    
this.nombre = res[0].nombre
this.rol = res[0].rol
this.email = res[0].email
this.apellido = res[0].apellido
$('#exampleModal').modal('show')

  })
  
  }
  Actualizar(){
    
  let post = {
    host:this.peticion.urlLocal,
    path:"/usuarios/Modificar",
    payload:{
      nombre:this.nombre,
      rol:this.rol,
      apellido:this.apellido,
      _id:this.miid

    }
  }

this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  if(res.state == false){
this.msg.Load("danger",res.mensaje)
  }
  else{ this.msg.Load("success",res.mensaje)
    this.msg.Load("succes",res.mensaje)
    this.CargarTodas()
    $('#exampleModal').modal('hide')
  }
  })
}

Eliminar(){
  
    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/Eliminar",
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
