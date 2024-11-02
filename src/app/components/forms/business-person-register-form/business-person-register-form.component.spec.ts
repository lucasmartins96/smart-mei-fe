import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPersonRegisterFormComponent } from './business-person-register-form.component';

describe('BusinessPersonRegisterFormComponent', () => {
  let component: BusinessPersonRegisterFormComponent;
  let fixture: ComponentFixture<BusinessPersonRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPersonRegisterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPersonRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
