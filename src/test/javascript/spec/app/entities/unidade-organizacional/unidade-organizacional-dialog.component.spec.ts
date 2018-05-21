/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { LicitacaoTestModule } from '../../../test.module';
import { UnidadeOrganizacionalDialogComponent } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional-dialog.component';
import { UnidadeOrganizacionalService } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.service';
import { UnidadeOrganizacional } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.model';

describe('Component Tests', () => {

    describe('UnidadeOrganizacional Management Dialog Component', () => {
        let comp: UnidadeOrganizacionalDialogComponent;
        let fixture: ComponentFixture<UnidadeOrganizacionalDialogComponent>;
        let service: UnidadeOrganizacionalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [UnidadeOrganizacionalDialogComponent],
                providers: [
                    UnidadeOrganizacionalService
                ]
            })
            .overrideTemplate(UnidadeOrganizacionalDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnidadeOrganizacionalDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnidadeOrganizacionalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UnidadeOrganizacional(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unidadeOrganizacional = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unidadeOrganizacionalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UnidadeOrganizacional();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.unidadeOrganizacional = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'unidadeOrganizacionalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
