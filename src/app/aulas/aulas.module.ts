import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AulasPageRoutingModule } from './aulas-routing.module';

import { AulasPage } from './aulas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AulasPageRoutingModule
  ],
  declarations: [AulasPage]
})
export class AulasPageModule {}
