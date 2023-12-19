import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ProductosDetalleComponent } from './componentes/productos-detalle/productos-detalle.component';

const routes: Routes = [
  {path:"",component:HomeComponent,pathMatch:"full"},
  {path:"login",component:LoginComponent,pathMatch:"full"},
  {path:"registro",component:RegistroComponent,pathMatch:"full"},
  {path:"dashboard",component:DashboardComponent,pathMatch:"full"},
  {path:"usuarios",component:UsuariosComponent,pathMatch:"full"},
  {path:"productos",component:ProductosComponent,pathMatch:"full"},
  {path:"productos_detalle/:id",component:ProductosDetalleComponent,pathMatch:"full"},
  {path:"activarcuenta/:email/:codigo",component:ActivarcuentaComponent,pathMatch:"full"},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
