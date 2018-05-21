import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    TempoRandomicoService,
    TempoRandomicoPopupService,
    TempoRandomicoComponent,
    TempoRandomicoDetailComponent,
    TempoRandomicoDialogComponent,
    TempoRandomicoPopupComponent,
    TempoRandomicoDeletePopupComponent,
    TempoRandomicoDeleteDialogComponent,
    tempoRandomicoRoute,
    tempoRandomicoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tempoRandomicoRoute,
    ...tempoRandomicoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TempoRandomicoComponent,
        TempoRandomicoDetailComponent,
        TempoRandomicoDialogComponent,
        TempoRandomicoDeleteDialogComponent,
        TempoRandomicoPopupComponent,
        TempoRandomicoDeletePopupComponent,
    ],
    entryComponents: [
        TempoRandomicoComponent,
        TempoRandomicoDialogComponent,
        TempoRandomicoPopupComponent,
        TempoRandomicoDeleteDialogComponent,
        TempoRandomicoDeletePopupComponent,
    ],
    providers: [
        TempoRandomicoService,
        TempoRandomicoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoTempoRandomicoModule {}
