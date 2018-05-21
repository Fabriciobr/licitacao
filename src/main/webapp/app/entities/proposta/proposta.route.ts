import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PropostaComponent } from './proposta.component';
import { PropostaDetailComponent } from './proposta-detail.component';
import { PropostaPopupComponent } from './proposta-dialog.component';
import { PropostaDeletePopupComponent } from './proposta-delete-dialog.component';

export const propostaRoute: Routes = [
    {
        path: 'proposta',
        component: PropostaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Propostas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proposta/:id',
        component: PropostaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Propostas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propostaPopupRoute: Routes = [
    {
        path: 'proposta-new',
        component: PropostaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Propostas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta/:id/edit',
        component: PropostaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Propostas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proposta/:id/delete',
        component: PropostaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Propostas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
