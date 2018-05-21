import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntidadeComponent } from './entidade.component';
import { EntidadeDetailComponent } from './entidade-detail.component';
import { EntidadePopupComponent } from './entidade-dialog.component';
import { EntidadeDeletePopupComponent } from './entidade-delete-dialog.component';

export const entidadeRoute: Routes = [
    {
        path: 'entidade',
        component: EntidadeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidades'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entidade/:id',
        component: EntidadeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidades'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entidadePopupRoute: Routes = [
    {
        path: 'entidade-new',
        component: EntidadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidade/:id/edit',
        component: EntidadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidade/:id/delete',
        component: EntidadeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Entidades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
