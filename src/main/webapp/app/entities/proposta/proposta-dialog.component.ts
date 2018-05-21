import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Proposta } from './proposta.model';
import { PropostaPopupService } from './proposta-popup.service';
import { PropostaService } from './proposta.service';
import { Fornecedor, FornecedorService } from '../fornecedor';
import { ItemLicitacao, ItemLicitacaoService } from '../item-licitacao';

@Component({
    selector: 'jhi-proposta-dialog',
    templateUrl: './proposta-dialog.component.html'
})
export class PropostaDialogComponent implements OnInit {

    proposta: Proposta;
    isSaving: boolean;

    fornecedors: Fornecedor[];

    itemlicitacaos: ItemLicitacao[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private propostaService: PropostaService,
        private fornecedorService: FornecedorService,
        private itemLicitacaoService: ItemLicitacaoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fornecedorService.query()
            .subscribe((res: HttpResponse<Fornecedor[]>) => { this.fornecedors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.itemLicitacaoService.query()
            .subscribe((res: HttpResponse<ItemLicitacao[]>) => { this.itemlicitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.proposta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.propostaService.update(this.proposta));
        } else {
            this.subscribeToSaveResponse(
                this.propostaService.create(this.proposta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Proposta>>) {
        result.subscribe((res: HttpResponse<Proposta>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Proposta) {
        this.eventManager.broadcast({ name: 'propostaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFornecedorById(index: number, item: Fornecedor) {
        return item.id;
    }

    trackItemLicitacaoById(index: number, item: ItemLicitacao) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-proposta-popup',
    template: ''
})
export class PropostaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaPopupService: PropostaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.propostaPopupService
                    .open(PropostaDialogComponent as Component, params['id']);
            } else {
                this.propostaPopupService
                    .open(PropostaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
