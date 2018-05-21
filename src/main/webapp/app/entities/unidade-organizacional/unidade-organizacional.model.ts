import { BaseEntity } from './../../shared';

export class UnidadeOrganizacional implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
    ) {
    }
}
