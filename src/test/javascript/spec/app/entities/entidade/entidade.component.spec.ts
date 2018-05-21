/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { EntidadeComponent } from '../../../../../../main/webapp/app/entities/entidade/entidade.component';
import { EntidadeService } from '../../../../../../main/webapp/app/entities/entidade/entidade.service';
import { Entidade } from '../../../../../../main/webapp/app/entities/entidade/entidade.model';

describe('Component Tests', () => {

    describe('Entidade Management Component', () => {
        let comp: EntidadeComponent;
        let fixture: ComponentFixture<EntidadeComponent>;
        let service: EntidadeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [EntidadeComponent],
                providers: [
                    EntidadeService
                ]
            })
            .overrideTemplate(EntidadeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntidadeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntidadeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Entidade(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entidades[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
