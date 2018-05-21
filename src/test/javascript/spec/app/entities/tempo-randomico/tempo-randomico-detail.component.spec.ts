/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { TempoRandomicoDetailComponent } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico-detail.component';
import { TempoRandomicoService } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.service';
import { TempoRandomico } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.model';

describe('Component Tests', () => {

    describe('TempoRandomico Management Detail Component', () => {
        let comp: TempoRandomicoDetailComponent;
        let fixture: ComponentFixture<TempoRandomicoDetailComponent>;
        let service: TempoRandomicoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [TempoRandomicoDetailComponent],
                providers: [
                    TempoRandomicoService
                ]
            })
            .overrideTemplate(TempoRandomicoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempoRandomicoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempoRandomicoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TempoRandomico(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tempoRandomico).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
