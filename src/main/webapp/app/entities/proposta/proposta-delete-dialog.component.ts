import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Proposta } from './proposta.model';
import { PropostaPopupService } from './proposta-popup.service';
import { PropostaService } from './proposta.service';

@Component({
    selector: 'jhi-proposta-delete-dialog',
    templateUrl: './proposta-delete-dialog.component.html'
})
export class PropostaDeleteDialogComponent {

    proposta: Proposta;

    constructor(
        private propostaService: PropostaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.propostaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'propostaListModification',
                content: 'Deleted an proposta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proposta-delete-popup',
    template: ''
})
export class PropostaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private propostaPopupService: PropostaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.propostaPopupService
                .open(PropostaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
