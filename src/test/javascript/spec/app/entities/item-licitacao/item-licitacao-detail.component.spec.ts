/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { ItemLicitacaoDetailComponent } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao-detail.component';
import { ItemLicitacaoService } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.service';
import { ItemLicitacao } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.model';

describe('Component Tests', () => {

    describe('ItemLicitacao Management Detail Component', () => {
        let comp: ItemLicitacaoDetailComponent;
        let fixture: ComponentFixture<ItemLicitacaoDetailComponent>;
        let service: ItemLicitacaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [ItemLicitacaoDetailComponent],
                providers: [
                    ItemLicitacaoService
                ]
            })
            .overrideTemplate(ItemLicitacaoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemLicitacaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemLicitacaoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ItemLicitacao(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.itemLicitacao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
