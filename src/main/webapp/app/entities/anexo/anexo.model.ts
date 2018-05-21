import { BaseEntity } from './../../shared';

export class Anexo implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public licitacao?: BaseEntity,
    ) {
    }
}
