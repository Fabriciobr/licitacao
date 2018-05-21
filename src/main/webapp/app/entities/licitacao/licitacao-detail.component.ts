import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Licitacao } from './licitacao.model';
import { LicitacaoService } from './licitacao.service';

@Component({
    selector: 'jhi-licitacao-detail',
    templateUrl: './licitacao-detail.component.html'
})
export class LicitacaoDetailComponent implements OnInit, OnDestroy {

    licitacao: Licitacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private licitacaoService: LicitacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLicitacaos();
    }

    load(id) {
        this.licitacaoService.find(id)
            .subscribe((licitacaoResponse: HttpResponse<Licitacao>) => {
                this.licitacao = licitacaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'licitacaoListModification',
            (response) => this.load(this.licitacao.id)
        );
    }
}
