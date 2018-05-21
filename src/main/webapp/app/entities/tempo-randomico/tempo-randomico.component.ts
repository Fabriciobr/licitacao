import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TempoRandomico } from './tempo-randomico.model';
import { TempoRandomicoService } from './tempo-randomico.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tempo-randomico',
    templateUrl: './tempo-randomico.component.html'
})
export class TempoRandomicoComponent implements OnInit, OnDestroy {
tempoRandomicos: TempoRandomico[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tempoRandomicoService: TempoRandomicoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tempoRandomicoService.query().subscribe(
            (res: HttpResponse<TempoRandomico[]>) => {
                this.tempoRandomicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTempoRandomicos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TempoRandomico) {
        return item.id;
    }
    registerChangeInTempoRandomicos() {
        this.eventSubscriber = this.eventManager.subscribe('tempoRandomicoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
