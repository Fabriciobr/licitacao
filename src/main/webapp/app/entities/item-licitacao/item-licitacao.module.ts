import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LicitacaoSharedModule } from '../../shared';
import {
    ItemLicitacaoService,
    ItemLicitacaoPopupService,
    ItemLicitacaoComponent,
    ItemLicitacaoDetailComponent,
    ItemLicitacaoDialogComponent,
    ItemLicitacaoPopupComponent,
    ItemLicitacaoDeletePopupComponent,
    ItemLicitacaoDeleteDialogComponent,
    itemLicitacaoRoute,
    itemLicitacaoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...itemLicitacaoRoute,
    ...itemLicitacaoPopupRoute,
];

@NgModule({
    imports: [
        LicitacaoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ItemLicitacaoComponent,
        ItemLicitacaoDetailComponent,
        ItemLicitacaoDialogComponent,
        ItemLicitacaoDeleteDialogComponent,
        ItemLicitacaoPopupComponent,
        ItemLicitacaoDeletePopupComponent,
    ],
    entryComponents: [
        ItemLicitacaoComponent,
        ItemLicitacaoDialogComponent,
        ItemLicitacaoPopupComponent,
        ItemLicitacaoDeleteDialogComponent,
        ItemLicitacaoDeletePopupComponent,
    ],
    providers: [
        ItemLicitacaoService,
        ItemLicitacaoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoItemLicitacaoModule {}
