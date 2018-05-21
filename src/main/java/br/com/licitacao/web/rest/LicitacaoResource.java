package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.Licitacao;

import br.com.licitacao.repository.LicitacaoRepository;
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
 * REST controller for managing Licitacao.
 */
@RestController
@RequestMapping("/api")
public class LicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(LicitacaoResource.class);

    private static final String ENTITY_NAME = "licitacao";

    private final LicitacaoRepository licitacaoRepository;

    public LicitacaoResource(LicitacaoRepository licitacaoRepository) {
        this.licitacaoRepository = licitacaoRepository;
    }

    /**
     * POST  /licitacaos : Create a new licitacao.
     *
     * @param licitacao the licitacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new licitacao, or with status 400 (Bad Request) if the licitacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/licitacaos")
    @Timed
    public ResponseEntity<Licitacao> createLicitacao(@RequestBody Licitacao licitacao) throws URISyntaxException {
        log.debug("REST request to save Licitacao : {}", licitacao);
        if (licitacao.getId() != null) {
            throw new BadRequestAlertException("A new licitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Licitacao result = licitacaoRepository.save(licitacao);
        return ResponseEntity.created(new URI("/api/licitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /licitacaos : Updates an existing licitacao.
     *
     * @param licitacao the licitacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated licitacao,
     * or with status 400 (Bad Request) if the licitacao is not valid,
     * or with status 500 (Internal Server Error) if the licitacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/licitacaos")
    @Timed
    public ResponseEntity<Licitacao> updateLicitacao(@RequestBody Licitacao licitacao) throws URISyntaxException {
        log.debug("REST request to update Licitacao : {}", licitacao);
        if (licitacao.getId() == null) {
            return createLicitacao(licitacao);
        }
        Licitacao result = licitacaoRepository.save(licitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, licitacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /licitacaos : get all the licitacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of licitacaos in body
     */
    @GetMapping("/licitacaos")
    @Timed
    public List<Licitacao> getAllLicitacaos() {
        log.debug("REST request to get all Licitacaos");
        return licitacaoRepository.findAll();
        }

    /**
     * GET  /licitacaos/:id : get the "id" licitacao.
     *
     * @param id the id of the licitacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the licitacao, or with status 404 (Not Found)
     */
    @GetMapping("/licitacaos/{id}")
    @Timed
    public ResponseEntity<Licitacao> getLicitacao(@PathVariable Long id) {
        log.debug("REST request to get Licitacao : {}", id);
        Licitacao licitacao = licitacaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(licitacao));
    }

    /**
     * DELETE  /licitacaos/:id : delete the "id" licitacao.
     *
     * @param id the id of the licitacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/licitacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteLicitacao(@PathVariable Long id) {
        log.debug("REST request to delete Licitacao : {}", id);
        licitacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
