import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Anexo } from './anexo.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Anexo>;

@Injectable()
export class AnexoService {

    private resourceUrl =  SERVER_API_URL + 'api/anexos';

    constructor(private http: HttpClient) { }

    create(anexo: Anexo): Observable<EntityResponseType> {
        const copy = this.convert(anexo);
        return this.http.post<Anexo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(anexo: Anexo): Observable<EntityResponseType> {
        const copy = this.convert(anexo);
        return this.http.put<Anexo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Anexo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Anexo[]>> {
        const options = createRequestOption(req);
        return this.http.get<Anexo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Anexo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Anexo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Anexo[]>): HttpResponse<Anexo[]> {
        const jsonResponse: Anexo[] = res.body;
        const body: Anexo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Anexo.
     */
    private convertItemFromServer(anexo: Anexo): Anexo {
        const copy: Anexo = Object.assign({}, anexo);
        return copy;
    }

    /**
     * Convert a Anexo to a JSON which can be sent to the server.
     */
    private convert(anexo: Anexo): Anexo {
        const copy: Anexo = Object.assign({}, anexo);
        return copy;
    }
}
