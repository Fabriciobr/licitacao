import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LoteLicitacao } from './lote-licitacao.model';
import { LoteLicitacaoPopupService } from './lote-licitacao-popup.service';
import { LoteLicitacaoService } from './lote-licitacao.service';
import { Licitacao, LicitacaoService } from '../licitacao';
import { Fornecedor, FornecedorService } from '../fornecedor';
import { TempoRandomico, TempoRandomicoService } from '../tempo-randomico';

@Component({
    selector: 'jhi-lote-licitacao-dialog',
    templateUrl: './lote-licitacao-dialog.component.html'
})
export class LoteLicitacaoDialogComponent implements OnInit {

    loteLicitacao: LoteLicitacao;
    isSaving: boolean;

    licitacaos: Licitacao[];

    fornecedors: Fornecedor[];

    temporandomicos: TempoRandomico[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private loteLicitacaoService: LoteLicitacaoService,
        private licitacaoService: LicitacaoService,
        private fornecedorService: FornecedorService,
        private tempoRandomicoService: TempoRandomicoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.licitacaoService.query()
            .subscribe((res: HttpResponse<Licitacao[]>) => { this.licitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.fornecedorService.query()
            .subscribe((res: HttpResponse<Fornecedor[]>) => { this.fornecedors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tempoRandomicoService.query()
            .subscribe((res: HttpResponse<TempoRandomico[]>) => { this.temporandomicos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.loteLicitacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loteLicitacaoService.update(this.loteLicitacao));
        } else {
            this.subscribeToSaveResponse(
                this.loteLicitacaoService.create(this.loteLicitacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LoteLicitacao>>) {
        result.subscribe((res: HttpResponse<LoteLicitacao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LoteLicitacao) {
        this.eventManager.broadcast({ name: 'loteLicitacaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLicitacaoById(index: number, item: Licitacao) {
        return item.id;
    }

    trackFornecedorById(index: number, item: Fornecedor) {
        return item.id;
    }

    trackTempoRandomicoById(index: number, item: TempoRandomico) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lote-licitacao-popup',
    template: ''
})
export class LoteLicitacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loteLicitacaoPopupService: LoteLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.loteLicitacaoPopupService
                    .open(LoteLicitacaoDialogComponent as Component, params['id']);
            } else {
                this.loteLicitacaoPopupService
                    .open(LoteLicitacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
