import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { AlteracaoLicitacaoPopupService } from './alteracao-licitacao-popup.service';
import { AlteracaoLicitacaoService } from './alteracao-licitacao.service';

@Component({
    selector: 'jhi-alteracao-licitacao-delete-dialog',
    templateUrl: './alteracao-licitacao-delete-dialog.component.html'
})
export class AlteracaoLicitacaoDeleteDialogComponent {

    alteracaoLicitacao: AlteracaoLicitacao;

    constructor(
        private alteracaoLicitacaoService: AlteracaoLicitacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alteracaoLicitacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alteracaoLicitacaoListModification',
                content: 'Deleted an alteracaoLicitacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alteracao-licitacao-delete-popup',
    template: ''
})
export class AlteracaoLicitacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alteracaoLicitacaoPopupService: AlteracaoLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alteracaoLicitacaoPopupService
                .open(AlteracaoLicitacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
