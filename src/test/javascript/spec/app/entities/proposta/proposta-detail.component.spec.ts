/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { PropostaDetailComponent } from '../../../../../../main/webapp/app/entities/proposta/proposta-detail.component';
import { PropostaService } from '../../../../../../main/webapp/app/entities/proposta/proposta.service';
import { Proposta } from '../../../../../../main/webapp/app/entities/proposta/proposta.model';

describe('Component Tests', () => {

    describe('Proposta Management Detail Component', () => {
        let comp: PropostaDetailComponent;
        let fixture: ComponentFixture<PropostaDetailComponent>;
        let service: PropostaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [PropostaDetailComponent],
                providers: [
                    PropostaService
                ]
            })
            .overrideTemplate(PropostaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PropostaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropostaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Proposta(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.proposta).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
