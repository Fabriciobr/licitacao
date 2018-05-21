import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Entidade } from './entidade.model';
import { EntidadePopupService } from './entidade-popup.service';
import { EntidadeService } from './entidade.service';

@Component({
    selector: 'jhi-entidade-delete-dialog',
    templateUrl: './entidade-delete-dialog.component.html'
})
export class EntidadeDeleteDialogComponent {

    entidade: Entidade;

    constructor(
        private entidadeService: EntidadeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.entidadeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'entidadeListModification',
                content: 'Deleted an entidade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-entidade-delete-popup',
    template: ''
})
export class EntidadeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entidadePopupService: EntidadePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.entidadePopupService
                .open(EntidadeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
