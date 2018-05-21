package br.com.licitacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A MensagemLicitacao.
 */
@Entity
@Table(name = "mensagem_licitacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MensagemLicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_hora")
    private Instant dataHora;

    @Column(name = "mensagem")
    private String mensagem;

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

    public MensagemLicitacao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public MensagemLicitacao dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public String getMensagem() {
        return mensagem;
    }

    public MensagemLicitacao mensagem(String mensagem) {
        this.mensagem = mensagem;
        return this;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Licitacao getLicitacao() {
        return licitacao;
    }

    public MensagemLicitacao licitacao(Licitacao licitacao) {
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
        MensagemLicitacao mensagemLicitacao = (MensagemLicitacao) o;
        if (mensagemLicitacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mensagemLicitacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MensagemLicitacao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dataHora='" + getDataHora() + "'" +
            ", mensagem='" + getMensagem() + "'" +
            "}";
    }
}
