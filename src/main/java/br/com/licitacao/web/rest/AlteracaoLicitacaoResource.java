package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.AlteracaoLicitacao;

import br.com.licitacao.repository.AlteracaoLicitacaoRepository;
import br.com.licitacao.web.rest.errors.BadRequestAlertException;
import br.com.licitacao.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AlteracaoLicitacao.
 */
@RestController
@RequestMapping("/api")
public class AlteracaoLicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(AlteracaoLicitacaoResource.class);

    private static final String ENTITY_NAME = "alteracaoLicitacao";

    private final AlteracaoLicitacaoRepository alteracaoLicitacaoRepository;

    public AlteracaoLicitacaoResource(AlteracaoLicitacaoRepository alteracaoLicitacaoRepository) {
        this.alteracaoLicitacaoRepository = alteracaoLicitacaoRepository;
    }

    /**
     * POST  /alteracao-licitacaos : Create a new alteracaoLicitacao.
     *
     * @param alteracaoLicitacao the alteracaoLicitacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alteracaoLicitacao, or with status 400 (Bad Request) if the alteracaoLicitacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alteracao-licitacaos")
    @Timed
    public ResponseEntity<AlteracaoLicitacao> createAlteracaoLicitacao(@Valid @RequestBody AlteracaoLicitacao alteracaoLicitacao) throws URISyntaxException {
        log.debug("REST request to save AlteracaoLicitacao : {}", alteracaoLicitacao);
        if (alteracaoLicitacao.getId() != null) {
            throw new BadRequestAlertException("A new alteracaoLicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlteracaoLicitacao result = alteracaoLicitacaoRepository.save(alteracaoLicitacao);
        return ResponseEntity.created(new URI("/api/alteracao-licitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alteracao-licitacaos : Updates an existing alteracaoLicitacao.
     *
     * @param alteracaoLicitacao the alteracaoLicitacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alteracaoLicitacao,
     * or with status 400 (Bad Request) if the alteracaoLicitacao is not valid,
     * or with status 500 (Internal Server Error) if the alteracaoLicitacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alteracao-licitacaos")
    @Timed
    public ResponseEntity<AlteracaoLicitacao> updateAlteracaoLicitacao(@Valid @RequestBody AlteracaoLicitacao alteracaoLicitacao) throws URISyntaxException {
        log.debug("REST request to update AlteracaoLicitacao : {}", alteracaoLicitacao);
        if (alteracaoLicitacao.getId() == null) {
            return createAlteracaoLicitacao(alteracaoLicitacao);
        }
        AlteracaoLicitacao result = alteracaoLicitacaoRepository.save(alteracaoLicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alteracaoLicitacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alteracao-licitacaos : get all the alteracaoLicitacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alteracaoLicitacaos in body
     */
    @GetMapping("/alteracao-licitacaos")
    @Timed
    public List<AlteracaoLicitacao> getAllAlteracaoLicitacaos() {
        log.debug("REST request to get all AlteracaoLicitacaos");
        return alteracaoLicitacaoRepository.findAll();
        }

    /**
     * GET  /alteracao-licitacaos/:id : get the "id" alteracaoLicitacao.
     *
     * @param id the id of the alteracaoLicitacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alteracaoLicitacao, or with status 404 (Not Found)
     */
    @GetMapping("/alteracao-licitacaos/{id}")
    @Timed
    public ResponseEntity<AlteracaoLicitacao> getAlteracaoLicitacao(@PathVariable Long id) {
        log.debug("REST request to get AlteracaoLicitacao : {}", id);
        AlteracaoLicitacao alteracaoLicitacao = alteracaoLicitacaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(alteracaoLicitacao));
    }

    /**
     * DELETE  /alteracao-licitacaos/:id : delete the "id" alteracaoLicitacao.
     *
     * @param id the id of the alteracaoLicitacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alteracao-licitacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlteracaoLicitacao(@PathVariable Long id) {
        log.debug("REST request to delete AlteracaoLicitacao : {}", id);
        alteracaoLicitacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
