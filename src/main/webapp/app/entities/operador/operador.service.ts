import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Operador } from './operador.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Operador>;

@Injectable()
export class OperadorService {

    private resourceUrl =  SERVER_API_URL + 'api/operadors';

    constructor(private http: HttpClient) { }

    create(operador: Operador): Observable<EntityResponseType> {
        const copy = this.convert(operador);
        return this.http.post<Operador>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(operador: Operador): Observable<EntityResponseType> {
        const copy = this.convert(operador);
        return this.http.put<Operador>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Operador>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Operador[]>> {
        const options = createRequestOption(req);
        return this.http.get<Operador[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Operador[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Operador = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Operador[]>): HttpResponse<Operador[]> {
        const jsonResponse: Operador[] = res.body;
        const body: Operador[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Operador.
     */
    private convertItemFromServer(operador: Operador): Operador {
        const copy: Operador = Object.assign({}, operador);
        return copy;
    }

    /**
     * Convert a Operador to a JSON which can be sent to the server.
     */
    private convert(operador: Operador): Operador {
        const copy: Operador = Object.assign({}, operador);
        return copy;
    }
}
