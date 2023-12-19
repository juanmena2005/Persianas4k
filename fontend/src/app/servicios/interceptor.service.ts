import { HttpEvent,HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
requestOption:any = {}

  intercept( req:HttpRequest<any>, next:HttpHandler ):Observable<HttpEvent<any>> {
    console.log(req.method)
    this.requestOption = {
      Headers: new HttpHeaders({

      }),
      withCredentials:true
    }
    const reqclone = req.clone(this.requestOption)
    return next.handle(reqclone)
  }
}
