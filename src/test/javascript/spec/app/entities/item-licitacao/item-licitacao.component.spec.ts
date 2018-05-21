/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { ItemLicitacaoComponent } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.component';
import { ItemLicitacaoService } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.service';
import { ItemLicitacao } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.model';

describe('Component Tests', () => {

    describe('ItemLicitacao Management Component', () => {
        let comp: ItemLicitacaoComponent;
        let fixture: ComponentFixture<ItemLicitacaoComponent>;
        let service: ItemLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [ItemLicitacaoComponent],
                providers: [
                    ItemLicitacaoService
                ]
            })
            .overrideTemplate(ItemLicitacaoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemLicitacaoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ItemLicitacao(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.itemLicitacaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
