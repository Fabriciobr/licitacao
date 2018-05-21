import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Operador } from './operador.model';
import { OperadorPopupService } from './operador-popup.service';
import { OperadorService } from './operador.service';

@Component({
    selector: 'jhi-operador-delete-dialog',
    templateUrl: './operador-delete-dialog.component.html'
})
export class OperadorDeleteDialogComponent {

    operador: Operador;

    constructor(
        private operadorService: OperadorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.operadorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'operadorListModification',
                content: 'Deleted an operador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-operador-delete-popup',
    template: ''
})
export class OperadorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operadorPopupService: OperadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.operadorPopupService
                .open(OperadorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
