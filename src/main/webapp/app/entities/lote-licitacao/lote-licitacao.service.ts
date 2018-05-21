import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LoteLicitacao } from './lote-licitacao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LoteLicitacao>;

@Injectable()
export class LoteLicitacaoService {

    private resourceUrl =  SERVER_API_URL + 'api/lote-licitacaos';

    constructor(private http: HttpClient) { }

    create(loteLicitacao: LoteLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(loteLicitacao);
        return this.http.post<LoteLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(loteLicitacao: LoteLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(loteLicitacao);
        return this.http.put<LoteLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LoteLicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LoteLicitacao[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoteLicitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LoteLicitacao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LoteLicitacao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LoteLicitacao[]>): HttpResponse<LoteLicitacao[]> {
        const jsonResponse: LoteLicitacao[] = res.body;
        const body: LoteLicitacao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LoteLicitacao.
     */
    private convertItemFromServer(loteLicitacao: LoteLicitacao): LoteLicitacao {
        const copy: LoteLicitacao = Object.assign({}, loteLicitacao);
        return copy;
    }

    /**
     * Convert a LoteLicitacao to a JSON which can be sent to the server.
     */
    private convert(loteLicitacao: LoteLicitacao): LoteLicitacao {
        const copy: LoteLicitacao = Object.assign({}, loteLicitacao);
        return copy;
    }
}
