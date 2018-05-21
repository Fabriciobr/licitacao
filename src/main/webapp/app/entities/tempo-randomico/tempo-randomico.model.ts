import { BaseEntity } from './../../shared';

export class TempoRandomico implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public tempoMinimo?: number,
        public tempoMaximo?: number,
    ) {
    }
}
