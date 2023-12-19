import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

ngOnInit(): void {
  this.CargarTodas()
}

constructor(private peticion:PeticionService){}

data: any[] = []

  CargarTodas(){

    let post = {
      host:this.peticion.urlLocal,
      path:"/Productos/ListarCliente",
      payload:{
        
  
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {

   console.log(res)
   this.data = res
  
  })
  
  }
}
