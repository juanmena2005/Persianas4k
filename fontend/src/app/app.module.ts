import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { MenulateralComponent } from './componentes/menulateral/menulateral.component';
import { MenusuperiorComponent } from './componentes/menusuperior/menusuperior.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { InterceptorService } from './servicios/interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { WhComponent } from './componentes/wh/wh.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosDetalleComponent } from './componentes/productos-detalle/productos-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent,
    RegistroComponent,
    MensajesComponent,
    ActivarcuentaComponent,
    DashboardComponent,
    MenulateralComponent,
    MenusuperiorComponent,
    UsuariosComponent,
    WhComponent,
    ProductosComponent,
    ProductosDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
