package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.UnidadeOrganizacional;

import br.com.licitacao.repository.UnidadeOrganizacionalRepository;
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
 * REST controller for managing UnidadeOrganizacional.
 */
@RestController
@RequestMapping("/api")
public class UnidadeOrganizacionalResource {

    private final Logger log = LoggerFactory.getLogger(UnidadeOrganizacionalResource.class);

    private static final String ENTITY_NAME = "unidadeOrganizacional";

    private final UnidadeOrganizacionalRepository unidadeOrganizacionalRepository;

    public UnidadeOrganizacionalResource(UnidadeOrganizacionalRepository unidadeOrganizacionalRepository) {
        this.unidadeOrganizacionalRepository = unidadeOrganizacionalRepository;
    }

    /**
     * POST  /unidade-organizacionals : Create a new unidadeOrganizacional.
     *
     * @param unidadeOrganizacional the unidadeOrganizacional to create
     * @return the ResponseEntity with status 201 (Created) and with body the new unidadeOrganizacional, or with status 400 (Bad Request) if the unidadeOrganizacional has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/unidade-organizacionals")
    @Timed
    public ResponseEntity<UnidadeOrganizacional> createUnidadeOrganizacional(@RequestBody UnidadeOrganizacional unidadeOrganizacional) throws URISyntaxException {
        log.debug("REST request to save UnidadeOrganizacional : {}", unidadeOrganizacional);
        if (unidadeOrganizacional.getId() != null) {
            throw new BadRequestAlertException("A new unidadeOrganizacional cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnidadeOrganizacional result = unidadeOrganizacionalRepository.save(unidadeOrganizacional);
        return ResponseEntity.created(new URI("/api/unidade-organizacionals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /unidade-organizacionals : Updates an existing unidadeOrganizacional.
     *
     * @param unidadeOrganizacional the unidadeOrganizacional to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated unidadeOrganizacional,
     * or with status 400 (Bad Request) if the unidadeOrganizacional is not valid,
     * or with status 500 (Internal Server Error) if the unidadeOrganizacional couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/unidade-organizacionals")
    @Timed
    public ResponseEntity<UnidadeOrganizacional> updateUnidadeOrganizacional(@RequestBody UnidadeOrganizacional unidadeOrganizacional) throws URISyntaxException {
        log.debug("REST request to update UnidadeOrganizacional : {}", unidadeOrganizacional);
        if (unidadeOrganizacional.getId() == null) {
            return createUnidadeOrganizacional(unidadeOrganizacional);
        }
        UnidadeOrganizacional result = unidadeOrganizacionalRepository.save(unidadeOrganizacional);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, unidadeOrganizacional.getId().toString()))
            .body(result);
    }

    /**
     * GET  /unidade-organizacionals : get all the unidadeOrganizacionals.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of unidadeOrganizacionals in body
     */
    @GetMapping("/unidade-organizacionals")
    @Timed
    public List<UnidadeOrganizacional> getAllUnidadeOrganizacionals() {
        log.debug("REST request to get all UnidadeOrganizacionals");
        return unidadeOrganizacionalRepository.findAll();
        }

    /**
     * GET  /unidade-organizacionals/:id : get the "id" unidadeOrganizacional.
     *
     * @param id the id of the unidadeOrganizacional to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the unidadeOrganizacional, or with status 404 (Not Found)
     */
    @GetMapping("/unidade-organizacionals/{id}")
    @Timed
    public ResponseEntity<UnidadeOrganizacional> getUnidadeOrganizacional(@PathVariable Long id) {
        log.debug("REST request to get UnidadeOrganizacional : {}", id);
        UnidadeOrganizacional unidadeOrganizacional = unidadeOrganizacionalRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(unidadeOrganizacional));
    }

    /**
     * DELETE  /unidade-organizacionals/:id : delete the "id" unidadeOrganizacional.
     *
     * @param id the id of the unidadeOrganizacional to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/unidade-organizacionals/{id}")
    @Timed
    public ResponseEntity<Void> deleteUnidadeOrganizacional(@PathVariable Long id) {
        log.debug("REST request to delete UnidadeOrganizacional : {}", id);
        unidadeOrganizacionalRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
