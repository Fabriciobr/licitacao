import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MensagemLicitacao } from './mensagem-licitacao.model';
import { MensagemLicitacaoPopupService } from './mensagem-licitacao-popup.service';
import { MensagemLicitacaoService } from './mensagem-licitacao.service';
import { Licitacao, LicitacaoService } from '../licitacao';

@Component({
    selector: 'jhi-mensagem-licitacao-dialog',
    templateUrl: './mensagem-licitacao-dialog.component.html'
})
export class MensagemLicitacaoDialogComponent implements OnInit {

    mensagemLicitacao: MensagemLicitacao;
    isSaving: boolean;

    licitacaos: Licitacao[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mensagemLicitacaoService: MensagemLicitacaoService,
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
        if (this.mensagemLicitacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mensagemLicitacaoService.update(this.mensagemLicitacao));
        } else {
            this.subscribeToSaveResponse(
                this.mensagemLicitacaoService.create(this.mensagemLicitacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MensagemLicitacao>>) {
        result.subscribe((res: HttpResponse<MensagemLicitacao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MensagemLicitacao) {
        this.eventManager.broadcast({ name: 'mensagemLicitacaoListModification', content: 'OK'});
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
    selector: 'jhi-mensagem-licitacao-popup',
    template: ''
})
export class MensagemLicitacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mensagemLicitacaoPopupService: MensagemLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mensagemLicitacaoPopupService
                    .open(MensagemLicitacaoDialogComponent as Component, params['id']);
            } else {
                this.mensagemLicitacaoPopupService
                    .open(MensagemLicitacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
