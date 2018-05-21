import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Entidade } from './entidade.model';
import { EntidadeService } from './entidade.service';

@Component({
    selector: 'jhi-entidade-detail',
    templateUrl: './entidade-detail.component.html'
})
export class EntidadeDetailComponent implements OnInit, OnDestroy {

    entidade: Entidade;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entidadeService: EntidadeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntidades();
    }

    load(id) {
        this.entidadeService.find(id)
            .subscribe((entidadeResponse: HttpResponse<Entidade>) => {
                this.entidade = entidadeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntidades() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entidadeListModification',
            (response) => this.load(this.entidade.id)
        );
    }
}
