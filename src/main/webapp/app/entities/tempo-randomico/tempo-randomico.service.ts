import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TempoRandomico } from './tempo-randomico.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TempoRandomico>;

@Injectable()
export class TempoRandomicoService {

    private resourceUrl =  SERVER_API_URL + 'api/tempo-randomicos';

    constructor(private http: HttpClient) { }

    create(tempoRandomico: TempoRandomico): Observable<EntityResponseType> {
        const copy = this.convert(tempoRandomico);
        return this.http.post<TempoRandomico>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tempoRandomico: TempoRandomico): Observable<EntityResponseType> {
        const copy = this.convert(tempoRandomico);
        return this.http.put<TempoRandomico>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TempoRandomico>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TempoRandomico[]>> {
        const options = createRequestOption(req);
        return this.http.get<TempoRandomico[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TempoRandomico[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TempoRandomico = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TempoRandomico[]>): HttpResponse<TempoRandomico[]> {
        const jsonResponse: TempoRandomico[] = res.body;
        const body: TempoRandomico[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TempoRandomico.
     */
    private convertItemFromServer(tempoRandomico: TempoRandomico): TempoRandomico {
        const copy: TempoRandomico = Object.assign({}, tempoRandomico);
        return copy;
    }

    /**
     * Convert a TempoRandomico to a JSON which can be sent to the server.
     */
    private convert(tempoRandomico: TempoRandomico): TempoRandomico {
        const copy: TempoRandomico = Object.assign({}, tempoRandomico);
        return copy;
    }
}
