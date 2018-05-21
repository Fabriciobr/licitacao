/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { DisputaComponent } from '../../../../../../main/webapp/app/entities/disputa/disputa.component';
import { DisputaService } from '../../../../../../main/webapp/app/entities/disputa/disputa.service';
import { Disputa } from '../../../../../../main/webapp/app/entities/disputa/disputa.model';

describe('Component Tests', () => {

    describe('Disputa Management Component', () => {
        let comp: DisputaComponent;
        let fixture: ComponentFixture<DisputaComponent>;
        let service: DisputaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [DisputaComponent],
                providers: [
                    DisputaService
                ]
            })
            .overrideTemplate(DisputaComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisputaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisputaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Disputa(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.disputas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
