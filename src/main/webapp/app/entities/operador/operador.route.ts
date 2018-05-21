import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { OperadorComponent } from './operador.component';
import { OperadorDetailComponent } from './operador-detail.component';
import { OperadorPopupComponent } from './operador-dialog.component';
import { OperadorDeletePopupComponent } from './operador-delete-dialog.component';

export const operadorRoute: Routes = [
    {
        path: 'operador',
        component: OperadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operadors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'operador/:id',
        component: OperadorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operadors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operadorPopupRoute: Routes = [
    {
        path: 'operador-new',
        component: OperadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operador/:id/edit',
        component: OperadorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operador/:id/delete',
        component: OperadorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operadors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
