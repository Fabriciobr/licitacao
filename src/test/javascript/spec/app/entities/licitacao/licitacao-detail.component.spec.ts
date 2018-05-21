/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { LicitacaoDetailComponent } from '../../../../../../main/webapp/app/entities/licitacao/licitacao-detail.component';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.service';
import { Licitacao } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.model';

describe('Component Tests', () => {

    describe('Licitacao Management Detail Component', () => {
        let comp: LicitacaoDetailComponent;
        let fixture: ComponentFixture<LicitacaoDetailComponent>;
        let service: LicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LicitacaoDetailComponent],
                providers: [
                    LicitacaoService
                ]
            })
            .overrideTemplate(LicitacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LicitacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Licitacao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.licitacao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
