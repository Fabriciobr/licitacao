import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItemLicitacao } from './item-licitacao.model';
import { ItemLicitacaoService } from './item-licitacao.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-item-licitacao',
    templateUrl: './item-licitacao.component.html'
})
export class ItemLicitacaoComponent implements OnInit, OnDestroy {
itemLicitacaos: ItemLicitacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private itemLicitacaoService: ItemLicitacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.itemLicitacaoService.query().subscribe(
            (res: HttpResponse<ItemLicitacao[]>) => {
                this.itemLicitacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInItemLicitacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ItemLicitacao) {
        return item.id;
    }
    registerChangeInItemLicitacaos() {
        this.eventSubscriber = this.eventManager.subscribe('itemLicitacaoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
