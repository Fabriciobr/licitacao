/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { LoteLicitacaoDetailComponent } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao-detail.component';
import { LoteLicitacaoService } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.service';
import { LoteLicitacao } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.model';

describe('Component Tests', () => {

    describe('LoteLicitacao Management Detail Component', () => {
        let comp: LoteLicitacaoDetailComponent;
        let fixture: ComponentFixture<LoteLicitacaoDetailComponent>;
        let service: LoteLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LoteLicitacaoDetailComponent],
                providers: [
                    LoteLicitacaoService
                ]
            })
            .overrideTemplate(LoteLicitacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoteLicitacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoteLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LoteLicitacao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.loteLicitacao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
