import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: async () => (await import('./home/home.module')).HomeModule
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
