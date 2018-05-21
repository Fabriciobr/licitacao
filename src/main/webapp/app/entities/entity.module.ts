import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LicitacaoPropostaModule } from './proposta/proposta.module';
import { LicitacaoTempoRandomicoModule } from './tempo-randomico/tempo-randomico.module';
import { LicitacaoOperadorModule } from './operador/operador.module';
import { LicitacaoFornecedorModule } from './fornecedor/fornecedor.module';
import { LicitacaoDisputaModule } from './disputa/disputa.module';
import { LicitacaoProdutoModule } from './produto/produto.module';
import { LicitacaoUnidadeOrganizacionalModule } from './unidade-organizacional/unidade-organizacional.module';
import { LicitacaoLicitacaoModule } from './licitacao/licitacao.module';
import { LicitacaoAnexoModule } from './anexo/anexo.module';
import { LicitacaoEntidadeModule } from './entidade/entidade.module';
import { LicitacaoLoteLicitacaoModule } from './lote-licitacao/lote-licitacao.module';
import { LicitacaoItemLicitacaoModule } from './item-licitacao/item-licitacao.module';
import { LicitacaoMensagemLicitacaoModule } from './mensagem-licitacao/mensagem-licitacao.module';
import { LicitacaoAlteracaoLicitacaoModule } from './alteracao-licitacao/alteracao-licitacao.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LicitacaoPropostaModule,
        LicitacaoTempoRandomicoModule,
        LicitacaoOperadorModule,
        LicitacaoFornecedorModule,
        LicitacaoDisputaModule,
        LicitacaoProdutoModule,
        LicitacaoUnidadeOrganizacionalModule,
        LicitacaoLicitacaoModule,
        LicitacaoAnexoModule,
        LicitacaoEntidadeModule,
        LicitacaoLoteLicitacaoModule,
        LicitacaoItemLicitacaoModule,
        LicitacaoMensagemLicitacaoModule,
        LicitacaoAlteracaoLicitacaoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LicitacaoEntityModule {}
