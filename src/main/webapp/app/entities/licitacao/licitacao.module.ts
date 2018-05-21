import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    LicitacaoService,
    LicitacaoPopupService,
    LicitacaoComponent,
    LicitacaoDetailComponent,
    LicitacaoDialogComponent,
    LicitacaoPopupComponent,
    LicitacaoDeletePopupComponent,
    LicitacaoDeleteDialogComponent,
    licitacaoRoute,
    licitacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...licitacaoRoute,
    ...licitacaoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LicitacaoComponent,
        LicitacaoDetailComponent,
        LicitacaoDialogComponent,
        LicitacaoDeleteDialogComponent,
        LicitacaoPopupComponent,
        LicitacaoDeletePopupComponent,
    ],
    entryComponents: [
        LicitacaoComponent,
        LicitacaoDialogComponent,
        LicitacaoPopupComponent,
        LicitacaoDeleteDialogComponent,
        LicitacaoDeletePopupComponent,
    ],
    providers: [
        LicitacaoService,
        LicitacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoLicitacaoModule {}
