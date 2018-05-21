/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { TempoRandomicoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico-delete-dialog.component';
import { TempoRandomicoService } from '../../../../../../main/webapp/app/entities/tempo-randomico/tempo-randomico.service';

describe('Component Tests', () => {

    describe('TempoRandomico Management Delete Component', () => {
        let comp: TempoRandomicoDeleteDialogComponent;
        let fixture: ComponentFixture<TempoRandomicoDeleteDialogComponent>;
        let service: TempoRandomicoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [TempoRandomicoDeleteDialogComponent],
                providers: [
                    TempoRandomicoService
                ]
            })
            .overrideTemplate(TempoRandomicoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempoRandomicoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempoRandomicoService);
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
