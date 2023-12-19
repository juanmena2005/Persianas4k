import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../../servicios/peticion.service';

@Component({
  selector: 'app-productos-detalle',
  templateUrl: './productos-detalle.component.html',
  styleUrl: './productos-detalle.component.css'
})
export class ProductosDetalleComponent implements OnInit{
  data:any[] = []
  constructor(private actroute:ActivatedRoute, private peticion:PeticionService){}
  ngOnInit(): void {
    console.log(this.actroute.snapshot.params["id"])
   this.CargarID(this.actroute.snapshot.params["id"])
  }
  CargarID(id:string){

    let post = {
      host:this.peticion.urlLocal,
      path:"/Productos/ListarporID",
      payload:{
        
  _id:id
      }
    }
  
  this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {

   console.log(res)
   this.data = res
  
  })
  
  }
}
