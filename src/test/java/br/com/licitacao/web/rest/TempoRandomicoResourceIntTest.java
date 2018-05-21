package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.TempoRandomico;
import br.com.licitacao.repository.TempoRandomicoRepository;
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
 * Test class for the TempoRandomicoResource REST controller.
 *
 * @see TempoRandomicoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class TempoRandomicoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Integer DEFAULT_TEMPO_MINIMO = 1;
    private static final Integer UPDATED_TEMPO_MINIMO = 2;

    private static final Integer DEFAULT_TEMPO_MAXIMO = 1;
    private static final Integer UPDATED_TEMPO_MAXIMO = 2;

    @Autowired
    private TempoRandomicoRepository tempoRandomicoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTempoRandomicoMockMvc;

    private TempoRandomico tempoRandomico;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TempoRandomicoResource tempoRandomicoResource = new TempoRandomicoResource(tempoRandomicoRepository);
        this.restTempoRandomicoMockMvc = MockMvcBuilders.standaloneSetup(tempoRandomicoResource)
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
    public static TempoRandomico createEntity(EntityManager em) {
        TempoRandomico tempoRandomico = new TempoRandomico()
            .nome(DEFAULT_NOME)
            .tempoMinimo(DEFAULT_TEMPO_MINIMO)
            .tempoMaximo(DEFAULT_TEMPO_MAXIMO);
        return tempoRandomico;
    }

    @Before
    public void initTest() {
        tempoRandomico = createEntity(em);
    }

    @Test
    @Transactional
    public void createTempoRandomico() throws Exception {
        int databaseSizeBeforeCreate = tempoRandomicoRepository.findAll().size();

        // Create the TempoRandomico
        restTempoRandomicoMockMvc.perform(post("/api/tempo-randomicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempoRandomico)))
            .andExpect(status().isCreated());

        // Validate the TempoRandomico in the database
        List<TempoRandomico> tempoRandomicoList = tempoRandomicoRepository.findAll();
        assertThat(tempoRandomicoList).hasSize(databaseSizeBeforeCreate + 1);
        TempoRandomico testTempoRandomico = tempoRandomicoList.get(tempoRandomicoList.size() - 1);
        assertThat(testTempoRandomico.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTempoRandomico.getTempoMinimo()).isEqualTo(DEFAULT_TEMPO_MINIMO);
        assertThat(testTempoRandomico.getTempoMaximo()).isEqualTo(DEFAULT_TEMPO_MAXIMO);
    }

    @Test
    @Transactional
    public void createTempoRandomicoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tempoRandomicoRepository.findAll().size();

        // Create the TempoRandomico with an existing ID
        tempoRandomico.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTempoRandomicoMockMvc.perform(post("/api/tempo-randomicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempoRandomico)))
            .andExpect(status().isBadRequest());

        // Validate the TempoRandomico in the database
        List<TempoRandomico> tempoRandomicoList = tempoRandomicoRepository.findAll();
        assertThat(tempoRandomicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTempoRandomicos() throws Exception {
        // Initialize the database
        tempoRandomicoRepository.saveAndFlush(tempoRandomico);

        // Get all the tempoRandomicoList
        restTempoRandomicoMockMvc.perform(get("/api/tempo-randomicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tempoRandomico.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].tempoMinimo").value(hasItem(DEFAULT_TEMPO_MINIMO)))
            .andExpect(jsonPath("$.[*].tempoMaximo").value(hasItem(DEFAULT_TEMPO_MAXIMO)));
    }

    @Test
    @Transactional
    public void getTempoRandomico() throws Exception {
        // Initialize the database
        tempoRandomicoRepository.saveAndFlush(tempoRandomico);

        // Get the tempoRandomico
        restTempoRandomicoMockMvc.perform(get("/api/tempo-randomicos/{id}", tempoRandomico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tempoRandomico.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.tempoMinimo").value(DEFAULT_TEMPO_MINIMO))
            .andExpect(jsonPath("$.tempoMaximo").value(DEFAULT_TEMPO_MAXIMO));
    }

    @Test
    @Transactional
    public void getNonExistingTempoRandomico() throws Exception {
        // Get the tempoRandomico
        restTempoRandomicoMockMvc.perform(get("/api/tempo-randomicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTempoRandomico() throws Exception {
        // Initialize the database
        tempoRandomicoRepository.saveAndFlush(tempoRandomico);
        int databaseSizeBeforeUpdate = tempoRandomicoRepository.findAll().size();

        // Update the tempoRandomico
        TempoRandomico updatedTempoRandomico = tempoRandomicoRepository.findOne(tempoRandomico.getId());
        // Disconnect from session so that the updates on updatedTempoRandomico are not directly saved in db
        em.detach(updatedTempoRandomico);
        updatedTempoRandomico
            .nome(UPDATED_NOME)
            .tempoMinimo(UPDATED_TEMPO_MINIMO)
            .tempoMaximo(UPDATED_TEMPO_MAXIMO);

        restTempoRandomicoMockMvc.perform(put("/api/tempo-randomicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTempoRandomico)))
            .andExpect(status().isOk());

        // Validate the TempoRandomico in the database
        List<TempoRandomico> tempoRandomicoList = tempoRandomicoRepository.findAll();
        assertThat(tempoRandomicoList).hasSize(databaseSizeBeforeUpdate);
        TempoRandomico testTempoRandomico = tempoRandomicoList.get(tempoRandomicoList.size() - 1);
        assertThat(testTempoRandomico.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTempoRandomico.getTempoMinimo()).isEqualTo(UPDATED_TEMPO_MINIMO);
        assertThat(testTempoRandomico.getTempoMaximo()).isEqualTo(UPDATED_TEMPO_MAXIMO);
    }

    @Test
    @Transactional
    public void updateNonExistingTempoRandomico() throws Exception {
        int databaseSizeBeforeUpdate = tempoRandomicoRepository.findAll().size();

        // Create the TempoRandomico

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTempoRandomicoMockMvc.perform(put("/api/tempo-randomicos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tempoRandomico)))
            .andExpect(status().isCreated());

        // Validate the TempoRandomico in the database
        List<TempoRandomico> tempoRandomicoList = tempoRandomicoRepository.findAll();
        assertThat(tempoRandomicoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTempoRandomico() throws Exception {
        // Initialize the database
        tempoRandomicoRepository.saveAndFlush(tempoRandomico);
        int databaseSizeBeforeDelete = tempoRandomicoRepository.findAll().size();

        // Get the tempoRandomico
        restTempoRandomicoMockMvc.perform(delete("/api/tempo-randomicos/{id}", tempoRandomico.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TempoRandomico> tempoRandomicoList = tempoRandomicoRepository.findAll();
        assertThat(tempoRandomicoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TempoRandomico.class);
        TempoRandomico tempoRandomico1 = new TempoRandomico();
        tempoRandomico1.setId(1L);
        TempoRandomico tempoRandomico2 = new TempoRandomico();
        tempoRandomico2.setId(tempoRandomico1.getId());
        assertThat(tempoRandomico1).isEqualTo(tempoRandomico2);
        tempoRandomico2.setId(2L);
        assertThat(tempoRandomico1).isNotEqualTo(tempoRandomico2);
        tempoRandomico1.setId(null);
        assertThat(tempoRandomico1).isNotEqualTo(tempoRandomico2);
    }
}
