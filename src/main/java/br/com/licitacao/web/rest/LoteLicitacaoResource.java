package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.LoteLicitacao;

import br.com.licitacao.repository.LoteLicitacaoRepository;
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
 * REST controller for managing LoteLicitacao.
 */
@RestController
@RequestMapping("/api")
public class LoteLicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(LoteLicitacaoResource.class);

    private static final String ENTITY_NAME = "loteLicitacao";

    private final LoteLicitacaoRepository loteLicitacaoRepository;

    public LoteLicitacaoResource(LoteLicitacaoRepository loteLicitacaoRepository) {
        this.loteLicitacaoRepository = loteLicitacaoRepository;
    }

    /**
     * POST  /lote-licitacaos : Create a new loteLicitacao.
     *
     * @param loteLicitacao the loteLicitacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loteLicitacao, or with status 400 (Bad Request) if the loteLicitacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lote-licitacaos")
    @Timed
    public ResponseEntity<LoteLicitacao> createLoteLicitacao(@RequestBody LoteLicitacao loteLicitacao) throws URISyntaxException {
        log.debug("REST request to save LoteLicitacao : {}", loteLicitacao);
        if (loteLicitacao.getId() != null) {
            throw new BadRequestAlertException("A new loteLicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LoteLicitacao result = loteLicitacaoRepository.save(loteLicitacao);
        return ResponseEntity.created(new URI("/api/lote-licitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lote-licitacaos : Updates an existing loteLicitacao.
     *
     * @param loteLicitacao the loteLicitacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loteLicitacao,
     * or with status 400 (Bad Request) if the loteLicitacao is not valid,
     * or with status 500 (Internal Server Error) if the loteLicitacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lote-licitacaos")
    @Timed
    public ResponseEntity<LoteLicitacao> updateLoteLicitacao(@RequestBody LoteLicitacao loteLicitacao) throws URISyntaxException {
        log.debug("REST request to update LoteLicitacao : {}", loteLicitacao);
        if (loteLicitacao.getId() == null) {
            return createLoteLicitacao(loteLicitacao);
        }
        LoteLicitacao result = loteLicitacaoRepository.save(loteLicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loteLicitacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lote-licitacaos : get all the loteLicitacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of loteLicitacaos in body
     */
    @GetMapping("/lote-licitacaos")
    @Timed
    public List<LoteLicitacao> getAllLoteLicitacaos() {
        log.debug("REST request to get all LoteLicitacaos");
        return loteLicitacaoRepository.findAll();
        }

    /**
     * GET  /lote-licitacaos/:id : get the "id" loteLicitacao.
     *
     * @param id the id of the loteLicitacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loteLicitacao, or with status 404 (Not Found)
     */
    @GetMapping("/lote-licitacaos/{id}")
    @Timed
    public ResponseEntity<LoteLicitacao> getLoteLicitacao(@PathVariable Long id) {
        log.debug("REST request to get LoteLicitacao : {}", id);
        LoteLicitacao loteLicitacao = loteLicitacaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(loteLicitacao));
    }

    /**
     * DELETE  /lote-licitacaos/:id : delete the "id" loteLicitacao.
     *
     * @param id the id of the loteLicitacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lote-licitacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteLoteLicitacao(@PathVariable Long id) {
        log.debug("REST request to delete LoteLicitacao : {}", id);
        loteLicitacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
