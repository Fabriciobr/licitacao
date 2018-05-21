/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { LoteLicitacaoComponent } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.component';
import { LoteLicitacaoService } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.service';
import { LoteLicitacao } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.model';

describe('Component Tests', () => {

    describe('LoteLicitacao Management Component', () => {
        let comp: LoteLicitacaoComponent;
        let fixture: ComponentFixture<LoteLicitacaoComponent>;
        let service: LoteLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LoteLicitacaoComponent],
                providers: [
                    LoteLicitacaoService
                ]
            })
            .overrideTemplate(LoteLicitacaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoteLicitacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoteLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LoteLicitacao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.loteLicitacaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
