import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { UnidadeOrganizacionalComponent } from './unidade-organizacional.component';
import { UnidadeOrganizacionalDetailComponent } from './unidade-organizacional-detail.component';
import { UnidadeOrganizacionalPopupComponent } from './unidade-organizacional-dialog.component';
import { UnidadeOrganizacionalDeletePopupComponent } from './unidade-organizacional-delete-dialog.component';

export const unidadeOrganizacionalRoute: Routes = [
    {
        path: 'unidade-organizacional',
        component: UnidadeOrganizacionalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UnidadeOrganizacionals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'unidade-organizacional/:id',
        component: UnidadeOrganizacionalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UnidadeOrganizacionals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unidadeOrganizacionalPopupRoute: Routes = [
    {
        path: 'unidade-organizacional-new',
        component: UnidadeOrganizacionalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UnidadeOrganizacionals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unidade-organizacional/:id/edit',
        component: UnidadeOrganizacionalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UnidadeOrganizacionals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'unidade-organizacional/:id/delete',
        component: UnidadeOrganizacionalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UnidadeOrganizacionals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
