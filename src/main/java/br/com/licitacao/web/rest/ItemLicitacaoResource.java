package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.ItemLicitacao;

import br.com.licitacao.repository.ItemLicitacaoRepository;
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
 * REST controller for managing ItemLicitacao.
 */
@RestController
@RequestMapping("/api")
public class ItemLicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(ItemLicitacaoResource.class);

    private static final String ENTITY_NAME = "itemLicitacao";

    private final ItemLicitacaoRepository itemLicitacaoRepository;

    public ItemLicitacaoResource(ItemLicitacaoRepository itemLicitacaoRepository) {
        this.itemLicitacaoRepository = itemLicitacaoRepository;
    }

    /**
     * POST  /item-licitacaos : Create a new itemLicitacao.
     *
     * @param itemLicitacao the itemLicitacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new itemLicitacao, or with status 400 (Bad Request) if the itemLicitacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/item-licitacaos")
    @Timed
    public ResponseEntity<ItemLicitacao> createItemLicitacao(@RequestBody ItemLicitacao itemLicitacao) throws URISyntaxException {
        log.debug("REST request to save ItemLicitacao : {}", itemLicitacao);
        if (itemLicitacao.getId() != null) {
            throw new BadRequestAlertException("A new itemLicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemLicitacao result = itemLicitacaoRepository.save(itemLicitacao);
        return ResponseEntity.created(new URI("/api/item-licitacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /item-licitacaos : Updates an existing itemLicitacao.
     *
     * @param itemLicitacao the itemLicitacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated itemLicitacao,
     * or with status 400 (Bad Request) if the itemLicitacao is not valid,
     * or with status 500 (Internal Server Error) if the itemLicitacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/item-licitacaos")
    @Timed
    public ResponseEntity<ItemLicitacao> updateItemLicitacao(@RequestBody ItemLicitacao itemLicitacao) throws URISyntaxException {
        log.debug("REST request to update ItemLicitacao : {}", itemLicitacao);
        if (itemLicitacao.getId() == null) {
            return createItemLicitacao(itemLicitacao);
        }
        ItemLicitacao result = itemLicitacaoRepository.save(itemLicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, itemLicitacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /item-licitacaos : get all the itemLicitacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of itemLicitacaos in body
     */
    @GetMapping("/item-licitacaos")
    @Timed
    public List<ItemLicitacao> getAllItemLicitacaos() {
        log.debug("REST request to get all ItemLicitacaos");
        return itemLicitacaoRepository.findAll();
        }

    /**
     * GET  /item-licitacaos/:id : get the "id" itemLicitacao.
     *
     * @param id the id of the itemLicitacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the itemLicitacao, or with status 404 (Not Found)
     */
    @GetMapping("/item-licitacaos/{id}")
    @Timed
    public ResponseEntity<ItemLicitacao> getItemLicitacao(@PathVariable Long id) {
        log.debug("REST request to get ItemLicitacao : {}", id);
        ItemLicitacao itemLicitacao = itemLicitacaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(itemLicitacao));
    }

    /**
     * DELETE  /item-licitacaos/:id : delete the "id" itemLicitacao.
     *
     * @param id the id of the itemLicitacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/item-licitacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteItemLicitacao(@PathVariable Long id) {
        log.debug("REST request to delete ItemLicitacao : {}", id);
        itemLicitacaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
