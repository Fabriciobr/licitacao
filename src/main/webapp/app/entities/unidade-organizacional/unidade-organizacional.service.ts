import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UnidadeOrganizacional } from './unidade-organizacional.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UnidadeOrganizacional>;

@Injectable()
export class UnidadeOrganizacionalService {

    private resourceUrl =  SERVER_API_URL + 'api/unidade-organizacionals';

    constructor(private http: HttpClient) { }

    create(unidadeOrganizacional: UnidadeOrganizacional): Observable<EntityResponseType> {
        const copy = this.convert(unidadeOrganizacional);
        return this.http.post<UnidadeOrganizacional>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(unidadeOrganizacional: UnidadeOrganizacional): Observable<EntityResponseType> {
        const copy = this.convert(unidadeOrganizacional);
        return this.http.put<UnidadeOrganizacional>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UnidadeOrganizacional>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UnidadeOrganizacional[]>> {
        const options = createRequestOption(req);
        return this.http.get<UnidadeOrganizacional[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UnidadeOrganizacional[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UnidadeOrganizacional = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UnidadeOrganizacional[]>): HttpResponse<UnidadeOrganizacional[]> {
        const jsonResponse: UnidadeOrganizacional[] = res.body;
        const body: UnidadeOrganizacional[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UnidadeOrganizacional.
     */
    private convertItemFromServer(unidadeOrganizacional: UnidadeOrganizacional): UnidadeOrganizacional {
        const copy: UnidadeOrganizacional = Object.assign({}, unidadeOrganizacional);
        return copy;
    }

    /**
     * Convert a UnidadeOrganizacional to a JSON which can be sent to the server.
     */
    private convert(unidadeOrganizacional: UnidadeOrganizacional): UnidadeOrganizacional {
        const copy: UnidadeOrganizacional = Object.assign({}, unidadeOrganizacional);
        return copy;
    }
}
