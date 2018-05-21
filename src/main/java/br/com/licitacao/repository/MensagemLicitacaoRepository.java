package br.com.licitacao.repository;

import br.com.licitacao.domain.MensagemLicitacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MensagemLicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensagemLicitacaoRepository extends JpaRepository<MensagemLicitacao, Long> {

}
