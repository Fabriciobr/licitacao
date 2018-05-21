/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { DisputaDetailComponent } from '../../../../../../main/webapp/app/entities/disputa/disputa-detail.component';
import { DisputaService } from '../../../../../../main/webapp/app/entities/disputa/disputa.service';
import { Disputa } from '../../../../../../main/webapp/app/entities/disputa/disputa.model';

describe('Component Tests', () => {

    describe('Disputa Management Detail Component', () => {
        let comp: DisputaDetailComponent;
        let fixture: ComponentFixture<DisputaDetailComponent>;
        let service: DisputaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [DisputaDetailComponent],
                providers: [
                    DisputaService
                ]
            })
            .overrideTemplate(DisputaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisputaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisputaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Disputa(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.disputa).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
