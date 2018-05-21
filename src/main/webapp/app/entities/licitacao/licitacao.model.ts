import { BaseEntity } from './../../shared';

export const enum TipoCadastro {
    'AQUISICAO',
    'SIMULACAO'
}

export const enum ModalidadeLicitacao {
    'TIPO1',
    'TIPO2'
}

export const enum TipoParticipacaoFornecedor {
    'TIPO1',
    'TIPO2'
}

export const enum FormaConducao {
    'TIPO1',
    'TIPO2'
}

export const enum TipoLicitacao {
    'TIPO1',
    'TIPO2'
}

export const enum Moeda {
    'REAL',
    'DOLAR',
    'EURO'
}

export const enum AbrangenciaDisputa {
    'TIPO1',
    'TIPO2'
}

export const enum TipoMoedaProposta {
    'MOEDA_DA_PROPOSTA',
    'MOEDA_DO_PAIS_DO_FORNECEDOR'
}

export const enum TipoAliquotaDiferenciada {
    'TIPO1',
    'TIPO2'
}

export const enum SituacaoLicitacao {
    'SITUACAO',
    'SITU2'
}

export class Licitacao implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: string,
        public tipoCadastro?: TipoCadastro,
        public edital?: string,
        public processo?: string,
        public modalidade?: ModalidadeLicitacao,
        public tipoParticipacaoFornecedor?: TipoParticipacaoFornecedor,
        public formaConducao?: FormaConducao,
        public tipo?: TipoLicitacao,
        public moeda?: Moeda,
        public prazoImpugnacao?: number,
        public inicioAcolhimentoPropostas?: any,
        public dataHoraDisputa?: any,
        public aberturaPropostas?: any,
        public abrangenciaDisputa?: AbrangenciaDisputa,
        public tipoMoedaProposta?: TipoMoedaProposta,
        public resumo?: string,
        public aliquotaDiferenciada?: TipoAliquotaDiferenciada,
        public situacao?: SituacaoLicitacao,
        public dataHoraPublicacao?: any,
        public ata?: string,
        public lotes?: BaseEntity[],
        public documentos?: BaseEntity[],
        public alteracoes?: BaseEntity[],
        public interessados?: BaseEntity[],
        public entidade?: BaseEntity,
        public unidadeOrganizacional?: BaseEntity,
        public pregoeiro?: BaseEntity,
        public mensagens?: BaseEntity[],
    ) {
    }
}
