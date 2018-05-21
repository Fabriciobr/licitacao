import { BaseEntity } from './../../shared';

export class Entidade implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
    ) {
    }
}
