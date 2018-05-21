package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.TempoRandomico;

import br.com.licitacao.repository.TempoRandomicoRepository;
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
 * REST controller for managing TempoRandomico.
 */
@RestController
@RequestMapping("/api")
public class TempoRandomicoResource {

    private final Logger log = LoggerFactory.getLogger(TempoRandomicoResource.class);

    private static final String ENTITY_NAME = "tempoRandomico";

    private final TempoRandomicoRepository tempoRandomicoRepository;

    public TempoRandomicoResource(TempoRandomicoRepository tempoRandomicoRepository) {
        this.tempoRandomicoRepository = tempoRandomicoRepository;
    }

    /**
     * POST  /tempo-randomicos : Create a new tempoRandomico.
     *
     * @param tempoRandomico the tempoRandomico to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tempoRandomico, or with status 400 (Bad Request) if the tempoRandomico has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tempo-randomicos")
    @Timed
    public ResponseEntity<TempoRandomico> createTempoRandomico(@RequestBody TempoRandomico tempoRandomico) throws URISyntaxException {
        log.debug("REST request to save TempoRandomico : {}", tempoRandomico);
        if (tempoRandomico.getId() != null) {
            throw new BadRequestAlertException("A new tempoRandomico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TempoRandomico result = tempoRandomicoRepository.save(tempoRandomico);
        return ResponseEntity.created(new URI("/api/tempo-randomicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tempo-randomicos : Updates an existing tempoRandomico.
     *
     * @param tempoRandomico the tempoRandomico to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tempoRandomico,
     * or with status 400 (Bad Request) if the tempoRandomico is not valid,
     * or with status 500 (Internal Server Error) if the tempoRandomico couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tempo-randomicos")
    @Timed
    public ResponseEntity<TempoRandomico> updateTempoRandomico(@RequestBody TempoRandomico tempoRandomico) throws URISyntaxException {
        log.debug("REST request to update TempoRandomico : {}", tempoRandomico);
        if (tempoRandomico.getId() == null) {
            return createTempoRandomico(tempoRandomico);
        }
        TempoRandomico result = tempoRandomicoRepository.save(tempoRandomico);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tempoRandomico.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tempo-randomicos : get all the tempoRandomicos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tempoRandomicos in body
     */
    @GetMapping("/tempo-randomicos")
    @Timed
    public List<TempoRandomico> getAllTempoRandomicos() {
        log.debug("REST request to get all TempoRandomicos");
        return tempoRandomicoRepository.findAll();
        }

    /**
     * GET  /tempo-randomicos/:id : get the "id" tempoRandomico.
     *
     * @param id the id of the tempoRandomico to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tempoRandomico, or with status 404 (Not Found)
     */
    @GetMapping("/tempo-randomicos/{id}")
    @Timed
    public ResponseEntity<TempoRandomico> getTempoRandomico(@PathVariable Long id) {
        log.debug("REST request to get TempoRandomico : {}", id);
        TempoRandomico tempoRandomico = tempoRandomicoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tempoRandomico));
    }

    /**
     * DELETE  /tempo-randomicos/:id : delete the "id" tempoRandomico.
     *
     * @param id the id of the tempoRandomico to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tempo-randomicos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTempoRandomico(@PathVariable Long id) {
        log.debug("REST request to delete TempoRandomico : {}", id);
        tempoRandomicoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
