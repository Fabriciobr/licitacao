package br.com.licitacao.repository;

import br.com.licitacao.domain.Disputa;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Disputa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisputaRepository extends JpaRepository<Disputa, Long> {
    @Query("select distinct disputa from Disputa disputa left join fetch disputa.participantes")
    List<Disputa> findAllWithEagerRelationships();

    @Query("select disputa from Disputa disputa left join fetch disputa.participantes where disputa.id =:id")
    Disputa findOneWithEagerRelationships(@Param("id") Long id);

}
