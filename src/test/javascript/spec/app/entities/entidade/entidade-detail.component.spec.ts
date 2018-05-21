/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { EntidadeDetailComponent } from '../../../../../../main/webapp/app/entities/entidade/entidade-detail.component';
import { EntidadeService } from '../../../../../../main/webapp/app/entities/entidade/entidade.service';
import { Entidade } from '../../../../../../main/webapp/app/entities/entidade/entidade.model';

describe('Component Tests', () => {

    describe('Entidade Management Detail Component', () => {
        let comp: EntidadeDetailComponent;
        let fixture: ComponentFixture<EntidadeDetailComponent>;
        let service: EntidadeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [EntidadeDetailComponent],
                providers: [
                    EntidadeService
                ]
            })
            .overrideTemplate(EntidadeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntidadeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntidadeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Entidade(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entidade).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
