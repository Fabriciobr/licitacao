import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AlteracaoLicitacaoComponent } from './alteracao-licitacao.component';
import { AlteracaoLicitacaoDetailComponent } from './alteracao-licitacao-detail.component';
import { AlteracaoLicitacaoPopupComponent } from './alteracao-licitacao-dialog.component';
import { AlteracaoLicitacaoDeletePopupComponent } from './alteracao-licitacao-delete-dialog.component';

export const alteracaoLicitacaoRoute: Routes = [
    {
        path: 'alteracao-licitacao',
        component: AlteracaoLicitacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AlteracaoLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alteracao-licitacao/:id',
        component: AlteracaoLicitacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AlteracaoLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alteracaoLicitacaoPopupRoute: Routes = [
    {
        path: 'alteracao-licitacao-new',
        component: AlteracaoLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AlteracaoLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alteracao-licitacao/:id/edit',
        component: AlteracaoLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AlteracaoLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alteracao-licitacao/:id/delete',
        component: AlteracaoLicitacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AlteracaoLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
