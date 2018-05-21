import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DisputaComponent } from './disputa.component';
import { DisputaDetailComponent } from './disputa-detail.component';
import { DisputaPopupComponent } from './disputa-dialog.component';
import { DisputaDeletePopupComponent } from './disputa-delete-dialog.component';

export const disputaRoute: Routes = [
    {
        path: 'disputa',
        component: DisputaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disputas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'disputa/:id',
        component: DisputaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disputas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const disputaPopupRoute: Routes = [
    {
        path: 'disputa-new',
        component: DisputaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disputas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disputa/:id/edit',
        component: DisputaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disputas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disputa/:id/delete',
        component: DisputaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disputas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
