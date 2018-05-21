import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { AlteracaoLicitacaoService } from './alteracao-licitacao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-alteracao-licitacao',
    templateUrl: './alteracao-licitacao.component.html'
})
export class AlteracaoLicitacaoComponent implements OnInit, OnDestroy {
alteracaoLicitacaos: AlteracaoLicitacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alteracaoLicitacaoService: AlteracaoLicitacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.alteracaoLicitacaoService.query().subscribe(
            (res: HttpResponse<AlteracaoLicitacao[]>) => {
                this.alteracaoLicitacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlteracaoLicitacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AlteracaoLicitacao) {
        return item.id;
    }
    registerChangeInAlteracaoLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe('alteracaoLicitacaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
