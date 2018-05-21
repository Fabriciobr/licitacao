/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { LicitacaoComponent } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.component';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.service';
import { Licitacao } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.model';

describe('Component Tests', () => {

    describe('Licitacao Management Component', () => {
        let comp: LicitacaoComponent;
        let fixture: ComponentFixture<LicitacaoComponent>;
        let service: LicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LicitacaoComponent],
                providers: [
                    LicitacaoService
                ]
            })
            .overrideTemplate(LicitacaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LicitacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Licitacao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.licitacaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
