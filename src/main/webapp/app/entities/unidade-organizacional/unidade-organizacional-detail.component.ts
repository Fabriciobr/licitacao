import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { UnidadeOrganizacionalService } from './unidade-organizacional.service';

@Component({
    selector: 'jhi-unidade-organizacional-detail',
    templateUrl: './unidade-organizacional-detail.component.html'
})
export class UnidadeOrganizacionalDetailComponent implements OnInit, OnDestroy {

    unidadeOrganizacional: UnidadeOrganizacional;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private unidadeOrganizacionalService: UnidadeOrganizacionalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUnidadeOrganizacionals();
    }

    load(id) {
        this.unidadeOrganizacionalService.find(id)
            .subscribe((unidadeOrganizacionalResponse: HttpResponse<UnidadeOrganizacional>) => {
                this.unidadeOrganizacional = unidadeOrganizacionalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUnidadeOrganizacionals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'unidadeOrganizacionalListModification',
            (response) => this.load(this.unidadeOrganizacional.id)
        );
    }
}
