import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AnexoComponent } from './anexo.component';
import { AnexoDetailComponent } from './anexo-detail.component';
import { AnexoPopupComponent } from './anexo-dialog.component';
import { AnexoDeletePopupComponent } from './anexo-delete-dialog.component';

export const anexoRoute: Routes = [
    {
        path: 'anexo',
        component: AnexoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anexos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'anexo/:id',
        component: AnexoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anexos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const anexoPopupRoute: Routes = [
    {
        path: 'anexo-new',
        component: AnexoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anexos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anexo/:id/edit',
        component: AnexoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anexos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'anexo/:id/delete',
        component: AnexoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Anexos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
