import { BaseEntity } from './../../shared';

export class MensagemLicitacao implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public dataHora?: any,
        public mensagem?: string,
        public licitacao?: BaseEntity,
    ) {
    }
}
