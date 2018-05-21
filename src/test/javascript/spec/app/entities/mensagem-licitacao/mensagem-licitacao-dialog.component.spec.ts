/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { MensagemLicitacaoDialogComponent } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao-dialog.component';
import { MensagemLicitacaoService } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.service';
import { MensagemLicitacao } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.model';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao';

describe('Component Tests', () => {

    describe('MensagemLicitacao Management Dialog Component', () => {
        let comp: MensagemLicitacaoDialogComponent;
        let fixture: ComponentFixture<MensagemLicitacaoDialogComponent>;
        let service: MensagemLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [MensagemLicitacaoDialogComponent],
                providers: [
                    LicitacaoService,
                    MensagemLicitacaoService
                ]
            })
            .overrideTemplate(MensagemLicitacaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MensagemLicitacaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensagemLicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MensagemLicitacao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mensagemLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mensagemLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MensagemLicitacao();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.mensagemLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'mensagemLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
