import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    EntidadeService,
    EntidadePopupService,
    EntidadeComponent,
    EntidadeDetailComponent,
    EntidadeDialogComponent,
    EntidadePopupComponent,
    EntidadeDeletePopupComponent,
    EntidadeDeleteDialogComponent,
    entidadeRoute,
    entidadePopupRoute,
} from './';

const ENTITY_STATES = [
    ...entidadeRoute,
    ...entidadePopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntidadeComponent,
        EntidadeDetailComponent,
        EntidadeDialogComponent,
        EntidadeDeleteDialogComponent,
        EntidadePopupComponent,
        EntidadeDeletePopupComponent,
    ],
    entryComponents: [
        EntidadeComponent,
        EntidadeDialogComponent,
        EntidadePopupComponent,
        EntidadeDeleteDialogComponent,
        EntidadeDeletePopupComponent,
    ],
    providers: [
        EntidadeService,
        EntidadePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoEntidadeModule {}
