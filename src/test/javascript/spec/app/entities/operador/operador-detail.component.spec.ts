/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { OperadorDetailComponent } from '../../../../../../main/webapp/app/entities/operador/operador-detail.component';
import { OperadorService } from '../../../../../../main/webapp/app/entities/operador/operador.service';
import { Operador } from '../../../../../../main/webapp/app/entities/operador/operador.model';

describe('Component Tests', () => {

    describe('Operador Management Detail Component', () => {
        let comp: OperadorDetailComponent;
        let fixture: ComponentFixture<OperadorDetailComponent>;
        let service: OperadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [OperadorDetailComponent],
                providers: [
                    OperadorService
                ]
            })
            .overrideTemplate(OperadorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperadorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Operador(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.operador).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
