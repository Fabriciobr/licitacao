import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MensagemLicitacao } from './mensagem-licitacao.model';
import { MensagemLicitacaoService } from './mensagem-licitacao.service';

@Injectable()
export class MensagemLicitacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private mensagemLicitacaoService: MensagemLicitacaoService

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
                this.mensagemLicitacaoService.find(id)
                    .subscribe((mensagemLicitacaoResponse: HttpResponse<MensagemLicitacao>) => {
                        const mensagemLicitacao: MensagemLicitacao = mensagemLicitacaoResponse.body;
                        mensagemLicitacao.dataHora = this.datePipe
                            .transform(mensagemLicitacao.dataHora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.mensagemLicitacaoModalRef(component, mensagemLicitacao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mensagemLicitacaoModalRef(component, new MensagemLicitacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mensagemLicitacaoModalRef(component: Component, mensagemLicitacao: MensagemLicitacao): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mensagemLicitacao = mensagemLicitacao;
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
