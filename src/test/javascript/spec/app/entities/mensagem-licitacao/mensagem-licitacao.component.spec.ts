/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { MensagemLicitacaoComponent } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.component';
import { MensagemLicitacaoService } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.service';
import { MensagemLicitacao } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.model';

describe('Component Tests', () => {

    describe('MensagemLicitacao Management Component', () => {
        let comp: MensagemLicitacaoComponent;
        let fixture: ComponentFixture<MensagemLicitacaoComponent>;
        let service: MensagemLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [MensagemLicitacaoComponent],
                providers: [
                    MensagemLicitacaoService
                ]
            })
            .overrideTemplate(MensagemLicitacaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MensagemLicitacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensagemLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MensagemLicitacao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mensagemLicitacaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
