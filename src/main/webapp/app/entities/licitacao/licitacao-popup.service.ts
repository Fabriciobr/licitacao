import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Licitacao } from './licitacao.model';
import { LicitacaoService } from './licitacao.service';

@Injectable()
export class LicitacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private licitacaoService: LicitacaoService

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
                this.licitacaoService.find(id)
                    .subscribe((licitacaoResponse: HttpResponse<Licitacao>) => {
                        const licitacao: Licitacao = licitacaoResponse.body;
                        licitacao.inicioAcolhimentoPropostas = this.datePipe
                            .transform(licitacao.inicioAcolhimentoPropostas, 'yyyy-MM-ddTHH:mm:ss');
                        licitacao.dataHoraDisputa = this.datePipe
                            .transform(licitacao.dataHoraDisputa, 'yyyy-MM-ddTHH:mm:ss');
                        licitacao.aberturaPropostas = this.datePipe
                            .transform(licitacao.aberturaPropostas, 'yyyy-MM-ddTHH:mm:ss');
                        licitacao.dataHoraPublicacao = this.datePipe
                            .transform(licitacao.dataHoraPublicacao, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.licitacaoModalRef(component, licitacao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.licitacaoModalRef(component, new Licitacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    licitacaoModalRef(component: Component, licitacao: Licitacao): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.licitacao = licitacao;
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
