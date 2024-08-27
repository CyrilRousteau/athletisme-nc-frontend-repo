import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletismeComponent } from './athletisme.component';

describe('AthletismeComponent', () => {
  let component: AthletismeComponent;
  let fixture: ComponentFixture<AthletismeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletismeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
