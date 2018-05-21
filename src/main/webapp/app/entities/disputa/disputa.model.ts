import { BaseEntity } from './../../shared';

export class Disputa implements BaseEntity {
    constructor(
        public id?: number,
        public melhorLance?: number,
        public melhorProposta?: number,
        public variacao?: number,
        public duracao?: number,
        public loteLicitacao?: BaseEntity,
        public participantes?: BaseEntity[],
    ) {
    }
}
