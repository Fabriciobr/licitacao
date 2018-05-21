package br.com.licitacao.repository;

import br.com.licitacao.domain.UnidadeOrganizacional;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UnidadeOrganizacional entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeOrganizacionalRepository extends JpaRepository<UnidadeOrganizacional, Long> {

}
