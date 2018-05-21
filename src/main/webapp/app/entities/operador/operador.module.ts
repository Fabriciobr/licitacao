import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    OperadorService,
    OperadorPopupService,
    OperadorComponent,
    OperadorDetailComponent,
    OperadorDialogComponent,
    OperadorPopupComponent,
    OperadorDeletePopupComponent,
    OperadorDeleteDialogComponent,
    operadorRoute,
    operadorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...operadorRoute,
    ...operadorPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OperadorComponent,
        OperadorDetailComponent,
        OperadorDialogComponent,
        OperadorDeleteDialogComponent,
        OperadorPopupComponent,
        OperadorDeletePopupComponent,
    ],
    entryComponents: [
        OperadorComponent,
        OperadorDialogComponent,
        OperadorPopupComponent,
        OperadorDeleteDialogComponent,
        OperadorDeletePopupComponent,
    ],
    providers: [
        OperadorService,
        OperadorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoOperadorModule {}
