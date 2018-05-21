import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    LoteLicitacaoService,
    LoteLicitacaoPopupService,
    LoteLicitacaoComponent,
    LoteLicitacaoDetailComponent,
    LoteLicitacaoDialogComponent,
    LoteLicitacaoPopupComponent,
    LoteLicitacaoDeletePopupComponent,
    LoteLicitacaoDeleteDialogComponent,
    loteLicitacaoRoute,
    loteLicitacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...loteLicitacaoRoute,
    ...loteLicitacaoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoteLicitacaoComponent,
        LoteLicitacaoDetailComponent,
        LoteLicitacaoDialogComponent,
        LoteLicitacaoDeleteDialogComponent,
        LoteLicitacaoPopupComponent,
        LoteLicitacaoDeletePopupComponent,
    ],
    entryComponents: [
        LoteLicitacaoComponent,
        LoteLicitacaoDialogComponent,
        LoteLicitacaoPopupComponent,
        LoteLicitacaoDeleteDialogComponent,
        LoteLicitacaoDeletePopupComponent,
    ],
    providers: [
        LoteLicitacaoService,
        LoteLicitacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoLoteLicitacaoModule {}
