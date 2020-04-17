import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarAulaPage } from './editar-aula.page';

describe('EditarAulaPage', () => {
  let component: EditarAulaPage;
  let fixture: ComponentFixture<EditarAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
