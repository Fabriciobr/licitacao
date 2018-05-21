import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MensagemLicitacaoComponent } from './mensagem-licitacao.component';
import { MensagemLicitacaoDetailComponent } from './mensagem-licitacao-detail.component';
import { MensagemLicitacaoPopupComponent } from './mensagem-licitacao-dialog.component';
import { MensagemLicitacaoDeletePopupComponent } from './mensagem-licitacao-delete-dialog.component';

export const mensagemLicitacaoRoute: Routes = [
    {
        path: 'mensagem-licitacao',
        component: MensagemLicitacaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MensagemLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mensagem-licitacao/:id',
        component: MensagemLicitacaoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MensagemLicitacaos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mensagemLicitacaoPopupRoute: Routes = [
    {
        path: 'mensagem-licitacao-new',
        component: MensagemLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MensagemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mensagem-licitacao/:id/edit',
        component: MensagemLicitacaoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MensagemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mensagem-licitacao/:id/delete',
        component: MensagemLicitacaoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MensagemLicitacaos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
