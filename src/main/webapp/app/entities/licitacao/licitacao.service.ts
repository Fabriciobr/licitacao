import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Licitacao } from './licitacao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Licitacao>;

@Injectable()
export class LicitacaoService {

    private resourceUrl =  SERVER_API_URL + 'api/licitacaos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(licitacao: Licitacao): Observable<EntityResponseType> {
        const copy = this.convert(licitacao);
        return this.http.post<Licitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(licitacao: Licitacao): Observable<EntityResponseType> {
        const copy = this.convert(licitacao);
        return this.http.put<Licitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Licitacao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Licitacao[]>> {
        const options = createRequestOption(req);
        return this.http.get<Licitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Licitacao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Licitacao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Licitacao[]>): HttpResponse<Licitacao[]> {
        const jsonResponse: Licitacao[] = res.body;
        const body: Licitacao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Licitacao.
     */
    private convertItemFromServer(licitacao: Licitacao): Licitacao {
        const copy: Licitacao = Object.assign({}, licitacao);
        copy.inicioAcolhimentoPropostas = this.dateUtils
            .convertDateTimeFromServer(licitacao.inicioAcolhimentoPropostas);
        copy.dataHoraDisputa = this.dateUtils
            .convertDateTimeFromServer(licitacao.dataHoraDisputa);
        copy.aberturaPropostas = this.dateUtils
            .convertDateTimeFromServer(licitacao.aberturaPropostas);
        copy.dataHoraPublicacao = this.dateUtils
            .convertDateTimeFromServer(licitacao.dataHoraPublicacao);
        return copy;
    }

    /**
     * Convert a Licitacao to a JSON which can be sent to the server.
     */
    private convert(licitacao: Licitacao): Licitacao {
        const copy: Licitacao = Object.assign({}, licitacao);

        copy.inicioAcolhimentoPropostas = this.dateUtils.toDate(licitacao.inicioAcolhimentoPropostas);

        copy.dataHoraDisputa = this.dateUtils.toDate(licitacao.dataHoraDisputa);

        copy.aberturaPropostas = this.dateUtils.toDate(licitacao.aberturaPropostas);

        copy.dataHoraPublicacao = this.dateUtils.toDate(licitacao.dataHoraPublicacao);
        return copy;
    }
}
