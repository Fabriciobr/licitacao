import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Disputa } from './disputa.model';
import { DisputaService } from './disputa.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-disputa',
    templateUrl: './disputa.component.html'
})
export class DisputaComponent implements OnInit, OnDestroy {
disputas: Disputa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private disputaService: DisputaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.disputaService.query().subscribe(
            (res: HttpResponse<Disputa[]>) => {
                this.disputas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDisputas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Disputa) {
        return item.id;
    }
    registerChangeInDisputas() {
        this.eventSubscriber = this.eventManager.subscribe('disputaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
