/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { AnexoDetailComponent } from '../../../../../../main/webapp/app/entities/anexo/anexo-detail.component';
import { AnexoService } from '../../../../../../main/webapp/app/entities/anexo/anexo.service';
import { Anexo } from '../../../../../../main/webapp/app/entities/anexo/anexo.model';

describe('Component Tests', () => {

    describe('Anexo Management Detail Component', () => {
        let comp: AnexoDetailComponent;
        let fixture: ComponentFixture<AnexoDetailComponent>;
        let service: AnexoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AnexoDetailComponent],
                providers: [
                    AnexoService
                ]
            })
            .overrideTemplate(AnexoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnexoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnexoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Anexo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.anexo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
