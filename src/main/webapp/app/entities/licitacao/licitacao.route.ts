import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LicitacaoComponent } from './licitacao.component';
import { LicitacaoDetailComponent } from './licitacao-detail.component';
import { LicitacaoPopupComponent } from './licitacao-dialog.component';
import { LicitacaoDeletePopupComponent } from './licitacao-delete-dialog.component';

export const licitacaoRoute: Routes = [
    {
        path: 'licitacao',
        component: LicitacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licitacaos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'licitacao/:id',
        component: LicitacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licitacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const licitacaoPopupRoute: Routes = [
    {
        path: 'licitacao-new',
        component: LicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'licitacao/:id/edit',
        component: LicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'licitacao/:id/delete',
        component: LicitacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Licitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
