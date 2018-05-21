import { BaseEntity } from './../../shared';

export const enum SituacaoLicitacao {
    'SITUACAO',
    'SITU2'
}

export class AlteracaoLicitacao implements BaseEntity {
    constructor(
        public id?: number,
        public situacao?: SituacaoLicitacao,
        public motivo?: string,
        public licitacao?: BaseEntity,
        public operador?: BaseEntity,
    ) {
    }
}
