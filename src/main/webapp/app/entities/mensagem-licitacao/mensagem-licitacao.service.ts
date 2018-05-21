import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MensagemLicitacao } from './mensagem-licitacao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MensagemLicitacao>;

@Injectable()
export class MensagemLicitacaoService {

    private resourceUrl =  SERVER_API_URL + 'api/mensagem-licitacaos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(mensagemLicitacao: MensagemLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(mensagemLicitacao);
        return this.http.post<MensagemLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mensagemLicitacao: MensagemLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(mensagemLicitacao);
        return this.http.put<MensagemLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MensagemLicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MensagemLicitacao[]>> {
        const options = createRequestOption(req);
        return this.http.get<MensagemLicitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MensagemLicitacao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MensagemLicitacao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MensagemLicitacao[]>): HttpResponse<MensagemLicitacao[]> {
        const jsonResponse: MensagemLicitacao[] = res.body;
        const body: MensagemLicitacao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MensagemLicitacao.
     */
    private convertItemFromServer(mensagemLicitacao: MensagemLicitacao): MensagemLicitacao {
        const copy: MensagemLicitacao = Object.assign({}, mensagemLicitacao);
        copy.dataHora = this.dateUtils
            .convertDateTimeFromServer(mensagemLicitacao.dataHora);
        return copy;
    }

    /**
     * Convert a MensagemLicitacao to a JSON which can be sent to the server.
     */
    private convert(mensagemLicitacao: MensagemLicitacao): MensagemLicitacao {
        const copy: MensagemLicitacao = Object.assign({}, mensagemLicitacao);

        copy.dataHora = this.dateUtils.toDate(mensagemLicitacao.dataHora);
        return copy;
    }
}
