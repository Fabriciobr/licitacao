import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anexo } from './anexo.model';
import { AnexoService } from './anexo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-anexo',
    templateUrl: './anexo.component.html'
})
export class AnexoComponent implements OnInit, OnDestroy {
anexos: Anexo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private anexoService: AnexoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.anexoService.query().subscribe(
            (res: HttpResponse<Anexo[]>) => {
                this.anexos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAnexos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Anexo) {
        return item.id;
    }
    registerChangeInAnexos() {
        this.eventSubscriber = this.eventManager.subscribe('anexoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
