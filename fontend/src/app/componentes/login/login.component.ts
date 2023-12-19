import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private peticion:PeticionService,private msg:MensajesService, private router:Router){}
  
  email:string = "" 
  password:string = ""

iniciarsesion(){

  let post = {
    host:this.peticion.urlLocal,
    path:"/usuarios/Login",
    payload:{
     
      email:this.email,
      password:this.password,
      

    }
  }

this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  if(res.state == false){
this.msg.Load("danger",res.mensaje)
  }
  else{
    this.msg.Load("success",res.mensaje)
    this.router.navigate(["/dashboard"])
  }
})

}
}
