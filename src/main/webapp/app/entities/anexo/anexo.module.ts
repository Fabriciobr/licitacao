import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    AnexoService,
    AnexoPopupService,
    AnexoComponent,
    AnexoDetailComponent,
    AnexoDialogComponent,
    AnexoPopupComponent,
    AnexoDeletePopupComponent,
    AnexoDeleteDialogComponent,
    anexoRoute,
    anexoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...anexoRoute,
    ...anexoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AnexoComponent,
        AnexoDetailComponent,
        AnexoDialogComponent,
        AnexoDeleteDialogComponent,
        AnexoPopupComponent,
        AnexoDeletePopupComponent,
    ],
    entryComponents: [
        AnexoComponent,
        AnexoDialogComponent,
        AnexoPopupComponent,
        AnexoDeleteDialogComponent,
        AnexoDeletePopupComponent,
    ],
    providers: [
        AnexoService,
        AnexoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoAnexoModule {}
