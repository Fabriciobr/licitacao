import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    UnidadeOrganizacionalService,
    UnidadeOrganizacionalPopupService,
    UnidadeOrganizacionalComponent,
    UnidadeOrganizacionalDetailComponent,
    UnidadeOrganizacionalDialogComponent,
    UnidadeOrganizacionalPopupComponent,
    UnidadeOrganizacionalDeletePopupComponent,
    UnidadeOrganizacionalDeleteDialogComponent,
    unidadeOrganizacionalRoute,
    unidadeOrganizacionalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...unidadeOrganizacionalRoute,
    ...unidadeOrganizacionalPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UnidadeOrganizacionalComponent,
        UnidadeOrganizacionalDetailComponent,
        UnidadeOrganizacionalDialogComponent,
        UnidadeOrganizacionalDeleteDialogComponent,
        UnidadeOrganizacionalPopupComponent,
        UnidadeOrganizacionalDeletePopupComponent,
    ],
    entryComponents: [
        UnidadeOrganizacionalComponent,
        UnidadeOrganizacionalDialogComponent,
        UnidadeOrganizacionalPopupComponent,
        UnidadeOrganizacionalDeleteDialogComponent,
        UnidadeOrganizacionalDeletePopupComponent,
    ],
    providers: [
        UnidadeOrganizacionalService,
        UnidadeOrganizacionalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoUnidadeOrganizacionalModule {}
