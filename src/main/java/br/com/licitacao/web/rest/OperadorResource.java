package br.com.licitacao.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.licitacao.domain.Operador;

import br.com.licitacao.repository.OperadorRepository;
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
 * REST controller for managing Operador.
 */
@RestController
@RequestMapping("/api")
public class OperadorResource {

    private final Logger log = LoggerFactory.getLogger(OperadorResource.class);

    private static final String ENTITY_NAME = "operador";

    private final OperadorRepository operadorRepository;

    public OperadorResource(OperadorRepository operadorRepository) {
        this.operadorRepository = operadorRepository;
    }

    /**
     * POST  /operadors : Create a new operador.
     *
     * @param operador the operador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operador, or with status 400 (Bad Request) if the operador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operadors")
    @Timed
    public ResponseEntity<Operador> createOperador(@RequestBody Operador operador) throws URISyntaxException {
        log.debug("REST request to save Operador : {}", operador);
        if (operador.getId() != null) {
            throw new BadRequestAlertException("A new operador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operador result = operadorRepository.save(operador);
        return ResponseEntity.created(new URI("/api/operadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operadors : Updates an existing operador.
     *
     * @param operador the operador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operador,
     * or with status 400 (Bad Request) if the operador is not valid,
     * or with status 500 (Internal Server Error) if the operador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operadors")
    @Timed
    public ResponseEntity<Operador> updateOperador(@RequestBody Operador operador) throws URISyntaxException {
        log.debug("REST request to update Operador : {}", operador);
        if (operador.getId() == null) {
            return createOperador(operador);
        }
        Operador result = operadorRepository.save(operador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operadors : get all the operadors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operadors in body
     */
    @GetMapping("/operadors")
    @Timed
    public List<Operador> getAllOperadors() {
        log.debug("REST request to get all Operadors");
        return operadorRepository.findAll();
        }

    /**
     * GET  /operadors/:id : get the "id" operador.
     *
     * @param id the id of the operador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operador, or with status 404 (Not Found)
     */
    @GetMapping("/operadors/{id}")
    @Timed
    public ResponseEntity<Operador> getOperador(@PathVariable Long id) {
        log.debug("REST request to get Operador : {}", id);
        Operador operador = operadorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(operador));
    }

    /**
     * DELETE  /operadors/:id : delete the "id" operador.
     *
     * @param id the id of the operador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operadors/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperador(@PathVariable Long id) {
        log.debug("REST request to delete Operador : {}", id);
        operadorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
