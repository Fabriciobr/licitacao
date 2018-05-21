/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { LicitacaoDialogComponent } from '../../../../../../main/webapp/app/entities/licitacao/licitacao-dialog.component';
import { LicitacaoService } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.service';
import { Licitacao } from '../../../../../../main/webapp/app/entities/licitacao/licitacao.model';
import { EntidadeService } from '../../../../../../main/webapp/app/entities/entidade';
import { UnidadeOrganizacionalService } from '../../../../../../main/webapp/app/entities/unidade-organizacional';
import { OperadorService } from '../../../../../../main/webapp/app/entities/operador';

describe('Component Tests', () => {

    describe('Licitacao Management Dialog Component', () => {
        let comp: LicitacaoDialogComponent;
        let fixture: ComponentFixture<LicitacaoDialogComponent>;
        let service: LicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [LicitacaoDialogComponent],
                providers: [
                    EntidadeService,
                    UnidadeOrganizacionalService,
                    OperadorService,
                    LicitacaoService
                ]
            })
            .overrideTemplate(LicitacaoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LicitacaoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Licitacao(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.licitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'licitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Licitacao();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.licitacao = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'licitacaoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
