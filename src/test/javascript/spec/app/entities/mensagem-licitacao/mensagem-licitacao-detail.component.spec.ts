/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { MensagemLicitacaoDetailComponent } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao-detail.component';
import { MensagemLicitacaoService } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.service';
import { MensagemLicitacao } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.model';

describe('Component Tests', () => {

    describe('MensagemLicitacao Management Detail Component', () => {
        let comp: MensagemLicitacaoDetailComponent;
        let fixture: ComponentFixture<MensagemLicitacaoDetailComponent>;
        let service: MensagemLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [MensagemLicitacaoDetailComponent],
                providers: [
                    MensagemLicitacaoService
                ]
            })
            .overrideTemplate(MensagemLicitacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MensagemLicitacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensagemLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MensagemLicitacao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mensagemLicitacao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
