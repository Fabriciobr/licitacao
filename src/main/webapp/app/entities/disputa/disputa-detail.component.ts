import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Disputa } from './disputa.model';
import { DisputaService } from './disputa.service';

@Component({
    selector: 'jhi-disputa-detail',
    templateUrl: './disputa-detail.component.html'
})
export class DisputaDetailComponent implements OnInit, OnDestroy {

    disputa: Disputa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private disputaService: DisputaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDisputas();
    }

    load(id) {
        this.disputaService.find(id)
            .subscribe((disputaResponse: HttpResponse<Disputa>) => {
                this.disputa = disputaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDisputas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'disputaListModification',
            (response) => this.load(this.disputa.id)
        );
    }
}
