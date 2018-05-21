package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import br.com.licitacao.domain.enumeration.SituacaoLicitacao;

/**
 * A AlteracaoLicitacao.
 */
@Entity
@Table(name = "alteracao_licitacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlteracaoLicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "situacao", nullable = false)
    private SituacaoLicitacao situacao;

    @Column(name = "motivo")
    private String motivo;

    @ManyToOne
    private Licitacao licitacao;

    @ManyToOne
    private Operador operador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SituacaoLicitacao getSituacao() {
        return situacao;
    }

    public AlteracaoLicitacao situacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoLicitacao situacao) {
        this.situacao = situacao;
    }

    public String getMotivo() {
        return motivo;
    }

    public AlteracaoLicitacao motivo(String motivo) {
        this.motivo = motivo;
        return this;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Licitacao getLicitacao() {
        return licitacao;
    }

    public AlteracaoLicitacao licitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
        return this;
    }

    public void setLicitacao(Licitacao licitacao) {
        this.licitacao = licitacao;
    }

    public Operador getOperador() {
        return operador;
    }

    public AlteracaoLicitacao operador(Operador operador) {
        this.operador = operador;
        return this;
    }

    public void setOperador(Operador operador) {
        this.operador = operador;
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
        AlteracaoLicitacao alteracaoLicitacao = (AlteracaoLicitacao) o;
        if (alteracaoLicitacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alteracaoLicitacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlteracaoLicitacao{" +
            "id=" + getId() +
            ", situacao='" + getSituacao() + "'" +
            ", motivo='" + getMotivo() + "'" +
            "}";
    }
}
