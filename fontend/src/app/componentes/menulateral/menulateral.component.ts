
import { state } from '@angular/animations';
import { PeticionService } from '../../servicios/peticion.service';
import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../servicios/mensajes.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit{
  ngOnInit(): void {
    this.State()
  }
  
  constructor(private peticion:PeticionService, private msg:MensajesService, private router:Router){}
nombre:string = "Cargando..."
rol:string = "cargando..."

  State(){

    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/state",
      payload:{
        
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {

    console.log(res)
    this.nombre = res.nombre
    this.rol = res.rol
  
  })
  
  }

  logout(){

    let post = {
      host:this.peticion.urlLocal,
      path:"/usuarios/logout",
      payload:{
        
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {

    console.log(res)
    if(res.state == true){
      this.msg.Load("success", res.mensaje)
      this.router.navigate(["/login"])
    }
  
  })
  
  }


}
