import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhComponent } from './wh.component';

describe('WhComponent', () => {
  let component: WhComponent;
  let fixture: ComponentFixture<WhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
