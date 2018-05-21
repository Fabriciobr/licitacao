import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Proposta } from './proposta.model';
import { PropostaService } from './proposta.service';

@Injectable()
export class PropostaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private propostaService: PropostaService

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
                this.propostaService.find(id)
                    .subscribe((propostaResponse: HttpResponse<Proposta>) => {
                        const proposta: Proposta = propostaResponse.body;
                        proposta.dataHora = this.datePipe
                            .transform(proposta.dataHora, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.propostaModalRef(component, proposta);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.propostaModalRef(component, new Proposta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    propostaModalRef(component: Component, proposta: Proposta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.proposta = proposta;
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
