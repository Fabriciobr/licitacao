import { BaseEntity } from './../../shared';

export class Fornecedor implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public licitacao?: BaseEntity,
    ) {
    }
}
