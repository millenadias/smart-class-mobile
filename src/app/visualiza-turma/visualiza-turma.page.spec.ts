import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizaTurmaPage } from './visualiza-turma.page';

describe('VisualizaTurmaPage', () => {
  let component: VisualizaTurmaPage;
  let fixture: ComponentFixture<VisualizaTurmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizaTurmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizaTurmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
