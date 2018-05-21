import { BaseEntity } from './../../shared';

export class Operador implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
    ) {
    }
}
