/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { PropostaComponent } from '../../../../../../main/webapp/app/entities/proposta/proposta.component';
import { PropostaService } from '../../../../../../main/webapp/app/entities/proposta/proposta.service';
import { Proposta } from '../../../../../../main/webapp/app/entities/proposta/proposta.model';

describe('Component Tests', () => {

    describe('Proposta Management Component', () => {
        let comp: PropostaComponent;
        let fixture: ComponentFixture<PropostaComponent>;
        let service: PropostaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [PropostaComponent],
                providers: [
                    PropostaService
                ]
            })
            .overrideTemplate(PropostaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PropostaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropostaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Proposta(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.propostas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
