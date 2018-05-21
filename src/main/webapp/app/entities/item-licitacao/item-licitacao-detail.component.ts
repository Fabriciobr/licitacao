import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ItemLicitacao } from './item-licitacao.model';
import { ItemLicitacaoService } from './item-licitacao.service';

@Component({
    selector: 'jhi-item-licitacao-detail',
    templateUrl: './item-licitacao-detail.component.html'
})
export class ItemLicitacaoDetailComponent implements OnInit, OnDestroy {

    itemLicitacao: ItemLicitacao;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private itemLicitacaoService: ItemLicitacaoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInItemLicitacaos();
    }

    load(id) {
        this.itemLicitacaoService.find(id)
            .subscribe((itemLicitacaoResponse: HttpResponse<ItemLicitacao>) => {
                this.itemLicitacao = itemLicitacaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInItemLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'itemLicitacaoListModification',
            (response) => this.load(this.itemLicitacao.id)
        );
    }
}
