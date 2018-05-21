/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { UnidadeOrganizacionalDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional-delete-dialog.component';
import { UnidadeOrganizacionalService } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.service';

describe('Component Tests', () => {

    describe('UnidadeOrganizacional Management Delete Component', () => {
        let comp: UnidadeOrganizacionalDeleteDialogComponent;
        let fixture: ComponentFixture<UnidadeOrganizacionalDeleteDialogComponent>;
        let service: UnidadeOrganizacionalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [UnidadeOrganizacionalDeleteDialogComponent],
                providers: [
                    UnidadeOrganizacionalService
                ]
            })
            .overrideTemplate(UnidadeOrganizacionalDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnidadeOrganizacionalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnidadeOrganizacionalService);
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
