import { BaseEntity } from './../../shared';

export const enum TipoDisputa {
    'TIPO1',
    'TIPO2'
}

export const enum CriterioSelecao {
    'TIPO1',
    'TIPO2'
}

export const enum SituacaoLote {
    'TIPO1',
    'TIPO2'
}

export const enum SituacaoFornecedor {
    'TIPO1',
    'TIPO2'
}

export class LoteLicitacao implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: string,
        public tipoDisputa?: TipoDisputa,
        public criterioSelecao?: CriterioSelecao,
        public tratamentoDiferenciadoMe?: boolean,
        public exclusividadeMe?: boolean,
        public tempoMinimoEntreLances?: number,
        public tempoMinimoMelhorLance?: number,
        public valorMinimoEntreLances?: number,
        public valorMinimoMelhorLance?: number,
        public descricao?: string,
        public situacao?: SituacaoLote,
        public valorSelecionado?: number,
        public valorEstimado?: number,
        public valorAdjudcado?: number,
        public situacaoFornecedor?: SituacaoFornecedor,
        public licitacao?: BaseEntity,
        public fornecedorSelecionado?: BaseEntity,
        public tempoRandomico?: BaseEntity,
        public itens?: BaseEntity[],
    ) {
        this.tratamentoDiferenciadoMe = false;
        this.exclusividadeMe = false;
    }
}
