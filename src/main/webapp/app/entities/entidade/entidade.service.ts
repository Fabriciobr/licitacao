import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Entidade } from './entidade.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Entidade>;

@Injectable()
export class EntidadeService {

    private resourceUrl =  SERVER_API_URL + 'api/entidades';

    constructor(private http: HttpClient) { }

    create(entidade: Entidade): Observable<EntityResponseType> {
        const copy = this.convert(entidade);
        return this.http.post<Entidade>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(entidade: Entidade): Observable<EntityResponseType> {
        const copy = this.convert(entidade);
        return this.http.put<Entidade>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Entidade>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Entidade[]>> {
        const options = createRequestOption(req);
        return this.http.get<Entidade[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Entidade[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Entidade = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Entidade[]>): HttpResponse<Entidade[]> {
        const jsonResponse: Entidade[] = res.body;
        const body: Entidade[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Entidade.
     */
    private convertItemFromServer(entidade: Entidade): Entidade {
        const copy: Entidade = Object.assign({}, entidade);
        return copy;
    }

    /**
     * Convert a Entidade to a JSON which can be sent to the server.
     */
    private convert(entidade: Entidade): Entidade {
        const copy: Entidade = Object.assign({}, entidade);
        return copy;
    }
}
