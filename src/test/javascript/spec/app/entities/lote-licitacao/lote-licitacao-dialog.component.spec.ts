/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { LoteLicitacaoDialogComponent } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao-dialog.component';
import { LoteLicitacaoService } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.service';
import { LoteLicitacao } from '../../../../../../main/webapp/app/entities/lote-licitacao/lote-licitacao.model';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao';
import { FornecedorService } from '../../../../../../main/webapp/app/entities/fornecedor';
import { TempoRandomicoService } from '../../../../../../main/webapp/app/entities/tempo-randomico';

describe('Component Tests', () => {

    describe('LoteLicitacao Management Dialog Component', () => {
        let comp: LoteLicitacaoDialogComponent;
        let fixture: ComponentFixture<LoteLicitacaoDialogComponent>;
        let service: LoteLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LoteLicitacaoDialogComponent],
                providers: [
                    LicitacaoService,
                    FornecedorService,
                    TempoRandomicoService,
                    LoteLicitacaoService
                ]
            })
            .overrideTemplate(LoteLicitacaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoteLicitacaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoteLicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LoteLicitacao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.loteLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'loteLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LoteLicitacao();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.loteLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'loteLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
