package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Disputa.
 */
@Entity
@Table(name = "disputa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Disputa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "melhor_lance")
    private Double melhorLance;

    @Column(name = "melhor_proposta")
    private Double melhorProposta;

    @Column(name = "variacao")
    private Double variacao;

    @Column(name = "duracao")
    private Integer duracao;

    @ManyToOne
    private LoteLicitacao loteLicitacao;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "disputa_participantes",
               joinColumns = @JoinColumn(name="disputas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="participantes_id", referencedColumnName="id"))
    private Set<Fornecedor> participantes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMelhorLance() {
        return melhorLance;
    }

    public Disputa melhorLance(Double melhorLance) {
        this.melhorLance = melhorLance;
        return this;
    }

    public void setMelhorLance(Double melhorLance) {
        this.melhorLance = melhorLance;
    }

    public Double getMelhorProposta() {
        return melhorProposta;
    }

    public Disputa melhorProposta(Double melhorProposta) {
        this.melhorProposta = melhorProposta;
        return this;
    }

    public void setMelhorProposta(Double melhorProposta) {
        this.melhorProposta = melhorProposta;
    }

    public Double getVariacao() {
        return variacao;
    }

    public Disputa variacao(Double variacao) {
        this.variacao = variacao;
        return this;
    }

    public void setVariacao(Double variacao) {
        this.variacao = variacao;
    }

    public Integer getDuracao() {
        return duracao;
    }

    public Disputa duracao(Integer duracao) {
        this.duracao = duracao;
        return this;
    }

    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }

    public LoteLicitacao getLoteLicitacao() {
        return loteLicitacao;
    }

    public Disputa loteLicitacao(LoteLicitacao loteLicitacao) {
        this.loteLicitacao = loteLicitacao;
        return this;
    }

    public void setLoteLicitacao(LoteLicitacao loteLicitacao) {
        this.loteLicitacao = loteLicitacao;
    }

    public Set<Fornecedor> getParticipantes() {
        return participantes;
    }

    public Disputa participantes(Set<Fornecedor> fornecedors) {
        this.participantes = fornecedors;
        return this;
    }

    public Disputa addParticipantes(Fornecedor fornecedor) {
        this.participantes.add(fornecedor);
        return this;
    }

    public Disputa removeParticipantes(Fornecedor fornecedor) {
        this.participantes.remove(fornecedor);
        return this;
    }

    public void setParticipantes(Set<Fornecedor> fornecedors) {
        this.participantes = fornecedors;
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
        Disputa disputa = (Disputa) o;
        if (disputa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), disputa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Disputa{" +
            "id=" + getId() +
            ", melhorLance=" + getMelhorLance() +
            ", melhorProposta=" + getMelhorProposta() +
            ", variacao=" + getVariacao() +
            ", duracao=" + getDuracao() +
            "}";
    }
}
