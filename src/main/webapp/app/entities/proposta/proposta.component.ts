import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Proposta } from './proposta.model';
import { PropostaService } from './proposta.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-proposta',
    templateUrl: './proposta.component.html'
})
export class PropostaComponent implements OnInit, OnDestroy {
propostas: Proposta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private propostaService: PropostaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.propostaService.query().subscribe(
            (res: HttpResponse<Proposta[]>) => {
                this.propostas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPropostas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Proposta) {
        return item.id;
    }
    registerChangeInPropostas() {
        this.eventSubscriber = this.eventManager.subscribe('propostaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
