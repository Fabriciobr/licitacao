package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.Operador;
import br.com.licitacao.repository.OperadorRepository;
import br.com.licitacao.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.licitacao.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the OperadorResource REST controller.
 *
 * @see OperadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class OperadorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private OperadorRepository operadorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOperadorMockMvc;

    private Operador operador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperadorResource operadorResource = new OperadorResource(operadorRepository);
        this.restOperadorMockMvc = MockMvcBuilders.standaloneSetup(operadorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operador createEntity(EntityManager em) {
        Operador operador = new Operador()
            .nome(DEFAULT_NOME);
        return operador;
    }

    @Before
    public void initTest() {
        operador = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperador() throws Exception {
        int databaseSizeBeforeCreate = operadorRepository.findAll().size();

        // Create the Operador
        restOperadorMockMvc.perform(post("/api/operadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operador)))
            .andExpect(status().isCreated());

        // Validate the Operador in the database
        List<Operador> operadorList = operadorRepository.findAll();
        assertThat(operadorList).hasSize(databaseSizeBeforeCreate + 1);
        Operador testOperador = operadorList.get(operadorList.size() - 1);
        assertThat(testOperador.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createOperadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operadorRepository.findAll().size();

        // Create the Operador with an existing ID
        operador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperadorMockMvc.perform(post("/api/operadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operador)))
            .andExpect(status().isBadRequest());

        // Validate the Operador in the database
        List<Operador> operadorList = operadorRepository.findAll();
        assertThat(operadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOperadors() throws Exception {
        // Initialize the database
        operadorRepository.saveAndFlush(operador);

        // Get all the operadorList
        restOperadorMockMvc.perform(get("/api/operadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getOperador() throws Exception {
        // Initialize the database
        operadorRepository.saveAndFlush(operador);

        // Get the operador
        restOperadorMockMvc.perform(get("/api/operadors/{id}", operador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operador.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperador() throws Exception {
        // Get the operador
        restOperadorMockMvc.perform(get("/api/operadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperador() throws Exception {
        // Initialize the database
        operadorRepository.saveAndFlush(operador);
        int databaseSizeBeforeUpdate = operadorRepository.findAll().size();

        // Update the operador
        Operador updatedOperador = operadorRepository.findOne(operador.getId());
        // Disconnect from session so that the updates on updatedOperador are not directly saved in db
        em.detach(updatedOperador);
        updatedOperador
            .nome(UPDATED_NOME);

        restOperadorMockMvc.perform(put("/api/operadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperador)))
            .andExpect(status().isOk());

        // Validate the Operador in the database
        List<Operador> operadorList = operadorRepository.findAll();
        assertThat(operadorList).hasSize(databaseSizeBeforeUpdate);
        Operador testOperador = operadorList.get(operadorList.size() - 1);
        assertThat(testOperador.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingOperador() throws Exception {
        int databaseSizeBeforeUpdate = operadorRepository.findAll().size();

        // Create the Operador

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOperadorMockMvc.perform(put("/api/operadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operador)))
            .andExpect(status().isCreated());

        // Validate the Operador in the database
        List<Operador> operadorList = operadorRepository.findAll();
        assertThat(operadorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOperador() throws Exception {
        // Initialize the database
        operadorRepository.saveAndFlush(operador);
        int databaseSizeBeforeDelete = operadorRepository.findAll().size();

        // Get the operador
        restOperadorMockMvc.perform(delete("/api/operadors/{id}", operador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Operador> operadorList = operadorRepository.findAll();
        assertThat(operadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operador.class);
        Operador operador1 = new Operador();
        operador1.setId(1L);
        Operador operador2 = new Operador();
        operador2.setId(operador1.getId());
        assertThat(operador1).isEqualTo(operador2);
        operador2.setId(2L);
        assertThat(operador1).isNotEqualTo(operador2);
        operador1.setId(null);
        assertThat(operador1).isNotEqualTo(operador2);
    }
}
