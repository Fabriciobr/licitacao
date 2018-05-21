/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { TempoRandomicoComponent } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.component';
import { TempoRandomicoService } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.service';
import { TempoRandomico } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.model';

describe('Component Tests', () => {

    describe('TempoRandomico Management Component', () => {
        let comp: TempoRandomicoComponent;
        let fixture: ComponentFixture<TempoRandomicoComponent>;
        let service: TempoRandomicoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [TempoRandomicoComponent],
                providers: [
                    TempoRandomicoService
                ]
            })
            .overrideTemplate(TempoRandomicoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempoRandomicoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempoRandomicoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TempoRandomico(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tempoRandomicos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
