import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { AlteracaoLicitacaoService } from './alteracao-licitacao.service';

@Injectable()
export class AlteracaoLicitacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private alteracaoLicitacaoService: AlteracaoLicitacaoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alteracaoLicitacaoService.find(id)
                    .subscribe((alteracaoLicitacaoResponse: HttpResponse<AlteracaoLicitacao>) => {
                        const alteracaoLicitacao: AlteracaoLicitacao = alteracaoLicitacaoResponse.body;
                        this.ngbModalRef = this.alteracaoLicitacaoModalRef(component, alteracaoLicitacao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alteracaoLicitacaoModalRef(component, new AlteracaoLicitacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alteracaoLicitacaoModalRef(component: Component, alteracaoLicitacao: AlteracaoLicitacao): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.alteracaoLicitacao = alteracaoLicitacao;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
