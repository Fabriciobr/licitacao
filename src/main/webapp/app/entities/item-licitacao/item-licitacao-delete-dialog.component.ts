import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ItemLicitacao } from './item-licitacao.model';
import { ItemLicitacaoPopupService } from './item-licitacao-popup.service';
import { ItemLicitacaoService } from './item-licitacao.service';

@Component({
    selector: 'jhi-item-licitacao-delete-dialog',
    templateUrl: './item-licitacao-delete-dialog.component.html'
})
export class ItemLicitacaoDeleteDialogComponent {

    itemLicitacao: ItemLicitacao;

    constructor(
        private itemLicitacaoService: ItemLicitacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.itemLicitacaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'itemLicitacaoListModification',
                content: 'Deleted an itemLicitacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-item-licitacao-delete-popup',
    template: ''
})
export class ItemLicitacaoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private itemLicitacaoPopupService: ItemLicitacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.itemLicitacaoPopupService
                .open(ItemLicitacaoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
