import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MensagemLicitacao } from './mensagem-licitacao.model';
import { MensagemLicitacaoService } from './mensagem-licitacao.service';

@Component({
    selector: 'jhi-mensagem-licitacao-detail',
    templateUrl: './mensagem-licitacao-detail.component.html'
})
export class MensagemLicitacaoDetailComponent implements OnInit, OnDestroy {

    mensagemLicitacao: MensagemLicitacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mensagemLicitacaoService: MensagemLicitacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMensagemLicitacaos();
    }

    load(id) {
        this.mensagemLicitacaoService.find(id)
            .subscribe((mensagemLicitacaoResponse: HttpResponse<MensagemLicitacao>) => {
                this.mensagemLicitacao = mensagemLicitacaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMensagemLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mensagemLicitacaoListModification',
            (response) => this.load(this.mensagemLicitacao.id)
        );
    }
}
