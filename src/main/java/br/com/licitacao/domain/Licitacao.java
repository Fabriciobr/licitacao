package br.com.licitacao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.com.licitacao.domain.enumeration.TipoCadastro;

import br.com.licitacao.domain.enumeration.ModalidadeLicitacao;

import br.com.licitacao.domain.enumeration.TipoParticipacaoFornecedor;

import br.com.licitacao.domain.enumeration.FormaConducao;

import br.com.licitacao.domain.enumeration.TipoLicitacao;

import br.com.licitacao.domain.enumeration.Moeda;

import br.com.licitacao.domain.enumeration.AbrangenciaDisputa;

import br.com.licitacao.domain.enumeration.TipoMoedaProposta;

import br.com.licitacao.domain.enumeration.TipoAliquotaDiferenciada;

import br.com.licitacao.domain.enumeration.SituacaoLicitacao;

/**
 * A Licitacao.
 */
@Entity
@Table(name = "licitacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Licitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cadastro")
    private TipoCadastro tipoCadastro;

    @Column(name = "edital")
    private String edital;

    @Column(name = "processo")
    private String processo;

    @Enumerated(EnumType.STRING)
    @Column(name = "modalidade")
    private ModalidadeLicitacao modalidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_participacao_fornecedor")
    private TipoParticipacaoFornecedor tipoParticipacaoFornecedor;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_conducao")
    private FormaConducao formaConducao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoLicitacao tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "moeda")
    private Moeda moeda;

    @Column(name = "prazo_impugnacao")
    private Integer prazoImpugnacao;

    @Column(name = "inicio_acolhimento_propostas")
    private Instant inicioAcolhimentoPropostas;

    @Column(name = "data_hora_disputa")
    private Instant dataHoraDisputa;

    @Column(name = "abertura_propostas")
    private Instant aberturaPropostas;

    @Enumerated(EnumType.STRING)
    @Column(name = "abrangencia_disputa")
    private AbrangenciaDisputa abrangenciaDisputa;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_moeda_proposta")
    private TipoMoedaProposta tipoMoedaProposta;

    @Column(name = "resumo")
    private String resumo;

    @Enumerated(EnumType.STRING)
    @Column(name = "aliquota_diferenciada")
    private TipoAliquotaDiferenciada aliquotaDiferenciada;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoLicitacao situacao;

    @Column(name = "data_hora_publicacao")
    private Instant dataHoraPublicacao;

    @Column(name = "ata")
    private String ata;

    @OneToMany(mappedBy = "licitacao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LoteLicitacao> lotes = new HashSet<>();

    @OneToMany(mappedBy = "licitacao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Anexo> documentos = new HashSet<>();

    @OneToMany(mappedBy = "licitacao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AlteracaoLicitacao> alteracoes = new HashSet<>();

    @OneToMany(mappedBy = "licitacao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fornecedor> interessados = new HashSet<>();

    @ManyToOne
    private Entidade entidade;

    @ManyToOne
    private UnidadeOrganizacional unidadeOrganizacional;

    @ManyToOne
    private Operador pregoeiro;

    @OneToMany(mappedBy = "licitacao")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MensagemLicitacao> mensagens = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public Licitacao numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public TipoCadastro getTipoCadastro() {
        return tipoCadastro;
    }

    public Licitacao tipoCadastro(TipoCadastro tipoCadastro) {
        this.tipoCadastro = tipoCadastro;
        return this;
    }

    public void setTipoCadastro(TipoCadastro tipoCadastro) {
        this.tipoCadastro = tipoCadastro;
    }

    public String getEdital() {
        return edital;
    }

    public Licitacao edital(String edital) {
        this.edital = edital;
        return this;
    }

    public void setEdital(String edital) {
        this.edital = edital;
    }

    public String getProcesso() {
        return processo;
    }

    public Licitacao processo(String processo) {
        this.processo = processo;
        return this;
    }

    public void setProcesso(String processo) {
        this.processo = processo;
    }

    public ModalidadeLicitacao getModalidade() {
        return modalidade;
    }

    public Licitacao modalidade(ModalidadeLicitacao modalidade) {
        this.modalidade = modalidade;
        return this;
    }

    public void setModalidade(ModalidadeLicitacao modalidade) {
        this.modalidade = modalidade;
    }

    public TipoParticipacaoFornecedor getTipoParticipacaoFornecedor() {
        return tipoParticipacaoFornecedor;
    }

    public Licitacao tipoParticipacaoFornecedor(TipoParticipacaoFornecedor tipoParticipacaoFornecedor) {
        this.tipoParticipacaoFornecedor = tipoParticipacaoFornecedor;
        return this;
    }

    public void setTipoParticipacaoFornecedor(TipoParticipacaoFornecedor tipoParticipacaoFornecedor) {
        this.tipoParticipacaoFornecedor = tipoParticipacaoFornecedor;
    }

    public FormaConducao getFormaConducao() {
        return formaConducao;
    }

    public Licitacao formaConducao(FormaConducao formaConducao) {
        this.formaConducao = formaConducao;
        return this;
    }

    public void setFormaConducao(FormaConducao formaConducao) {
        this.formaConducao = formaConducao;
    }

    public TipoLicitacao getTipo() {
        return tipo;
    }

    public Licitacao tipo(TipoLicitacao tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoLicitacao tipo) {
        this.tipo = tipo;
    }

    public Moeda getMoeda() {
        return moeda;
    }

    public Licitacao moeda(Moeda moeda) {
        this.moeda = moeda;
        return this;
    }

    public void setMoeda(Moeda moeda) {
        this.moeda = moeda;
    }

    public Integer getPrazoImpugnacao() {
        return prazoImpugnacao;
    }

    public Licitacao prazoImpugnacao(Integer prazoImpugnacao) {
        this.prazoImpugnacao = prazoImpugnacao;
        return this;
    }

    public void setPrazoImpugnacao(Integer prazoImpugnacao) {
        this.prazoImpugnacao = prazoImpugnacao;
    }

    public Instant getInicioAcolhimentoPropostas() {
        return inicioAcolhimentoPropostas;
    }

    public Licitacao inicioAcolhimentoPropostas(Instant inicioAcolhimentoPropostas) {
        this.inicioAcolhimentoPropostas = inicioAcolhimentoPropostas;
        return this;
    }

    public void setInicioAcolhimentoPropostas(Instant inicioAcolhimentoPropostas) {
        this.inicioAcolhimentoPropostas = inicioAcolhimentoPropostas;
    }

    public Instant getDataHoraDisputa() {
        return dataHoraDisputa;
    }

    public Licitacao dataHoraDisputa(Instant dataHoraDisputa) {
        this.dataHoraDisputa = dataHoraDisputa;
        return this;
    }

    public void setDataHoraDisputa(Instant dataHoraDisputa) {
        this.dataHoraDisputa = dataHoraDisputa;
    }

    public Instant getAberturaPropostas() {
        return aberturaPropostas;
    }

    public Licitacao aberturaPropostas(Instant aberturaPropostas) {
        this.aberturaPropostas = aberturaPropostas;
        return this;
    }

    public void setAberturaPropostas(Instant aberturaPropostas) {
        this.aberturaPropostas = aberturaPropostas;
    }

    public AbrangenciaDisputa getAbrangenciaDisputa() {
        return abrangenciaDisputa;
    }

    public Licitacao abrangenciaDisputa(AbrangenciaDisputa abrangenciaDisputa) {
        this.abrangenciaDisputa = abrangenciaDisputa;
        return this;
    }

    public void setAbrangenciaDisputa(AbrangenciaDisputa abrangenciaDisputa) {
        this.abrangenciaDisputa = abrangenciaDisputa;
    }

    public TipoMoedaProposta getTipoMoedaProposta() {
        return tipoMoedaProposta;
    }

    public Licitacao tipoMoedaProposta(TipoMoedaProposta tipoMoedaProposta) {
        this.tipoMoedaProposta = tipoMoedaProposta;
        return this;
    }

    public void setTipoMoedaProposta(TipoMoedaProposta tipoMoedaProposta) {
        this.tipoMoedaProposta = tipoMoedaProposta;
    }

    public String getResumo() {
        return resumo;
    }

    public Licitacao resumo(String resumo) {
        this.resumo = resumo;
        return this;
    }

    public void setResumo(String resumo) {
        this.resumo = resumo;
    }

    public TipoAliquotaDiferenciada getAliquotaDiferenciada() {
        return aliquotaDiferenciada;
    }

    public Licitacao aliquotaDiferenciada(TipoAliquotaDiferenciada aliquotaDiferenciada) {
        this.aliquotaDiferenciada = aliquotaDiferenciada;
        return this;
    }

    public void setAliquotaDiferenciada(TipoAliquotaDiferenciada aliquotaDiferenciada) {
        this.aliquotaDiferenciada = aliquotaDiferenciada;
    }

    public SituacaoLicitacao getSituacao() {
        return situacao;
    }

    public Licitacao situacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
    }

    public Instant getDataHoraPublicacao() {
        return dataHoraPublicacao;
    }

    public Licitacao dataHoraPublicacao(Instant dataHoraPublicacao) {
        this.dataHoraPublicacao = dataHoraPublicacao;
        return this;
    }

    public void setDataHoraPublicacao(Instant dataHoraPublicacao) {
        this.dataHoraPublicacao = dataHoraPublicacao;
    }

    public String getAta() {
        return ata;
    }

    public Licitacao ata(String ata) {
        this.ata = ata;
        return this;
    }

    public void setAta(String ata) {
        this.ata = ata;
    }

    public Set<LoteLicitacao> getLotes() {
        return lotes;
    }

    public Licitacao lotes(Set<LoteLicitacao> loteLicitacaos) {
        this.lotes = loteLicitacaos;
        return this;
    }

    public Licitacao addLotes(LoteLicitacao loteLicitacao) {
        this.lotes.add(loteLicitacao);
        loteLicitacao.setLicitacao(this);
        return this;
    }

    public Licitacao removeLotes(LoteLicitacao loteLicitacao) {
        this.lotes.remove(loteLicitacao);
        loteLicitacao.setLicitacao(null);
        return this;
    }

    public void setLotes(Set<LoteLicitacao> loteLicitacaos) {
        this.lotes = loteLicitacaos;
    }

    public Set<Anexo> getDocumentos() {
        return documentos;
    }

    public Licitacao documentos(Set<Anexo> anexos) {
        this.documentos = anexos;
        return this;
    }

    public Licitacao addDocumentos(Anexo anexo) {
        this.documentos.add(anexo);
        anexo.setLicitacao(this);
        return this;
    }

    public Licitacao removeDocumentos(Anexo anexo) {
        this.documentos.remove(anexo);
        anexo.setLicitacao(null);
        return this;
    }

    public void setDocumentos(Set<Anexo> anexos) {
        this.documentos = anexos;
    }

    public Set<AlteracaoLicitacao> getAlteracoes() {
        return alteracoes;
    }

    public Licitacao alteracoes(Set<AlteracaoLicitacao> alteracaoLicitacaos) {
        this.alteracoes = alteracaoLicitacaos;
        return this;
    }

    public Licitacao addAlteracoes(AlteracaoLicitacao alteracaoLicitacao) {
        this.alteracoes.add(alteracaoLicitacao);
        alteracaoLicitacao.setLicitacao(this);
        return this;
    }

    public Licitacao removeAlteracoes(AlteracaoLicitacao alteracaoLicitacao) {
        this.alteracoes.remove(alteracaoLicitacao);
        alteracaoLicitacao.setLicitacao(null);
        return this;
    }

    public void setAlteracoes(Set<AlteracaoLicitacao> alteracaoLicitacaos) {
        this.alteracoes = alteracaoLicitacaos;
    }

    public Set<Fornecedor> getInteressados() {
        return interessados;
    }

    public Licitacao interessados(Set<Fornecedor> fornecedors) {
        this.interessados = fornecedors;
        return this;
    }

    public Licitacao addInteressados(Fornecedor fornecedor) {
        this.interessados.add(fornecedor);
        fornecedor.setLicitacao(this);
        return this;
    }

    public Licitacao removeInteressados(Fornecedor fornecedor) {
        this.interessados.remove(fornecedor);
        fornecedor.setLicitacao(null);
        return this;
    }

    public void setInteressados(Set<Fornecedor> fornecedors) {
        this.interessados = fornecedors;
    }

    public Entidade getEntidade() {
        return entidade;
    }

    public Licitacao entidade(Entidade entidade) {
        this.entidade = entidade;
        return this;
    }

    public void setEntidade(Entidade entidade) {
        this.entidade = entidade;
    }

    public UnidadeOrganizacional getUnidadeOrganizacional() {
        return unidadeOrganizacional;
    }

    public Licitacao unidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
        return this;
    }

    public void setUnidadeOrganizacional(UnidadeOrganizacional unidadeOrganizacional) {
        this.unidadeOrganizacional = unidadeOrganizacional;
    }

    public Operador getPregoeiro() {
        return pregoeiro;
    }

    public Licitacao pregoeiro(Operador operador) {
        this.pregoeiro = operador;
        return this;
    }

    public void setPregoeiro(Operador operador) {
        this.pregoeiro = operador;
    }

    public Set<MensagemLicitacao> getMensagens() {
        return mensagens;
    }

    public Licitacao mensagens(Set<MensagemLicitacao> mensagemLicitacaos) {
        this.mensagens = mensagemLicitacaos;
        return this;
    }

    public Licitacao addMensagens(MensagemLicitacao mensagemLicitacao) {
        this.mensagens.add(mensagemLicitacao);
        mensagemLicitacao.setLicitacao(this);
        return this;
    }

    public Licitacao removeMensagens(MensagemLicitacao mensagemLicitacao) {
        this.mensagens.remove(mensagemLicitacao);
        mensagemLicitacao.setLicitacao(null);
        return this;
    }

    public void setMensagens(Set<MensagemLicitacao> mensagemLicitacaos) {
        this.mensagens = mensagemLicitacaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Licitacao licitacao = (Licitacao) o;
        if (licitacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), licitacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Licitacao{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", tipoCadastro='" + getTipoCadastro() + "'" +
            ", edital='" + getEdital() + "'" +
            ", processo='" + getProcesso() + "'" +
            ", modalidade='" + getModalidade() + "'" +
            ", tipoParticipacaoFornecedor='" + getTipoParticipacaoFornecedor() + "'" +
            ", formaConducao='" + getFormaConducao() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", moeda='" + getMoeda() + "'" +
            ", prazoImpugnacao=" + getPrazoImpugnacao() +
            ", inicioAcolhimentoPropostas='" + getInicioAcolhimentoPropostas() + "'" +
            ", dataHoraDisputa='" + getDataHoraDisputa() + "'" +
            ", aberturaPropostas='" + getAberturaPropostas() + "'" +
            ", abrangenciaDisputa='" + getAbrangenciaDisputa() + "'" +
            ", tipoMoedaProposta='" + getTipoMoedaProposta() + "'" +
            ", resumo='" + getResumo() + "'" +
            ", aliquotaDiferenciada='" + getAliquotaDiferenciada() + "'" +
            ", situacao='" + getSituacao() + "'" +
            ", dataHoraPublicacao='" + getDataHoraPublicacao() + "'" +
            ", ata='" + getAta() + "'" +
            "}";
    }
}
