/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LicitacaoTestModule } from '../../../test.module';
import { UnidadeOrganizacionalDetailComponent } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional-detail.component';
import { UnidadeOrganizacionalService } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.service';
import { UnidadeOrganizacional } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.model';

describe('Component Tests', () => {

    describe('UnidadeOrganizacional Management Detail Component', () => {
        let comp: UnidadeOrganizacionalDetailComponent;
        let fixture: ComponentFixture<UnidadeOrganizacionalDetailComponent>;
        let service: UnidadeOrganizacionalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [UnidadeOrganizacionalDetailComponent],
                providers: [
                    UnidadeOrganizacionalService
                ]
            })
            .overrideTemplate(UnidadeOrganizacionalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnidadeOrganizacionalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnidadeOrganizacionalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UnidadeOrganizacional(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.unidadeOrganizacional).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
