import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Licitacao } from './licitacao.model';
import { LicitacaoService } from './licitacao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-licitacao',
    templateUrl: './licitacao.component.html'
})
export class LicitacaoComponent implements OnInit, OnDestroy {
licitacaos: Licitacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private licitacaoService: LicitacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.licitacaoService.query().subscribe(
            (res: HttpResponse<Licitacao[]>) => {
                this.licitacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLicitacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Licitacao) {
        return item.id;
    }
    registerChangeInLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe('licitacaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
