import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MensagemLicitacao } from './mensagem-licitacao.model';
import { MensagemLicitacaoPopupService } from './mensagem-licitacao-popup.service';
import { MensagemLicitacaoService } from './mensagem-licitacao.service';

@Component({
    selector: 'jhi-mensagem-licitacao-delete-dialog',
    templateUrl: './mensagem-licitacao-delete-dialog.component.html'
})
export class MensagemLicitacaoDeleteDialogComponent {

    mensagemLicitacao: MensagemLicitacao;

    constructor(
        private mensagemLicitacaoService: MensagemLicitacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mensagemLicitacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mensagemLicitacaoListModification',
                content: 'Deleted an mensagemLicitacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mensagem-licitacao-delete-popup',
    template: ''
})
export class MensagemLicitacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mensagemLicitacaoPopupService: MensagemLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mensagemLicitacaoPopupService
                .open(MensagemLicitacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
