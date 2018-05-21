package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Fornecedor.
 */
@Entity
@Table(name = "fornecedor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fornecedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    private Licitacao licitacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Fornecedor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Licitacao getLicitacao() {
        return licitacao;
    }

    public Fornecedor licitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
        return this;
    }

    public void setLicitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
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
        Fornecedor fornecedor = (Fornecedor) o;
        if (fornecedor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fornecedor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fornecedor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
