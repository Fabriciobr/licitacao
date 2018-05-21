import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TempoRandomico } from './tempo-randomico.model';
import { TempoRandomicoPopupService } from './tempo-randomico-popup.service';
import { TempoRandomicoService } from './tempo-randomico.service';

@Component({
    selector: 'jhi-tempo-randomico-dialog',
    templateUrl: './tempo-randomico-dialog.component.html'
})
export class TempoRandomicoDialogComponent implements OnInit {

    tempoRandomico: TempoRandomico;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tempoRandomicoService: TempoRandomicoService,
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
        if (this.tempoRandomico.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tempoRandomicoService.update(this.tempoRandomico));
        } else {
            this.subscribeToSaveResponse(
                this.tempoRandomicoService.create(this.tempoRandomico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TempoRandomico>>) {
        result.subscribe((res: HttpResponse<TempoRandomico>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TempoRandomico) {
        this.eventManager.broadcast({ name: 'tempoRandomicoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tempo-randomico-popup',
    template: ''
})
export class TempoRandomicoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tempoRandomicoPopupService: TempoRandomicoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tempoRandomicoPopupService
                    .open(TempoRandomicoDialogComponent as Component, params['id']);
            } else {
                this.tempoRandomicoPopupService
                    .open(TempoRandomicoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
