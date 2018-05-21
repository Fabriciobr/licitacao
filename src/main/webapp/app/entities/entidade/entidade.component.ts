import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entidade } from './entidade.model';
import { EntidadeService } from './entidade.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-entidade',
    templateUrl: './entidade.component.html'
})
export class EntidadeComponent implements OnInit, OnDestroy {
entidades: Entidade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entidadeService: EntidadeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entidadeService.query().subscribe(
            (res: HttpResponse<Entidade[]>) => {
                this.entidades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntidades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Entidade) {
        return item.id;
    }
    registerChangeInEntidades() {
        this.eventSubscriber = this.eventManager.subscribe('entidadeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
