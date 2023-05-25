import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFormComponent } from './sys-form.component';

describe('SysFormComponent', () => {
  let component: SysFormComponent;
  let fixture: ComponentFixture<SysFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
