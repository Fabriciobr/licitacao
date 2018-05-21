/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { MensagemLicitacaoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao-delete-dialog.component';
import { MensagemLicitacaoService } from '../../../../../../main/webapp/app/entities/mensagem-licitacao/mensagem-licitacao.service';

describe('Component Tests', () => {

    describe('MensagemLicitacao Management Delete Component', () => {
        let comp: MensagemLicitacaoDeleteDialogComponent;
        let fixture: ComponentFixture<MensagemLicitacaoDeleteDialogComponent>;
        let service: MensagemLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [MensagemLicitacaoDeleteDialogComponent],
                providers: [
                    MensagemLicitacaoService
                ]
            })
            .overrideTemplate(MensagemLicitacaoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MensagemLicitacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MensagemLicitacaoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
