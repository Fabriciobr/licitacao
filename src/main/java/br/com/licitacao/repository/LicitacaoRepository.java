package br.com.licitacao.repository;

import br.com.licitacao.domain.Licitacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Licitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicitacaoRepository extends JpaRepository<Licitacao, Long> {

}
