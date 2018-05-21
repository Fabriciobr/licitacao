package br.com.licitacao.repository;

import br.com.licitacao.domain.LoteLicitacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the LoteLicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoteLicitacaoRepository extends JpaRepository<LoteLicitacao, Long> {

}
