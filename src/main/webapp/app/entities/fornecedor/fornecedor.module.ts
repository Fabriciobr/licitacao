import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    FornecedorService,
    FornecedorPopupService,
    FornecedorComponent,
    FornecedorDetailComponent,
    FornecedorDialogComponent,
    FornecedorPopupComponent,
    FornecedorDeletePopupComponent,
    FornecedorDeleteDialogComponent,
    fornecedorRoute,
    fornecedorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fornecedorRoute,
    ...fornecedorPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FornecedorComponent,
        FornecedorDetailComponent,
        FornecedorDialogComponent,
        FornecedorDeleteDialogComponent,
        FornecedorPopupComponent,
        FornecedorDeletePopupComponent,
    ],
    entryComponents: [
        FornecedorComponent,
        FornecedorDialogComponent,
        FornecedorPopupComponent,
        FornecedorDeleteDialogComponent,
        FornecedorDeletePopupComponent,
    ],
    providers: [
        FornecedorService,
        FornecedorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoFornecedorModule {}
