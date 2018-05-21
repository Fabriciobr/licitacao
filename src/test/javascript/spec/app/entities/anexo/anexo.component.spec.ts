/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { AnexoComponent } from '../../../../../../main/webapp/app/entities/anexo/anexo.component';
import { AnexoService } from '../../../../../../main/webapp/app/entities/anexo/anexo.service';
import { Anexo } from '../../../../../../main/webapp/app/entities/anexo/anexo.model';

describe('Component Tests', () => {

    describe('Anexo Management Component', () => {
        let comp: AnexoComponent;
        let fixture: ComponentFixture<AnexoComponent>;
        let service: AnexoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [AnexoComponent],
                providers: [
                    AnexoService
                ]
            })
            .overrideTemplate(AnexoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnexoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnexoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Anexo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.anexos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
