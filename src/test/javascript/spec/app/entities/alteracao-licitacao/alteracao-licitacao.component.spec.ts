/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { AlteracaoLicitacaoComponent } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.component';
import { AlteracaoLicitacaoService } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.service';
import { AlteracaoLicitacao } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.model';

describe('Component Tests', () => {

    describe('AlteracaoLicitacao Management Component', () => {
        let comp: AlteracaoLicitacaoComponent;
        let fixture: ComponentFixture<AlteracaoLicitacaoComponent>;
        let service: AlteracaoLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AlteracaoLicitacaoComponent],
                providers: [
                    AlteracaoLicitacaoService
                ]
            })
            .overrideTemplate(AlteracaoLicitacaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlteracaoLicitacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlteracaoLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AlteracaoLicitacao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alteracaoLicitacaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
