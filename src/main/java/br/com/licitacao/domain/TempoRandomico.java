package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TempoRandomico.
 */
@Entity
@Table(name = "tempo_randomico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TempoRandomico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "tempo_minimo")
    private Integer tempoMinimo;

    @Column(name = "tempo_maximo")
    private Integer tempoMaximo;

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

    public TempoRandomico nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getTempoMinimo() {
        return tempoMinimo;
    }

    public TempoRandomico tempoMinimo(Integer tempoMinimo) {
        this.tempoMinimo = tempoMinimo;
        return this;
    }

    public void setTempoMinimo(Integer tempoMinimo) {
        this.tempoMinimo = tempoMinimo;
    }

    public Integer getTempoMaximo() {
        return tempoMaximo;
    }

    public TempoRandomico tempoMaximo(Integer tempoMaximo) {
        this.tempoMaximo = tempoMaximo;
        return this;
    }

    public void setTempoMaximo(Integer tempoMaximo) {
        this.tempoMaximo = tempoMaximo;
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
        TempoRandomico tempoRandomico = (TempoRandomico) o;
        if (tempoRandomico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tempoRandomico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TempoRandomico{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tempoMinimo=" + getTempoMinimo() +
            ", tempoMaximo=" + getTempoMaximo() +
            "}";
    }
}
