import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { UnidadeOrganizacionalPopupService } from './unidade-organizacional-popup.service';
import { UnidadeOrganizacionalService } from './unidade-organizacional.service';

@Component({
    selector: 'jhi-unidade-organizacional-dialog',
    templateUrl: './unidade-organizacional-dialog.component.html'
})
export class UnidadeOrganizacionalDialogComponent implements OnInit {

    unidadeOrganizacional: UnidadeOrganizacional;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private unidadeOrganizacionalService: UnidadeOrganizacionalService,
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
        if (this.unidadeOrganizacional.id !== undefined) {
            this.subscribeToSaveResponse(
                this.unidadeOrganizacionalService.update(this.unidadeOrganizacional));
        } else {
            this.subscribeToSaveResponse(
                this.unidadeOrganizacionalService.create(this.unidadeOrganizacional));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UnidadeOrganizacional>>) {
        result.subscribe((res: HttpResponse<UnidadeOrganizacional>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UnidadeOrganizacional) {
        this.eventManager.broadcast({ name: 'unidadeOrganizacionalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-unidade-organizacional-popup',
    template: ''
})
export class UnidadeOrganizacionalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unidadeOrganizacionalPopupService: UnidadeOrganizacionalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.unidadeOrganizacionalPopupService
                    .open(UnidadeOrganizacionalDialogComponent as Component, params['id']);
            } else {
                this.unidadeOrganizacionalPopupService
                    .open(UnidadeOrganizacionalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
