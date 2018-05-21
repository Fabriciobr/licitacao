import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AlteracaoLicitacao } from './alteracao-licitacao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlteracaoLicitacao>;

@Injectable()
export class AlteracaoLicitacaoService {

    private resourceUrl =  SERVER_API_URL + 'api/alteracao-licitacaos';

    constructor(private http: HttpClient) { }

    create(alteracaoLicitacao: AlteracaoLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(alteracaoLicitacao);
        return this.http.post<AlteracaoLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alteracaoLicitacao: AlteracaoLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(alteracaoLicitacao);
        return this.http.put<AlteracaoLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AlteracaoLicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlteracaoLicitacao[]>> {
        const options = createRequestOption(req);
        return this.http.get<AlteracaoLicitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlteracaoLicitacao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlteracaoLicitacao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AlteracaoLicitacao[]>): HttpResponse<AlteracaoLicitacao[]> {
        const jsonResponse: AlteracaoLicitacao[] = res.body;
        const body: AlteracaoLicitacao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AlteracaoLicitacao.
     */
    private convertItemFromServer(alteracaoLicitacao: AlteracaoLicitacao): AlteracaoLicitacao {
        const copy: AlteracaoLicitacao = Object.assign({}, alteracaoLicitacao);
        return copy;
    }

    /**
     * Convert a AlteracaoLicitacao to a JSON which can be sent to the server.
     */
    private convert(alteracaoLicitacao: AlteracaoLicitacao): AlteracaoLicitacao {
        const copy: AlteracaoLicitacao = Object.assign({}, alteracaoLicitacao);
        return copy;
    }
}
