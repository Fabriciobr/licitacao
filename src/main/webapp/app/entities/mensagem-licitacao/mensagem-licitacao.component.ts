import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MensagemLicitacao } from './mensagem-licitacao.model';
import { MensagemLicitacaoService } from './mensagem-licitacao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mensagem-licitacao',
    templateUrl: './mensagem-licitacao.component.html'
})
export class MensagemLicitacaoComponent implements OnInit, OnDestroy {
mensagemLicitacaos: MensagemLicitacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mensagemLicitacaoService: MensagemLicitacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mensagemLicitacaoService.query().subscribe(
            (res: HttpResponse<MensagemLicitacao[]>) => {
                this.mensagemLicitacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMensagemLicitacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MensagemLicitacao) {
        return item.id;
    }
    registerChangeInMensagemLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe('mensagemLicitacaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
