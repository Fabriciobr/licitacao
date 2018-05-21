import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    MensagemLicitacaoService,
    MensagemLicitacaoPopupService,
    MensagemLicitacaoComponent,
    MensagemLicitacaoDetailComponent,
    MensagemLicitacaoDialogComponent,
    MensagemLicitacaoPopupComponent,
    MensagemLicitacaoDeletePopupComponent,
    MensagemLicitacaoDeleteDialogComponent,
    mensagemLicitacaoRoute,
    mensagemLicitacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mensagemLicitacaoRoute,
    ...mensagemLicitacaoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MensagemLicitacaoComponent,
        MensagemLicitacaoDetailComponent,
        MensagemLicitacaoDialogComponent,
        MensagemLicitacaoDeleteDialogComponent,
        MensagemLicitacaoPopupComponent,
        MensagemLicitacaoDeletePopupComponent,
    ],
    entryComponents: [
        MensagemLicitacaoComponent,
        MensagemLicitacaoDialogComponent,
        MensagemLicitacaoPopupComponent,
        MensagemLicitacaoDeleteDialogComponent,
        MensagemLicitacaoDeletePopupComponent,
    ],
    providers: [
        MensagemLicitacaoService,
        MensagemLicitacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoMensagemLicitacaoModule {}
