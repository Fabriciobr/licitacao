import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Operador } from './operador.model';
import { OperadorService } from './operador.service';

@Component({
    selector: 'jhi-operador-detail',
    templateUrl: './operador-detail.component.html'
})
export class OperadorDetailComponent implements OnInit, OnDestroy {

    operador: Operador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private operadorService: OperadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOperadors();
    }

    load(id) {
        this.operadorService.find(id)
            .subscribe((operadorResponse: HttpResponse<Operador>) => {
                this.operador = operadorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOperadors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'operadorListModification',
            (response) => this.load(this.operador.id)
        );
    }
}
