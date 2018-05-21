import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Proposta } from './proposta.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Proposta>;

@Injectable()
export class PropostaService {

    private resourceUrl =  SERVER_API_URL + 'api/propostas';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(proposta: Proposta): Observable<EntityResponseType> {
        const copy = this.convert(proposta);
        return this.http.post<Proposta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(proposta: Proposta): Observable<EntityResponseType> {
        const copy = this.convert(proposta);
        return this.http.put<Proposta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Proposta>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Proposta[]>> {
        const options = createRequestOption(req);
        return this.http.get<Proposta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Proposta[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Proposta = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Proposta[]>): HttpResponse<Proposta[]> {
        const jsonResponse: Proposta[] = res.body;
        const body: Proposta[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Proposta.
     */
    private convertItemFromServer(proposta: Proposta): Proposta {
        const copy: Proposta = Object.assign({}, proposta);
        copy.dataHora = this.dateUtils
            .convertDateTimeFromServer(proposta.dataHora);
        return copy;
    }

    /**
     * Convert a Proposta to a JSON which can be sent to the server.
     */
    private convert(proposta: Proposta): Proposta {
        const copy: Proposta = Object.assign({}, proposta);

        copy.dataHora = this.dateUtils.toDate(proposta.dataHora);
        return copy;
    }
}
