import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRequestAddComponent } from './client-request-add.component';

describe('ClientRequestAddComponent', () => {
  let component: ClientRequestAddComponent;
  let fixture: ComponentFixture<ClientRequestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientRequestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
