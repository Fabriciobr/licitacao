import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Disputa } from './disputa.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Disputa>;

@Injectable()
export class DisputaService {

    private resourceUrl =  SERVER_API_URL + 'api/disputas';

    constructor(private http: HttpClient) { }

    create(disputa: Disputa): Observable<EntityResponseType> {
        const copy = this.convert(disputa);
        return this.http.post<Disputa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(disputa: Disputa): Observable<EntityResponseType> {
        const copy = this.convert(disputa);
        return this.http.put<Disputa>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Disputa>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Disputa[]>> {
        const options = createRequestOption(req);
        return this.http.get<Disputa[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Disputa[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Disputa = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Disputa[]>): HttpResponse<Disputa[]> {
        const jsonResponse: Disputa[] = res.body;
        const body: Disputa[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Disputa.
     */
    private convertItemFromServer(disputa: Disputa): Disputa {
        const copy: Disputa = Object.assign({}, disputa);
        return copy;
    }

    /**
     * Convert a Disputa to a JSON which can be sent to the server.
     */
    private convert(disputa: Disputa): Disputa {
        const copy: Disputa = Object.assign({}, disputa);
        return copy;
    }
}
