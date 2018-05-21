package br.com.licitacao.repository;

import br.com.licitacao.domain.Proposta;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Proposta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropostaRepository extends JpaRepository<Proposta, Long> {

}
