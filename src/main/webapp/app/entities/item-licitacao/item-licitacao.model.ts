import { BaseEntity } from './../../shared';

export class ItemLicitacao implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: string,
        public quantidade?: number,
        public descricao?: string,
        public lote?: BaseEntity,
        public produto?: BaseEntity,
    ) {
    }
}
