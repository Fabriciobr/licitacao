import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoteLicitacao } from './lote-licitacao.model';
import { LoteLicitacaoPopupService } from './lote-licitacao-popup.service';
import { LoteLicitacaoService } from './lote-licitacao.service';

@Component({
    selector: 'jhi-lote-licitacao-delete-dialog',
    templateUrl: './lote-licitacao-delete-dialog.component.html'
})
export class LoteLicitacaoDeleteDialogComponent {

    loteLicitacao: LoteLicitacao;

    constructor(
        private loteLicitacaoService: LoteLicitacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loteLicitacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'loteLicitacaoListModification',
                content: 'Deleted an loteLicitacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lote-licitacao-delete-popup',
    template: ''
})
export class LoteLicitacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loteLicitacaoPopupService: LoteLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.loteLicitacaoPopupService
                .open(LoteLicitacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
