import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TempoRandomicoComponent } from './tempo-randomico.component';
import { TempoRandomicoDetailComponent } from './tempo-randomico-detail.component';
import { TempoRandomicoPopupComponent } from './tempo-randomico-dialog.component';
import { TempoRandomicoDeletePopupComponent } from './tempo-randomico-delete-dialog.component';

export const tempoRandomicoRoute: Routes = [
    {
        path: 'tempo-randomico',
        component: TempoRandomicoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TempoRandomicos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tempo-randomico/:id',
        component: TempoRandomicoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TempoRandomicos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tempoRandomicoPopupRoute: Routes = [
    {
        path: 'tempo-randomico-new',
        component: TempoRandomicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TempoRandomicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tempo-randomico/:id/edit',
        component: TempoRandomicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TempoRandomicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tempo-randomico/:id/delete',
        component: TempoRandomicoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TempoRandomicos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
