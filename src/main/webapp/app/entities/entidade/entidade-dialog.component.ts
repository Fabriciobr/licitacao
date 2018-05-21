import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Entidade } from './entidade.model';
import { EntidadePopupService } from './entidade-popup.service';
import { EntidadeService } from './entidade.service';

@Component({
    selector: 'jhi-entidade-dialog',
    templateUrl: './entidade-dialog.component.html'
})
export class EntidadeDialogComponent implements OnInit {

    entidade: Entidade;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private entidadeService: EntidadeService,
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
        if (this.entidade.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entidadeService.update(this.entidade));
        } else {
            this.subscribeToSaveResponse(
                this.entidadeService.create(this.entidade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Entidade>>) {
        result.subscribe((res: HttpResponse<Entidade>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Entidade) {
        this.eventManager.broadcast({ name: 'entidadeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-entidade-popup',
    template: ''
})
export class EntidadePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entidadePopupService: EntidadePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entidadePopupService
                    .open(EntidadeDialogComponent as Component, params['id']);
            } else {
                this.entidadePopupService
                    .open(EntidadeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
