import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from '../shared/mat.module';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ItemDetailsComponent
  ],
  exports: [
    HomeComponent,
    ItemDetailsComponent
  ]
})
export class HomeModule { }
