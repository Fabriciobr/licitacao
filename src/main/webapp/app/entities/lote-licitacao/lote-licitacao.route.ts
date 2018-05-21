import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LoteLicitacaoComponent } from './lote-licitacao.component';
import { LoteLicitacaoDetailComponent } from './lote-licitacao-detail.component';
import { LoteLicitacaoPopupComponent } from './lote-licitacao-dialog.component';
import { LoteLicitacaoDeletePopupComponent } from './lote-licitacao-delete-dialog.component';

export const loteLicitacaoRoute: Routes = [
    {
        path: 'lote-licitacao',
        component: LoteLicitacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoteLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lote-licitacao/:id',
        component: LoteLicitacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoteLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loteLicitacaoPopupRoute: Routes = [
    {
        path: 'lote-licitacao-new',
        component: LoteLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoteLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lote-licitacao/:id/edit',
        component: LoteLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoteLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lote-licitacao/:id/delete',
        component: LoteLicitacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LoteLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
