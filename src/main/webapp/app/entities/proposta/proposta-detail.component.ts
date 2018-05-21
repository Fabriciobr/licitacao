import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Proposta } from './proposta.model';
import { PropostaService } from './proposta.service';

@Component({
    selector: 'jhi-proposta-detail',
    templateUrl: './proposta-detail.component.html'
})
export class PropostaDetailComponent implements OnInit, OnDestroy {

    proposta: Proposta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private propostaService: PropostaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPropostas();
    }

    load(id) {
        this.propostaService.find(id)
            .subscribe((propostaResponse: HttpResponse<Proposta>) => {
                this.proposta = propostaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPropostas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'propostaListModification',
            (response) => this.load(this.proposta.id)
        );
    }
}
