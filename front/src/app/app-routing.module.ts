import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  }, 
  {
    path: 'landings',
    loadChildren: () => import('./modules/landings/landings.module').then(m => m.LandingsModule),
  }, 
  {
    path: 'urls',
    loadChildren: () => import('./modules/urls/urls.module').then(m => m.UrlsModule),
    canActivate: [AuthGuard]
  }, 
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }, 
  {
    path: '',
    redirectTo: 'urls',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
