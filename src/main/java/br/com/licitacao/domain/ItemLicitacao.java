package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ItemLicitacao.
 */
@Entity
@Table(name = "item_licitacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemLicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    private LoteLicitacao lote;

    @ManyToOne
    private Produto produto;

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

    public ItemLicitacao numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public ItemLicitacao quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public ItemLicitacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LoteLicitacao getLote() {
        return lote;
    }

    public ItemLicitacao lote(LoteLicitacao loteLicitacao) {
        this.lote = loteLicitacao;
        return this;
    }

    public void setLote(LoteLicitacao loteLicitacao) {
        this.lote = loteLicitacao;
    }

    public Produto getProduto() {
        return produto;
    }

    public ItemLicitacao produto(Produto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
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
        ItemLicitacao itemLicitacao = (ItemLicitacao) o;
        if (itemLicitacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), itemLicitacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ItemLicitacao{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", quantidade=" + getQuantidade() +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
