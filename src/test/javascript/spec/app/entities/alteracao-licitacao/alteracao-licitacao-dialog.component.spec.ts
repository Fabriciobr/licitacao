/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { AlteracaoLicitacaoDialogComponent } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao-dialog.component';
import { AlteracaoLicitacaoService } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.service';
import { AlteracaoLicitacao } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.model';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao';
import { OperadorService } from '../../../../../../main/webapp/app/entities/operador';

describe('Component Tests', () => {

    describe('AlteracaoLicitacao Management Dialog Component', () => {
        let comp: AlteracaoLicitacaoDialogComponent;
        let fixture: ComponentFixture<AlteracaoLicitacaoDialogComponent>;
        let service: AlteracaoLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AlteracaoLicitacaoDialogComponent],
                providers: [
                    LicitacaoService,
                    OperadorService,
                    AlteracaoLicitacaoService
                ]
            })
            .overrideTemplate(AlteracaoLicitacaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlteracaoLicitacaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlteracaoLicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlteracaoLicitacao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.alteracaoLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'alteracaoLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AlteracaoLicitacao();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.alteracaoLicitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'alteracaoLicitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
