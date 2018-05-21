/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { AlteracaoLicitacaoDetailComponent } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao-detail.component';
import { AlteracaoLicitacaoService } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.service';
import { AlteracaoLicitacao } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.model';

describe('Component Tests', () => {

    describe('AlteracaoLicitacao Management Detail Component', () => {
        let comp: AlteracaoLicitacaoDetailComponent;
        let fixture: ComponentFixture<AlteracaoLicitacaoDetailComponent>;
        let service: AlteracaoLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AlteracaoLicitacaoDetailComponent],
                providers: [
                    AlteracaoLicitacaoService
                ]
            })
            .overrideTemplate(AlteracaoLicitacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlteracaoLicitacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlteracaoLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AlteracaoLicitacao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alteracaoLicitacao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
