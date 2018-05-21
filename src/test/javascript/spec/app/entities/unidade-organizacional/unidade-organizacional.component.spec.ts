/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LicitacaoTestModule } from '../../../test.module';
import { UnidadeOrganizacionalComponent } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.component';
import { UnidadeOrganizacionalService } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.service';
import { UnidadeOrganizacional } from '../../../../../../main/webapp/app/entities/unidade-organizacional/unidade-organizacional.model';

describe('Component Tests', () => {

    describe('UnidadeOrganizacional Management Component', () => {
        let comp: UnidadeOrganizacionalComponent;
        let fixture: ComponentFixture<UnidadeOrganizacionalComponent>;
        let service: UnidadeOrganizacionalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LicitacaoTestModule],
                declarations: [UnidadeOrganizacionalComponent],
                providers: [
                    UnidadeOrganizacionalService
                ]
            })
            .overrideTemplate(UnidadeOrganizacionalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnidadeOrganizacionalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnidadeOrganizacionalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UnidadeOrganizacional(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.unidadeOrganizacionals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
