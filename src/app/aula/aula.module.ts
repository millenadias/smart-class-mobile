import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AulaPageRoutingModule } from './aula-routing.module';

import { AulaPage } from './aula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AulaPageRoutingModule
  ],
  declarations: [AulaPage]
})
export class AulaPageModule {}
