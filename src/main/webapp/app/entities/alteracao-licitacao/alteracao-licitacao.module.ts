import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    AlteracaoLicitacaoService,
    AlteracaoLicitacaoPopupService,
    AlteracaoLicitacaoComponent,
    AlteracaoLicitacaoDetailComponent,
    AlteracaoLicitacaoDialogComponent,
    AlteracaoLicitacaoPopupComponent,
    AlteracaoLicitacaoDeletePopupComponent,
    AlteracaoLicitacaoDeleteDialogComponent,
    alteracaoLicitacaoRoute,
    alteracaoLicitacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...alteracaoLicitacaoRoute,
    ...alteracaoLicitacaoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlteracaoLicitacaoComponent,
        AlteracaoLicitacaoDetailComponent,
        AlteracaoLicitacaoDialogComponent,
        AlteracaoLicitacaoDeleteDialogComponent,
        AlteracaoLicitacaoPopupComponent,
        AlteracaoLicitacaoDeletePopupComponent,
    ],
    entryComponents: [
        AlteracaoLicitacaoComponent,
        AlteracaoLicitacaoDialogComponent,
        AlteracaoLicitacaoPopupComponent,
        AlteracaoLicitacaoDeleteDialogComponent,
        AlteracaoLicitacaoDeletePopupComponent,
    ],
    providers: [
        AlteracaoLicitacaoService,
        AlteracaoLicitacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoAlteracaoLicitacaoModule {}
