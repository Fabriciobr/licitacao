import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anexo } from './anexo.model';
import { AnexoPopupService } from './anexo-popup.service';
import { AnexoService } from './anexo.service';
import { Licitacao, LicitacaoService } from '../licitacao';

@Component({
    selector: 'jhi-anexo-dialog',
    templateUrl: './anexo-dialog.component.html'
})
export class AnexoDialogComponent implements OnInit {

    anexo: Anexo;
    isSaving: boolean;

    licitacaos: Licitacao[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private anexoService: AnexoService,
        private licitacaoService: LicitacaoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.licitacaoService.query()
            .subscribe((res: HttpResponse<Licitacao[]>) => { this.licitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.anexo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.anexoService.update(this.anexo));
        } else {
            this.subscribeToSaveResponse(
                this.anexoService.create(this.anexo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Anexo>>) {
        result.subscribe((res: HttpResponse<Anexo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Anexo) {
        this.eventManager.broadcast({ name: 'anexoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-anexo-popup',
    template: ''
})
export class AnexoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anexoPopupService: AnexoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.anexoPopupService
                    .open(AnexoDialogComponent as Component, params['id']);
            } else {
                this.anexoPopupService
                    .open(AnexoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
