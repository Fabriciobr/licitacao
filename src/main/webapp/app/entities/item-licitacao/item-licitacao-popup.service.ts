import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ItemLicitacao } from './item-licitacao.model';
import { ItemLicitacaoService } from './item-licitacao.service';

@Injectable()
export class ItemLicitacaoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private itemLicitacaoService: ItemLicitacaoService

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
                this.itemLicitacaoService.find(id)
                    .subscribe((itemLicitacaoResponse: HttpResponse<ItemLicitacao>) => {
                        const itemLicitacao: ItemLicitacao = itemLicitacaoResponse.body;
                        this.ngbModalRef = this.itemLicitacaoModalRef(component, itemLicitacao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.itemLicitacaoModalRef(component, new ItemLicitacao());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    itemLicitacaoModalRef(component: Component, itemLicitacao: ItemLicitacao): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.itemLicitacao = itemLicitacao;
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
