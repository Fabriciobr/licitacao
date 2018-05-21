package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.Disputa;

import br.com.licitacao.repository.DisputaRepository;
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
 * REST controller for managing Disputa.
 */
@RestController
@RequestMapping("/api")
public class DisputaResource {

    private final Logger log = LoggerFactory.getLogger(DisputaResource.class);

    private static final String ENTITY_NAME = "disputa";

    private final DisputaRepository disputaRepository;

    public DisputaResource(DisputaRepository disputaRepository) {
        this.disputaRepository = disputaRepository;
    }

    /**
     * POST  /disputas : Create a new disputa.
     *
     * @param disputa the disputa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new disputa, or with status 400 (Bad Request) if the disputa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/disputas")
    @Timed
    public ResponseEntity<Disputa> createDisputa(@RequestBody Disputa disputa) throws URISyntaxException {
        log.debug("REST request to save Disputa : {}", disputa);
        if (disputa.getId() != null) {
            throw new BadRequestAlertException("A new disputa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disputa result = disputaRepository.save(disputa);
        return ResponseEntity.created(new URI("/api/disputas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /disputas : Updates an existing disputa.
     *
     * @param disputa the disputa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated disputa,
     * or with status 400 (Bad Request) if the disputa is not valid,
     * or with status 500 (Internal Server Error) if the disputa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disputas")
    @Timed
    public ResponseEntity<Disputa> updateDisputa(@RequestBody Disputa disputa) throws URISyntaxException {
        log.debug("REST request to update Disputa : {}", disputa);
        if (disputa.getId() == null) {
            return createDisputa(disputa);
        }
        Disputa result = disputaRepository.save(disputa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, disputa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /disputas : get all the disputas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of disputas in body
     */
    @GetMapping("/disputas")
    @Timed
    public List<Disputa> getAllDisputas() {
        log.debug("REST request to get all Disputas");
        return disputaRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /disputas/:id : get the "id" disputa.
     *
     * @param id the id of the disputa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the disputa, or with status 404 (Not Found)
     */
    @GetMapping("/disputas/{id}")
    @Timed
    public ResponseEntity<Disputa> getDisputa(@PathVariable Long id) {
        log.debug("REST request to get Disputa : {}", id);
        Disputa disputa = disputaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(disputa));
    }

    /**
     * DELETE  /disputas/:id : delete the "id" disputa.
     *
     * @param id the id of the disputa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/disputas/{id}")
    @Timed
    public ResponseEntity<Void> deleteDisputa(@PathVariable Long id) {
        log.debug("REST request to delete Disputa : {}", id);
        disputaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
