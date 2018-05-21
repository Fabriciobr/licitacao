package br.com.licitacao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.com.licitacao.domain.enumeration.TipoDisputa;

import br.com.licitacao.domain.enumeration.CriterioSelecao;

import br.com.licitacao.domain.enumeration.SituacaoLote;

import br.com.licitacao.domain.enumeration.SituacaoFornecedor;

/**
 * A LoteLicitacao.
 */
@Entity
@Table(name = "lote_licitacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class LoteLicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_disputa")
    private TipoDisputa tipoDisputa;

    @Enumerated(EnumType.STRING)
    @Column(name = "criterio_selecao")
    private CriterioSelecao criterioSelecao;

    @Column(name = "tratamento_diferenciado_me")
    private Boolean tratamentoDiferenciadoMe;

    @Column(name = "exclusividade_me")
    private Boolean exclusividadeMe;

    @Column(name = "tempo_minimo_entre_lances")
    private Integer tempoMinimoEntreLances;

    @Column(name = "tempo_minimo_melhor_lance")
    private Integer tempoMinimoMelhorLance;

    @Column(name = "valor_minimo_entre_lances")
    private Double valorMinimoEntreLances;

    @Column(name = "valor_minimo_melhor_lance")
    private Double valorMinimoMelhorLance;

    @Column(name = "descricao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoLote situacao;

    @Column(name = "valor_selecionado")
    private Double valorSelecionado;

    @Column(name = "valor_estimado")
    private Double valorEstimado;

    @Column(name = "valor_adjudcado")
    private Double valorAdjudcado;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao_fornecedor")
    private SituacaoFornecedor situacaoFornecedor;

    @ManyToOne
    private Licitacao licitacao;

    @ManyToOne
    private Fornecedor fornecedorSelecionado;

    @ManyToOne
    private TempoRandomico tempoRandomico;

    @OneToMany(mappedBy = "lote")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ItemLicitacao> itens = new HashSet<>();

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

    public LoteLicitacao numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public TipoDisputa getTipoDisputa() {
        return tipoDisputa;
    }

    public LoteLicitacao tipoDisputa(TipoDisputa tipoDisputa) {
        this.tipoDisputa = tipoDisputa;
        return this;
    }

    public void setTipoDisputa(TipoDisputa tipoDisputa) {
        this.tipoDisputa = tipoDisputa;
    }

    public CriterioSelecao getCriterioSelecao() {
        return criterioSelecao;
    }

    public LoteLicitacao criterioSelecao(CriterioSelecao criterioSelecao) {
        this.criterioSelecao = criterioSelecao;
        return this;
    }

    public void setCriterioSelecao(CriterioSelecao criterioSelecao) {
        this.criterioSelecao = criterioSelecao;
    }

    public Boolean isTratamentoDiferenciadoMe() {
        return tratamentoDiferenciadoMe;
    }

    public LoteLicitacao tratamentoDiferenciadoMe(Boolean tratamentoDiferenciadoMe) {
        this.tratamentoDiferenciadoMe = tratamentoDiferenciadoMe;
        return this;
    }

    public void setTratamentoDiferenciadoMe(Boolean tratamentoDiferenciadoMe) {
        this.tratamentoDiferenciadoMe = tratamentoDiferenciadoMe;
    }

    public Boolean isExclusividadeMe() {
        return exclusividadeMe;
    }

    public LoteLicitacao exclusividadeMe(Boolean exclusividadeMe) {
        this.exclusividadeMe = exclusividadeMe;
        return this;
    }

    public void setExclusividadeMe(Boolean exclusividadeMe) {
        this.exclusividadeMe = exclusividadeMe;
    }

    public Integer getTempoMinimoEntreLances() {
        return tempoMinimoEntreLances;
    }

    public LoteLicitacao tempoMinimoEntreLances(Integer tempoMinimoEntreLances) {
        this.tempoMinimoEntreLances = tempoMinimoEntreLances;
        return this;
    }

    public void setTempoMinimoEntreLances(Integer tempoMinimoEntreLances) {
        this.tempoMinimoEntreLances = tempoMinimoEntreLances;
    }

    public Integer getTempoMinimoMelhorLance() {
        return tempoMinimoMelhorLance;
    }

    public LoteLicitacao tempoMinimoMelhorLance(Integer tempoMinimoMelhorLance) {
        this.tempoMinimoMelhorLance = tempoMinimoMelhorLance;
        return this;
    }

    public void setTempoMinimoMelhorLance(Integer tempoMinimoMelhorLance) {
        this.tempoMinimoMelhorLance = tempoMinimoMelhorLance;
    }

    public Double getValorMinimoEntreLances() {
        return valorMinimoEntreLances;
    }

    public LoteLicitacao valorMinimoEntreLances(Double valorMinimoEntreLances) {
        this.valorMinimoEntreLances = valorMinimoEntreLances;
        return this;
    }

    public void setValorMinimoEntreLances(Double valorMinimoEntreLances) {
        this.valorMinimoEntreLances = valorMinimoEntreLances;
    }

    public Double getValorMinimoMelhorLance() {
        return valorMinimoMelhorLance;
    }

    public LoteLicitacao valorMinimoMelhorLance(Double valorMinimoMelhorLance) {
        this.valorMinimoMelhorLance = valorMinimoMelhorLance;
        return this;
    }

    public void setValorMinimoMelhorLance(Double valorMinimoMelhorLance) {
        this.valorMinimoMelhorLance = valorMinimoMelhorLance;
    }

    public String getDescricao() {
        return descricao;
    }

    public LoteLicitacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public SituacaoLote getSituacao() {
        return situacao;
    }

    public LoteLicitacao situacao(SituacaoLote situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoLote situacao) {
        this.situacao = situacao;
    }

    public Double getValorSelecionado() {
        return valorSelecionado;
    }

    public LoteLicitacao valorSelecionado(Double valorSelecionado) {
        this.valorSelecionado = valorSelecionado;
        return this;
    }

    public void setValorSelecionado(Double valorSelecionado) {
        this.valorSelecionado = valorSelecionado;
    }

    public Double getValorEstimado() {
        return valorEstimado;
    }

    public LoteLicitacao valorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
        return this;
    }

    public void setValorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
    }

    public Double getValorAdjudcado() {
        return valorAdjudcado;
    }

    public LoteLicitacao valorAdjudcado(Double valorAdjudcado) {
        this.valorAdjudcado = valorAdjudcado;
        return this;
    }

    public void setValorAdjudcado(Double valorAdjudcado) {
        this.valorAdjudcado = valorAdjudcado;
    }

    public SituacaoFornecedor getSituacaoFornecedor() {
        return situacaoFornecedor;
    }

    public LoteLicitacao situacaoFornecedor(SituacaoFornecedor situacaoFornecedor) {
        this.situacaoFornecedor = situacaoFornecedor;
        return this;
    }

    public void setSituacaoFornecedor(SituacaoFornecedor situacaoFornecedor) {
        this.situacaoFornecedor = situacaoFornecedor;
    }

    public Licitacao getLicitacao() {
        return licitacao;
    }

    public LoteLicitacao licitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
        return this;
    }

    public void setLicitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
    }

    public Fornecedor getFornecedorSelecionado() {
        return fornecedorSelecionado;
    }

    public LoteLicitacao fornecedorSelecionado(Fornecedor fornecedor) {
        this.fornecedorSelecionado = fornecedor;
        return this;
    }

    public void setFornecedorSelecionado(Fornecedor fornecedor) {
        this.fornecedorSelecionado = fornecedor;
    }

    public TempoRandomico getTempoRandomico() {
        return tempoRandomico;
    }

    public LoteLicitacao tempoRandomico(TempoRandomico tempoRandomico) {
        this.tempoRandomico = tempoRandomico;
        return this;
    }

    public void setTempoRandomico(TempoRandomico tempoRandomico) {
        this.tempoRandomico = tempoRandomico;
    }

    public Set<ItemLicitacao> getItens() {
        return itens;
    }

    public LoteLicitacao itens(Set<ItemLicitacao> itemLicitacaos) {
        this.itens = itemLicitacaos;
        return this;
    }

    public LoteLicitacao addItens(ItemLicitacao itemLicitacao) {
        this.itens.add(itemLicitacao);
        itemLicitacao.setLote(this);
        return this;
    }

    public LoteLicitacao removeItens(ItemLicitacao itemLicitacao) {
        this.itens.remove(itemLicitacao);
        itemLicitacao.setLote(null);
        return this;
    }

    public void setItens(Set<ItemLicitacao> itemLicitacaos) {
        this.itens = itemLicitacaos;
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
        LoteLicitacao loteLicitacao = (LoteLicitacao) o;
        if (loteLicitacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loteLicitacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoteLicitacao{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", tipoDisputa='" + getTipoDisputa() + "'" +
            ", criterioSelecao='" + getCriterioSelecao() + "'" +
            ", tratamentoDiferenciadoMe='" + isTratamentoDiferenciadoMe() + "'" +
            ", exclusividadeMe='" + isExclusividadeMe() + "'" +
            ", tempoMinimoEntreLances=" + getTempoMinimoEntreLances() +
            ", tempoMinimoMelhorLance=" + getTempoMinimoMelhorLance() +
            ", valorMinimoEntreLances=" + getValorMinimoEntreLances() +
            ", valorMinimoMelhorLance=" + getValorMinimoMelhorLance() +
            ", descricao='" + getDescricao() + "'" +
            ", situacao='" + getSituacao() + "'" +
            ", valorSelecionado=" + getValorSelecionado() +
            ", valorEstimado=" + getValorEstimado() +
            ", valorAdjudcado=" + getValorAdjudcado() +
            ", situacaoFornecedor='" + getSituacaoFornecedor() + "'" +
            "}";
    }
}
