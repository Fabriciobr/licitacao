import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Operador } from './operador.model';
import { OperadorService } from './operador.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-operador',
    templateUrl: './operador.component.html'
})
export class OperadorComponent implements OnInit, OnDestroy {
operadors: Operador[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private operadorService: OperadorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.operadorService.query().subscribe(
            (res: HttpResponse<Operador[]>) => {
                this.operadors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOperadors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Operador) {
        return item.id;
    }
    registerChangeInOperadors() {
        this.eventSubscriber = this.eventManager.subscribe('operadorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
