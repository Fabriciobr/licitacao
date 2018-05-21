import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Produto } from './produto.model';
import { ProdutoService } from './produto.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-produto',
    templateUrl: './produto.component.html'
})
export class ProdutoComponent implements OnInit, OnDestroy {
produtos: Produto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private produtoService: ProdutoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.produtoService.query().subscribe(
            (res: HttpResponse<Produto[]>) => {
                this.produtos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProdutos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Produto) {
        return item.id;
    }
    registerChangeInProdutos() {
        this.eventSubscriber = this.eventManager.subscribe('produtoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
