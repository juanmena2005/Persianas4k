import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient ) { }



  urlLocal:string = "http://localhost:3000"


  Post(url:string,data:{}){

let promise = new Promise((resolve, reject) =>{

this.http.post(url,data)
.toPromise()
.then((res:any) => {
  console.log(res)
  resolve(res)
}).catch((error) =>{
  reject(error)
})


})

return promise
  }

  get(url:string){

    let promise = new Promise((resolve, reject) =>{
    
    this.http.get(url)
    .toPromise()
    .then((res:any) => {
      console.log(res)
      resolve(res)
    }).catch((error) =>{
      reject(error)
    })
    
    
    })
    
    return promise
      }




      
}
