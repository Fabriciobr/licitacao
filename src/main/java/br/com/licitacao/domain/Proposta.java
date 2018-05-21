package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import br.com.licitacao.domain.enumeration.SituacaoLicitacao;

/**
 * A Proposta.
 */
@Entity
@Table(name = "proposta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proposta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "data_hora")
    private Instant dataHora;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoLicitacao situacao;

    @ManyToOne
    private Fornecedor fornecedor;

    @ManyToOne
    private ItemLicitacao itemLicitacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValor() {
        return valor;
    }

    public Proposta valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public Proposta dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public SituacaoLicitacao getSituacao() {
        return situacao;
    }

    public Proposta situacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public Proposta fornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
        return this;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }

    public ItemLicitacao getItemLicitacao() {
        return itemLicitacao;
    }

    public Proposta itemLicitacao(ItemLicitacao itemLicitacao) {
        this.itemLicitacao = itemLicitacao;
        return this;
    }

    public void setItemLicitacao(ItemLicitacao itemLicitacao) {
        this.itemLicitacao = itemLicitacao;
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
        Proposta proposta = (Proposta) o;
        if (proposta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), proposta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Proposta{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", dataHora='" + getDataHora() + "'" +
            ", situacao='" + getSituacao() + "'" +
            "}";
    }
}
