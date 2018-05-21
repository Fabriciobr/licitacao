/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { PropostaDialogComponent } from '../../../../../../main/webapp/app/entities/proposta/proposta-dialog.component';
import { PropostaService } from '../../../../../../main/webapp/app/entities/proposta/proposta.service';
import { Proposta } from '../../../../../../main/webapp/app/entities/proposta/proposta.model';
import { FornecedorService } from '../../../../../../main/webapp/app/entities/fornecedor';
import { ItemLicitacaoService } from '../../../../../../main/webapp/app/entities/item-licitacao';

describe('Component Tests', () => {

    describe('Proposta Management Dialog Component', () => {
        let comp: PropostaDialogComponent;
        let fixture: ComponentFixture<PropostaDialogComponent>;
        let service: PropostaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [PropostaDialogComponent],
                providers: [
                    FornecedorService,
                    ItemLicitacaoService,
                    PropostaService
                ]
            })
            .overrideTemplate(PropostaDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PropostaDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropostaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Proposta(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.proposta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'propostaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Proposta();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.proposta = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'propostaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
