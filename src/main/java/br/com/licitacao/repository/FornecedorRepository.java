package br.com.licitacao.repository;

import br.com.licitacao.domain.Fornecedor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Fornecedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

}
