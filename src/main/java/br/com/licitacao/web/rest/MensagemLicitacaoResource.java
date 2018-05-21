package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.MensagemLicitacao;

import br.com.licitacao.repository.MensagemLicitacaoRepository;
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
 * REST controller for managing MensagemLicitacao.
 */
@RestController
@RequestMapping("/api")
public class MensagemLicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(MensagemLicitacaoResource.class);

    private static final String ENTITY_NAME = "mensagemLicitacao";

    private final MensagemLicitacaoRepository mensagemLicitacaoRepository;

    public MensagemLicitacaoResource(MensagemLicitacaoRepository mensagemLicitacaoRepository) {
        this.mensagemLicitacaoRepository = mensagemLicitacaoRepository;
    }

    /**
     * POST  /mensagem-licitacaos : Create a new mensagemLicitacao.
     *
     * @param mensagemLicitacao the mensagemLicitacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mensagemLicitacao, or with status 400 (Bad Request) if the mensagemLicitacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mensagem-licitacaos")
    @Timed
    public ResponseEntity<MensagemLicitacao> createMensagemLicitacao(@RequestBody MensagemLicitacao mensagemLicitacao) throws URISyntaxException {
        log.debug("REST request to save MensagemLicitacao : {}", mensagemLicitacao);
        if (mensagemLicitacao.getId() != null) {
            throw new BadRequestAlertException("A new mensagemLicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MensagemLicitacao result = mensagemLicitacaoRepository.save(mensagemLicitacao);
        return ResponseEntity.created(new URI("/api/mensagem-licitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mensagem-licitacaos : Updates an existing mensagemLicitacao.
     *
     * @param mensagemLicitacao the mensagemLicitacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mensagemLicitacao,
     * or with status 400 (Bad Request) if the mensagemLicitacao is not valid,
     * or with status 500 (Internal Server Error) if the mensagemLicitacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mensagem-licitacaos")
    @Timed
    public ResponseEntity<MensagemLicitacao> updateMensagemLicitacao(@RequestBody MensagemLicitacao mensagemLicitacao) throws URISyntaxException {
        log.debug("REST request to update MensagemLicitacao : {}", mensagemLicitacao);
        if (mensagemLicitacao.getId() == null) {
            return createMensagemLicitacao(mensagemLicitacao);
        }
        MensagemLicitacao result = mensagemLicitacaoRepository.save(mensagemLicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mensagemLicitacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mensagem-licitacaos : get all the mensagemLicitacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mensagemLicitacaos in body
     */
    @GetMapping("/mensagem-licitacaos")
    @Timed
    public List<MensagemLicitacao> getAllMensagemLicitacaos() {
        log.debug("REST request to get all MensagemLicitacaos");
        return mensagemLicitacaoRepository.findAll();
        }

    /**
     * GET  /mensagem-licitacaos/:id : get the "id" mensagemLicitacao.
     *
     * @param id the id of the mensagemLicitacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mensagemLicitacao, or with status 404 (Not Found)
     */
    @GetMapping("/mensagem-licitacaos/{id}")
    @Timed
    public ResponseEntity<MensagemLicitacao> getMensagemLicitacao(@PathVariable Long id) {
        log.debug("REST request to get MensagemLicitacao : {}", id);
        MensagemLicitacao mensagemLicitacao = mensagemLicitacaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mensagemLicitacao));
    }

    /**
     * DELETE  /mensagem-licitacaos/:id : delete the "id" mensagemLicitacao.
     *
     * @param id the id of the mensagemLicitacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mensagem-licitacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMensagemLicitacao(@PathVariable Long id) {
        log.debug("REST request to delete MensagemLicitacao : {}", id);
        mensagemLicitacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
