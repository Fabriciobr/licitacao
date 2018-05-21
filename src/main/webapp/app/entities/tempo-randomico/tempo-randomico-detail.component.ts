import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TempoRandomico } from './tempo-randomico.model';
import { TempoRandomicoService } from './tempo-randomico.service';

@Component({
    selector: 'jhi-tempo-randomico-detail',
    templateUrl: './tempo-randomico-detail.component.html'
})
export class TempoRandomicoDetailComponent implements OnInit, OnDestroy {

    tempoRandomico: TempoRandomico;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tempoRandomicoService: TempoRandomicoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTempoRandomicos();
    }

    load(id) {
        this.tempoRandomicoService.find(id)
            .subscribe((tempoRandomicoResponse: HttpResponse<TempoRandomico>) => {
                this.tempoRandomico = tempoRandomicoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTempoRandomicos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tempoRandomicoListModification',
            (response) => this.load(this.tempoRandomico.id)
        );
    }
}
