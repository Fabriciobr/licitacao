import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Licitacao } from './licitacao.model';
import { LicitacaoPopupService } from './licitacao-popup.service';
import { LicitacaoService } from './licitacao.service';

@Component({
    selector: 'jhi-licitacao-delete-dialog',
    templateUrl: './licitacao-delete-dialog.component.html'
})
export class LicitacaoDeleteDialogComponent {

    licitacao: Licitacao;

    constructor(
        private licitacaoService: LicitacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.licitacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'licitacaoListModification',
                content: 'Deleted an licitacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-licitacao-delete-popup',
    template: ''
})
export class LicitacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private licitacaoPopupService: LicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.licitacaoPopupService
                .open(LicitacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
