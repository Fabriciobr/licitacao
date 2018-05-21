import { BaseEntity } from './../../shared';

export const enum SituacaoLicitacao {
    'SITUACAO',
    'SITU2'
}

export class Proposta implements BaseEntity {
    constructor(
        public id?: number,
        public valor?: number,
        public dataHora?: any,
        public situacao?: SituacaoLicitacao,
        public fornecedor?: BaseEntity,
        public itemLicitacao?: BaseEntity,
    ) {
    }
}
