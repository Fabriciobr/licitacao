import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { AlteracaoLicitacaoService } from './alteracao-licitacao.service';

@Component({
    selector: 'jhi-alteracao-licitacao-detail',
    templateUrl: './alteracao-licitacao-detail.component.html'
})
export class AlteracaoLicitacaoDetailComponent implements OnInit, OnDestroy {

    alteracaoLicitacao: AlteracaoLicitacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alteracaoLicitacaoService: AlteracaoLicitacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlteracaoLicitacaos();
    }

    load(id) {
        this.alteracaoLicitacaoService.find(id)
            .subscribe((alteracaoLicitacaoResponse: HttpResponse<AlteracaoLicitacao>) => {
                this.alteracaoLicitacao = alteracaoLicitacaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlteracaoLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alteracaoLicitacaoListModification',
            (response) => this.load(this.alteracaoLicitacao.id)
        );
    }
}
