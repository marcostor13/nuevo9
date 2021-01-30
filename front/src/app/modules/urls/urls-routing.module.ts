import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'generator',
    loadChildren: () => import('./pages/generator/generator.module').then(m => m.GeneratorModule)
  },  
  {
    path: '',
    redirectTo: 'generator',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlsRoutingModule { }
