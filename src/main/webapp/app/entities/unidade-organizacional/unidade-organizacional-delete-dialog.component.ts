import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { UnidadeOrganizacionalPopupService } from './unidade-organizacional-popup.service';
import { UnidadeOrganizacionalService } from './unidade-organizacional.service';

@Component({
    selector: 'jhi-unidade-organizacional-delete-dialog',
    templateUrl: './unidade-organizacional-delete-dialog.component.html'
})
export class UnidadeOrganizacionalDeleteDialogComponent {

    unidadeOrganizacional: UnidadeOrganizacional;

    constructor(
        private unidadeOrganizacionalService: UnidadeOrganizacionalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.unidadeOrganizacionalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'unidadeOrganizacionalListModification',
                content: 'Deleted an unidadeOrganizacional'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-unidade-organizacional-delete-popup',
    template: ''
})
export class UnidadeOrganizacionalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private unidadeOrganizacionalPopupService: UnidadeOrganizacionalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.unidadeOrganizacionalPopupService
                .open(UnidadeOrganizacionalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
