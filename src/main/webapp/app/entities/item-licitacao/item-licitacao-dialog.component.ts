import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ItemLicitacao } from './item-licitacao.model';
import { ItemLicitacaoPopupService } from './item-licitacao-popup.service';
import { ItemLicitacaoService } from './item-licitacao.service';
import { LoteLicitacao, LoteLicitacaoService } from '../lote-licitacao';
import { Produto, ProdutoService } from '../produto';

@Component({
    selector: 'jhi-item-licitacao-dialog',
    templateUrl: './item-licitacao-dialog.component.html'
})
export class ItemLicitacaoDialogComponent implements OnInit {

    itemLicitacao: ItemLicitacao;
    isSaving: boolean;

    lotelicitacaos: LoteLicitacao[];

    produtos: Produto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private itemLicitacaoService: ItemLicitacaoService,
        private loteLicitacaoService: LoteLicitacaoService,
        private produtoService: ProdutoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loteLicitacaoService.query()
            .subscribe((res: HttpResponse<LoteLicitacao[]>) => { this.lotelicitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.produtoService.query()
            .subscribe((res: HttpResponse<Produto[]>) => { this.produtos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.itemLicitacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.itemLicitacaoService.update(this.itemLicitacao));
        } else {
            this.subscribeToSaveResponse(
                this.itemLicitacaoService.create(this.itemLicitacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ItemLicitacao>>) {
        result.subscribe((res: HttpResponse<ItemLicitacao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ItemLicitacao) {
        this.eventManager.broadcast({ name: 'itemLicitacaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLoteLicitacaoById(index: number, item: LoteLicitacao) {
        return item.id;
    }

    trackProdutoById(index: number, item: Produto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-item-licitacao-popup',
    template: ''
})
export class ItemLicitacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemLicitacaoPopupService: ItemLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.itemLicitacaoPopupService
                    .open(ItemLicitacaoDialogComponent as Component, params['id']);
            } else {
                this.itemLicitacaoPopupService
                    .open(ItemLicitacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
