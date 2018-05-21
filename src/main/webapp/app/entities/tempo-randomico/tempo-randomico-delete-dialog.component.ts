import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TempoRandomico } from './tempo-randomico.model';
import { TempoRandomicoPopupService } from './tempo-randomico-popup.service';
import { TempoRandomicoService } from './tempo-randomico.service';

@Component({
    selector: 'jhi-tempo-randomico-delete-dialog',
    templateUrl: './tempo-randomico-delete-dialog.component.html'
})
export class TempoRandomicoDeleteDialogComponent {

    tempoRandomico: TempoRandomico;

    constructor(
        private tempoRandomicoService: TempoRandomicoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tempoRandomicoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tempoRandomicoListModification',
                content: 'Deleted an tempoRandomico'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tempo-randomico-delete-popup',
    template: ''
})
export class TempoRandomicoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tempoRandomicoPopupService: TempoRandomicoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tempoRandomicoPopupService
                .open(TempoRandomicoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
