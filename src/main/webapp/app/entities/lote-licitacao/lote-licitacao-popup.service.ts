import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { LoteLicitacao } from './lote-licitacao.model';
import { LoteLicitacaoService } from './lote-licitacao.service';

@Injectable()
export class LoteLicitacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private loteLicitacaoService: LoteLicitacaoService

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
                this.loteLicitacaoService.find(id)
                    .subscribe((loteLicitacaoResponse: HttpResponse<LoteLicitacao>) => {
                        const loteLicitacao: LoteLicitacao = loteLicitacaoResponse.body;
                        this.ngbModalRef = this.loteLicitacaoModalRef(component, loteLicitacao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.loteLicitacaoModalRef(component, new LoteLicitacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    loteLicitacaoModalRef(component: Component, loteLicitacao: LoteLicitacao): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.loteLicitacao = loteLicitacao;
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
