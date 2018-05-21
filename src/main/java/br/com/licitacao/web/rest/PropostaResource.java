package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.Proposta;

import br.com.licitacao.repository.PropostaRepository;
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
 * REST controller for managing Proposta.
 */
@RestController
@RequestMapping("/api")
public class PropostaResource {

    private final Logger log = LoggerFactory.getLogger(PropostaResource.class);

    private static final String ENTITY_NAME = "proposta";

    private final PropostaRepository propostaRepository;

    public PropostaResource(PropostaRepository propostaRepository) {
        this.propostaRepository = propostaRepository;
    }

    /**
     * POST  /propostas : Create a new proposta.
     *
     * @param proposta the proposta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new proposta, or with status 400 (Bad Request) if the proposta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/propostas")
    @Timed
    public ResponseEntity<Proposta> createProposta(@RequestBody Proposta proposta) throws URISyntaxException {
        log.debug("REST request to save Proposta : {}", proposta);
        if (proposta.getId() != null) {
            throw new BadRequestAlertException("A new proposta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proposta result = propostaRepository.save(proposta);
        return ResponseEntity.created(new URI("/api/propostas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /propostas : Updates an existing proposta.
     *
     * @param proposta the proposta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated proposta,
     * or with status 400 (Bad Request) if the proposta is not valid,
     * or with status 500 (Internal Server Error) if the proposta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/propostas")
    @Timed
    public ResponseEntity<Proposta> updateProposta(@RequestBody Proposta proposta) throws URISyntaxException {
        log.debug("REST request to update Proposta : {}", proposta);
        if (proposta.getId() == null) {
            return createProposta(proposta);
        }
        Proposta result = propostaRepository.save(proposta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, proposta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /propostas : get all the propostas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of propostas in body
     */
    @GetMapping("/propostas")
    @Timed
    public List<Proposta> getAllPropostas() {
        log.debug("REST request to get all Propostas");
        return propostaRepository.findAll();
        }

    /**
     * GET  /propostas/:id : get the "id" proposta.
     *
     * @param id the id of the proposta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the proposta, or with status 404 (Not Found)
     */
    @GetMapping("/propostas/{id}")
    @Timed
    public ResponseEntity<Proposta> getProposta(@PathVariable Long id) {
        log.debug("REST request to get Proposta : {}", id);
        Proposta proposta = propostaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(proposta));
    }

    /**
     * DELETE  /propostas/:id : delete the "id" proposta.
     *
     * @param id the id of the proposta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/propostas/{id}")
    @Timed
    public ResponseEntity<Void> deleteProposta(@PathVariable Long id) {
        log.debug("REST request to delete Proposta : {}", id);
        propostaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
