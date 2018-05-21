package br.com.licitacao.repository;

import br.com.licitacao.domain.TempoRandomico;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TempoRandomico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TempoRandomicoRepository extends JpaRepository<TempoRandomico, Long> {

}
