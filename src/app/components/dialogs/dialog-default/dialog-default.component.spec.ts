import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDefaultComponent } from './dialog-default.component';

describe('DialogDefaultComponent', () => {
  let component: DialogDefaultComponent;
  let fixture: ComponentFixture<DialogDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
