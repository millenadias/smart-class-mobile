import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TurmaPage } from './turma.page';

describe('TurmaPage', () => {
  let component: TurmaPage;
  let fixture: ComponentFixture<TurmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
