import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-activarcuenta',
  templateUrl: './activarcuenta.component.html',
  styleUrls: ['./activarcuenta.component.css']
})
export class ActivarcuentaComponent implements OnInit {
  constructor(
    private actroute: ActivatedRoute, private peticion:PeticionService, private msg: MensajesService, private router: Router) {}
  email:string = "" 
  codigo:string = ""

  ngOnInit() {
  this.email = this.actroute.snapshot.params["email"]
  this.codigo = this.actroute.snapshot.params["codigo"]
  }

Activar(){

  
  let post = {
    host:this.peticion.urlLocal,
    path:"/activarcuenta",
    payload:{
      
      email:this.email,
      codigo:this.codigo,
     

    }
  }

this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
  console.log(res)
  if(res.state == false){
this.msg.Load("danger",res.mensaje)
  }
  else{
    this.msg.Load("success",res.mensaje)
    this.router.navigate(["/login"])
  }
})
}



}
