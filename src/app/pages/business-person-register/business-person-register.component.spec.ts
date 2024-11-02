import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPersonRegisterComponent } from './business-person-register.component';

describe('BusinessPersonRegisterComponent', () => {
  let component: BusinessPersonRegisterComponent;
  let fixture: ComponentFixture<BusinessPersonRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPersonRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessPersonRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
