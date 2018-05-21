import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LoteLicitacao } from './lote-licitacao.model';
import { LoteLicitacaoService } from './lote-licitacao.service';

@Component({
    selector: 'jhi-lote-licitacao-detail',
    templateUrl: './lote-licitacao-detail.component.html'
})
export class LoteLicitacaoDetailComponent implements OnInit, OnDestroy {

    loteLicitacao: LoteLicitacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private loteLicitacaoService: LoteLicitacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLoteLicitacaos();
    }

    load(id) {
        this.loteLicitacaoService.find(id)
            .subscribe((loteLicitacaoResponse: HttpResponse<LoteLicitacao>) => {
                this.loteLicitacao = loteLicitacaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLoteLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'loteLicitacaoListModification',
            (response) => this.load(this.loteLicitacao.id)
        );
    }
}
