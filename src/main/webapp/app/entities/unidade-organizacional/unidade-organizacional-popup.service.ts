import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { UnidadeOrganizacionalService } from './unidade-organizacional.service';

@Injectable()
export class UnidadeOrganizacionalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private unidadeOrganizacionalService: UnidadeOrganizacionalService

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
                this.unidadeOrganizacionalService.find(id)
                    .subscribe((unidadeOrganizacionalResponse: HttpResponse<UnidadeOrganizacional>) => {
                        const unidadeOrganizacional: UnidadeOrganizacional = unidadeOrganizacionalResponse.body;
                        this.ngbModalRef = this.unidadeOrganizacionalModalRef(component, unidadeOrganizacional);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.unidadeOrganizacionalModalRef(component, new UnidadeOrganizacional());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    unidadeOrganizacionalModalRef(component: Component, unidadeOrganizacional: UnidadeOrganizacional): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.unidadeOrganizacional = unidadeOrganizacional;
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
