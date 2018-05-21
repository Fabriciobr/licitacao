package br.com.licitacao.repository;

import br.com.licitacao.domain.AlteracaoLicitacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AlteracaoLicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlteracaoLicitacaoRepository extends JpaRepository<AlteracaoLicitacao, Long> {

}
