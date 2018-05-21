/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { ItemLicitacaoDialogComponent } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao-dialog.component';
import { ItemLicitacaoService } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.service';
import { ItemLicitacao } from '../../../../../../main/webapp/app/entities/item-licitacao/item-licitacao.model';
import { LoteLicitacaoService } from '../../../../../../main/webapp/app/entities/lote-licitacao';
import { ProdutoService } from '../../../../../../main/webapp/app/entities/produto';

describe('Component Tests', () => {

    describe('ItemLicitacao Management Dialog Component', () => {
        let comp: ItemLicitacaoDialogComponent;
        let fixture: ComponentFixture<ItemLicitacaoDialogComponent>;
        let service: ItemLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [ItemLicitacaoDialogComponent],
                providers: [
                    LoteLicitacaoService,
                    ProdutoService,
                    ItemLicitacaoService
                ]
            })
            .overrideTemplate(ItemLicitacaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemLicitacaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemLicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemLicitacao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.itemLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemLicitacao();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.itemLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
