import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Disputa } from './disputa.model';
import { DisputaPopupService } from './disputa-popup.service';
import { DisputaService } from './disputa.service';
import { LoteLicitacao, LoteLicitacaoService } from '../lote-licitacao';
import { Fornecedor, FornecedorService } from '../fornecedor';

@Component({
    selector: 'jhi-disputa-dialog',
    templateUrl: './disputa-dialog.component.html'
})
export class DisputaDialogComponent implements OnInit {

    disputa: Disputa;
    isSaving: boolean;

    lotelicitacaos: LoteLicitacao[];

    fornecedors: Fornecedor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private disputaService: DisputaService,
        private loteLicitacaoService: LoteLicitacaoService,
        private fornecedorService: FornecedorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loteLicitacaoService.query()
            .subscribe((res: HttpResponse<LoteLicitacao[]>) => { this.lotelicitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.fornecedorService.query()
            .subscribe((res: HttpResponse<Fornecedor[]>) => { this.fornecedors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.disputa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disputaService.update(this.disputa));
        } else {
            this.subscribeToSaveResponse(
                this.disputaService.create(this.disputa));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Disputa>>) {
        result.subscribe((res: HttpResponse<Disputa>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Disputa) {
        this.eventManager.broadcast({ name: 'disputaListModification', content: 'OK'});
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

    trackFornecedorById(index: number, item: Fornecedor) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-disputa-popup',
    template: ''
})
export class DisputaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disputaPopupService: DisputaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.disputaPopupService
                    .open(DisputaDialogComponent as Component, params['id']);
            } else {
                this.disputaPopupService
                    .open(DisputaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
