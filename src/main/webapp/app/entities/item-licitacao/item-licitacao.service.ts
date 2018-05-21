import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ItemLicitacao } from './item-licitacao.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ItemLicitacao>;

@Injectable()
export class ItemLicitacaoService {

    private resourceUrl =  SERVER_API_URL + 'api/item-licitacaos';

    constructor(private http: HttpClient) { }

    create(itemLicitacao: ItemLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(itemLicitacao);
        return this.http.post<ItemLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(itemLicitacao: ItemLicitacao): Observable<EntityResponseType> {
        const copy = this.convert(itemLicitacao);
        return this.http.put<ItemLicitacao>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ItemLicitacao>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ItemLicitacao[]>> {
        const options = createRequestOption(req);
        return this.http.get<ItemLicitacao[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ItemLicitacao[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ItemLicitacao = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ItemLicitacao[]>): HttpResponse<ItemLicitacao[]> {
        const jsonResponse: ItemLicitacao[] = res.body;
        const body: ItemLicitacao[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ItemLicitacao.
     */
    private convertItemFromServer(itemLicitacao: ItemLicitacao): ItemLicitacao {
        const copy: ItemLicitacao = Object.assign({}, itemLicitacao);
        return copy;
    }

    /**
     * Convert a ItemLicitacao to a JSON which can be sent to the server.
     */
    private convert(itemLicitacao: ItemLicitacao): ItemLicitacao {
        const copy: ItemLicitacao = Object.assign({}, itemLicitacao);
        return copy;
    }
}
