import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ItemLicitacaoComponent } from './item-licitacao.component';
import { ItemLicitacaoDetailComponent } from './item-licitacao-detail.component';
import { ItemLicitacaoPopupComponent } from './item-licitacao-dialog.component';
import { ItemLicitacaoDeletePopupComponent } from './item-licitacao-delete-dialog.component';

export const itemLicitacaoRoute: Routes = [
    {
        path: 'item-licitacao',
        component: ItemLicitacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'item-licitacao/:id',
        component: ItemLicitacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const itemLicitacaoPopupRoute: Routes = [
    {
        path: 'item-licitacao-new',
        component: ItemLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-licitacao/:id/edit',
        component: ItemLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'item-licitacao/:id/delete',
        component: ItemLicitacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ItemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
