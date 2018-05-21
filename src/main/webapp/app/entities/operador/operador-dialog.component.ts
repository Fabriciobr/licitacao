import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Operador } from './operador.model';
import { OperadorPopupService } from './operador-popup.service';
import { OperadorService } from './operador.service';

@Component({
    selector: 'jhi-operador-dialog',
    templateUrl: './operador-dialog.component.html'
})
export class OperadorDialogComponent implements OnInit {

    operador: Operador;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private operadorService: OperadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.operador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.operadorService.update(this.operador));
        } else {
            this.subscribeToSaveResponse(
                this.operadorService.create(this.operador));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Operador>>) {
        result.subscribe((res: HttpResponse<Operador>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Operador) {
        this.eventManager.broadcast({ name: 'operadorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-operador-popup',
    template: ''
})
export class OperadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operadorPopupService: OperadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operadorPopupService
                    .open(OperadorDialogComponent as Component, params['id']);
            } else {
                this.operadorPopupService
                    .open(OperadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
