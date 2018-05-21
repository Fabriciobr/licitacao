import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Disputa } from './disputa.model';
import { DisputaPopupService } from './disputa-popup.service';
import { DisputaService } from './disputa.service';

@Component({
    selector: 'jhi-disputa-delete-dialog',
    templateUrl: './disputa-delete-dialog.component.html'
})
export class DisputaDeleteDialogComponent {

    disputa: Disputa;

    constructor(
        private disputaService: DisputaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.disputaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'disputaListModification',
                content: 'Deleted an disputa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disputa-delete-popup',
    template: ''
})
export class DisputaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disputaPopupService: DisputaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.disputaPopupService
                .open(DisputaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
