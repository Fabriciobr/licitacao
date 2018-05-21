import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { UnidadeOrganizacionalService } from './unidade-organizacional.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-unidade-organizacional',
    templateUrl: './unidade-organizacional.component.html'
})
export class UnidadeOrganizacionalComponent implements OnInit, OnDestroy {
unidadeOrganizacionals: UnidadeOrganizacional[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private unidadeOrganizacionalService: UnidadeOrganizacionalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.unidadeOrganizacionalService.query().subscribe(
            (res: HttpResponse<UnidadeOrganizacional[]>) => {
                this.unidadeOrganizacionals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUnidadeOrganizacionals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UnidadeOrganizacional) {
        return item.id;
    }
    registerChangeInUnidadeOrganizacionals() {
        this.eventSubscriber = this.eventManager.subscribe('unidadeOrganizacionalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
