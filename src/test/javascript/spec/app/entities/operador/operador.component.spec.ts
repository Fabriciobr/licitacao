/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { OperadorComponent } from '../../../../../../main/webapp/app/entities/operador/operador.component';
import { OperadorService } from '../../../../../../main/webapp/app/entities/operador/operador.service';
import { Operador } from '../../../../../../main/webapp/app/entities/operador/operador.model';

describe('Component Tests', () => {

    describe('Operador Management Component', () => {
        let comp: OperadorComponent;
        let fixture: ComponentFixture<OperadorComponent>;
        let service: OperadorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [OperadorComponent],
                providers: [
                    OperadorService
                ]
            })
            .overrideTemplate(OperadorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperadorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperadorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Operador(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.operadors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
