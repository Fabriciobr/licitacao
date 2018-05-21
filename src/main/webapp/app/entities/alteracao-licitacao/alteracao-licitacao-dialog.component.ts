import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { AlteracaoLicitacaoPopupService } from './alteracao-licitacao-popup.service';
import { AlteracaoLicitacaoService } from './alteracao-licitacao.service';
import { Licitacao, LicitacaoService } from '../licitacao';
import { Operador, OperadorService } from '../operador';

@Component({
    selector: 'jhi-alteracao-licitacao-dialog',
    templateUrl: './alteracao-licitacao-dialog.component.html'
})
export class AlteracaoLicitacaoDialogComponent implements OnInit {

    alteracaoLicitacao: AlteracaoLicitacao;
    isSaving: boolean;

    licitacaos: Licitacao[];

    operadors: Operador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alteracaoLicitacaoService: AlteracaoLicitacaoService,
        private licitacaoService: LicitacaoService,
        private operadorService: OperadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.licitacaoService.query()
            .subscribe((res: HttpResponse<Licitacao[]>) => { this.licitacaos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.operadorService.query()
            .subscribe((res: HttpResponse<Operador[]>) => { this.operadors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alteracaoLicitacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alteracaoLicitacaoService.update(this.alteracaoLicitacao));
        } else {
            this.subscribeToSaveResponse(
                this.alteracaoLicitacaoService.create(this.alteracaoLicitacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlteracaoLicitacao>>) {
        result.subscribe((res: HttpResponse<AlteracaoLicitacao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AlteracaoLicitacao) {
        this.eventManager.broadcast({ name: 'alteracaoLicitacaoListModification', content: 'OK'});
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

    trackOperadorById(index: number, item: Operador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-alteracao-licitacao-popup',
    template: ''
})
export class AlteracaoLicitacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alteracaoLicitacaoPopupService: AlteracaoLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alteracaoLicitacaoPopupService
                    .open(AlteracaoLicitacaoDialogComponent as Component, params['id']);
            } else {
                this.alteracaoLicitacaoPopupService
                    .open(AlteracaoLicitacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
