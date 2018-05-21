import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Licitacao } from './licitacao.model';
import { LicitacaoPopupService } from './licitacao-popup.service';
import { LicitacaoService } from './licitacao.service';
import { Entidade, EntidadeService } from '../entidade';
import { UnidadeOrganizacional, UnidadeOrganizacionalService } from '../unidade-organizacional';
import { Operador, OperadorService } from '../operador';

@Component({
    selector: 'jhi-licitacao-dialog',
    templateUrl: './licitacao-dialog.component.html'
})
export class LicitacaoDialogComponent implements OnInit {

    licitacao: Licitacao;
    isSaving: boolean;

    entidades: Entidade[];

    unidadeorganizacionals: UnidadeOrganizacional[];

    operadors: Operador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private licitacaoService: LicitacaoService,
        private entidadeService: EntidadeService,
        private unidadeOrganizacionalService: UnidadeOrganizacionalService,
        private operadorService: OperadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entidadeService.query()
            .subscribe((res: HttpResponse<Entidade[]>) => { this.entidades = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.unidadeOrganizacionalService.query()
            .subscribe((res: HttpResponse<UnidadeOrganizacional[]>) => { this.unidadeorganizacionals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.operadorService.query()
            .subscribe((res: HttpResponse<Operador[]>) => { this.operadors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.licitacao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.licitacaoService.update(this.licitacao));
        } else {
            this.subscribeToSaveResponse(
                this.licitacaoService.create(this.licitacao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Licitacao>>) {
        result.subscribe((res: HttpResponse<Licitacao>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Licitacao) {
        this.eventManager.broadcast({ name: 'licitacaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntidadeById(index: number, item: Entidade) {
        return item.id;
    }

    trackUnidadeOrganizacionalById(index: number, item: UnidadeOrganizacional) {
        return item.id;
    }

    trackOperadorById(index: number, item: Operador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-licitacao-popup',
    template: ''
})
export class LicitacaoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private licitacaoPopupService: LicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.licitacaoPopupService
                    .open(LicitacaoDialogComponent as Component, params['id']);
            } else {
                this.licitacaoPopupService
                    .open(LicitacaoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
