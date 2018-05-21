package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.Entidade;

import br.com.licitacao.repository.EntidadeRepository;
import br.com.licitacao.web.rest.errors.BadRequestAlertException;
import br.com.licitacao.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Entidade.
 */
@RestController
@RequestMapping("/api")
public class EntidadeResource {

    private final Logger log = LoggerFactory.getLogger(EntidadeResource.class);

    private static final String ENTITY_NAME = "entidade";

    private final EntidadeRepository entidadeRepository;

    public EntidadeResource(EntidadeRepository entidadeRepository) {
        this.entidadeRepository = entidadeRepository;
    }

    /**
     * POST  /entidades : Create a new entidade.
     *
     * @param entidade the entidade to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entidade, or with status 400 (Bad Request) if the entidade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entidades")
    @Timed
    public ResponseEntity<Entidade> createEntidade(@RequestBody Entidade entidade) throws URISyntaxException {
        log.debug("REST request to save Entidade : {}", entidade);
        if (entidade.getId() != null) {
            throw new BadRequestAlertException("A new entidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entidade result = entidadeRepository.save(entidade);
        return ResponseEntity.created(new URI("/api/entidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entidades : Updates an existing entidade.
     *
     * @param entidade the entidade to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entidade,
     * or with status 400 (Bad Request) if the entidade is not valid,
     * or with status 500 (Internal Server Error) if the entidade couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entidades")
    @Timed
    public ResponseEntity<Entidade> updateEntidade(@RequestBody Entidade entidade) throws URISyntaxException {
        log.debug("REST request to update Entidade : {}", entidade);
        if (entidade.getId() == null) {
            return createEntidade(entidade);
        }
        Entidade result = entidadeRepository.save(entidade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entidade.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entidades : get all the entidades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entidades in body
     */
    @GetMapping("/entidades")
    @Timed
    public List<Entidade> getAllEntidades() {
        log.debug("REST request to get all Entidades");
        return entidadeRepository.findAll();
        }

    /**
     * GET  /entidades/:id : get the "id" entidade.
     *
     * @param id the id of the entidade to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entidade, or with status 404 (Not Found)
     */
    @GetMapping("/entidades/{id}")
    @Timed
    public ResponseEntity<Entidade> getEntidade(@PathVariable Long id) {
        log.debug("REST request to get Entidade : {}", id);
        Entidade entidade = entidadeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(entidade));
    }

    /**
     * DELETE  /entidades/:id : delete the "id" entidade.
     *
     * @param id the id of the entidade to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entidades/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntidade(@PathVariable Long id) {
        log.debug("REST request to delete Entidade : {}", id);
        entidadeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
