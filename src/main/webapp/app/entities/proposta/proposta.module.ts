import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    PropostaService,
    PropostaPopupService,
    PropostaComponent,
    PropostaDetailComponent,
    PropostaDialogComponent,
    PropostaPopupComponent,
    PropostaDeletePopupComponent,
    PropostaDeleteDialogComponent,
    propostaRoute,
    propostaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...propostaRoute,
    ...propostaPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PropostaComponent,
        PropostaDetailComponent,
        PropostaDialogComponent,
        PropostaDeleteDialogComponent,
        PropostaPopupComponent,
        PropostaDeletePopupComponent,
    ],
    entryComponents: [
        PropostaComponent,
        PropostaDialogComponent,
        PropostaPopupComponent,
        PropostaDeleteDialogComponent,
        PropostaDeletePopupComponent,
    ],
    providers: [
        PropostaService,
        PropostaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoPropostaModule {}
