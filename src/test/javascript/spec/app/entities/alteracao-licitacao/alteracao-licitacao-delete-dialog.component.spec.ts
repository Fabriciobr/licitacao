/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { AlteracaoLicitacaoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao-delete-dialog.component';
import { AlteracaoLicitacaoService } from '../../../../../../main/webapp/app/entities/alteracao-licitacao/alteracao-licitacao.service';

describe('Component Tests', () => {

    describe('AlteracaoLicitacao Management Delete Component', () => {
        let comp: AlteracaoLicitacaoDeleteDialogComponent;
        let fixture: ComponentFixture<AlteracaoLicitacaoDeleteDialogComponent>;
        let service: AlteracaoLicitacaoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AlteracaoLicitacaoDeleteDialogComponent],
                providers: [
                    AlteracaoLicitacaoService
                ]
            })
            .overrideTemplate(AlteracaoLicitacaoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlteracaoLicitacaoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlteracaoLicitacaoService);
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
