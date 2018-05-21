package br.com.licitacao.repository;

import br.com.licitacao.domain.ItemLicitacao;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ItemLicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemLicitacaoRepository extends JpaRepository<ItemLicitacao, Long> {

}
