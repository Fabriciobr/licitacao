import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    DisputaService,
    DisputaPopupService,
    DisputaComponent,
    DisputaDetailComponent,
    DisputaDialogComponent,
    DisputaPopupComponent,
    DisputaDeletePopupComponent,
    DisputaDeleteDialogComponent,
    disputaRoute,
    disputaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...disputaRoute,
    ...disputaPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DisputaComponent,
        DisputaDetailComponent,
        DisputaDialogComponent,
        DisputaDeleteDialogComponent,
        DisputaPopupComponent,
        DisputaDeletePopupComponent,
    ],
    entryComponents: [
        DisputaComponent,
        DisputaDialogComponent,
        DisputaPopupComponent,
        DisputaDeleteDialogComponent,
        DisputaDeletePopupComponent,
    ],
    providers: [
        DisputaService,
        DisputaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoDisputaModule {}
