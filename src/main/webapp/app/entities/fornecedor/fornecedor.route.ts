import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FornecedorComponent } from './fornecedor.component';
import { FornecedorDetailComponent } from './fornecedor-detail.component';
import { FornecedorPopupComponent } from './fornecedor-dialog.component';
import { FornecedorDeletePopupComponent } from './fornecedor-delete-dialog.component';

export const fornecedorRoute: Routes = [
    {
        path: 'fornecedor',
        component: FornecedorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fornecedors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fornecedor/:id',
        component: FornecedorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fornecedors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fornecedorPopupRoute: Routes = [
    {
        path: 'fornecedor-new',
        component: FornecedorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fornecedors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fornecedor/:id/edit',
        component: FornecedorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fornecedors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fornecedor/:id/delete',
        component: FornecedorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fornecedors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
