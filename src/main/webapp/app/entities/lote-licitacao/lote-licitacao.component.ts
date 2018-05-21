import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LoteLicitacao } from './lote-licitacao.model';
import { LoteLicitacaoService } from './lote-licitacao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-lote-licitacao',
    templateUrl: './lote-licitacao.component.html'
})
export class LoteLicitacaoComponent implements OnInit, OnDestroy {
loteLicitacaos: LoteLicitacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private loteLicitacaoService: LoteLicitacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.loteLicitacaoService.query().subscribe(
            (res: HttpResponse<LoteLicitacao[]>) => {
                this.loteLicitacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLoteLicitacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: LoteLicitacao) {
        return item.id;
    }
    registerChangeInLoteLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe('loteLicitacaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
