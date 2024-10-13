import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsSigninSignupComponent } from './tabs-signin-signup.component';

describe('TabsSigninSignupComponent', () => {
  let component: TabsSigninSignupComponent;
  let fixture: ComponentFixture<TabsSigninSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsSigninSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsSigninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
