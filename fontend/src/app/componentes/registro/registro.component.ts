import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
constructor(private peticion:PeticionService,private msg:MensajesService){}
  nombre:string = ""
  email:string = "" 
  password:string = ""
  apellido:string = ""
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
  }
})

}
}
