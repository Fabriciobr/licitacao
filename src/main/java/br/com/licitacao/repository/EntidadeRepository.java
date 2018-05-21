package br.com.licitacao.repository;

import br.com.licitacao.domain.Entidade;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Entidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadeRepository extends JpaRepository<Entidade, Long> {

}
