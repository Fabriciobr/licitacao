package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.Disputa;
import br.com.licitacao.repository.DisputaRepository;
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
 * Test class for the DisputaResource REST controller.
 *
 * @see DisputaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class DisputaResourceIntTest {

    private static final Double DEFAULT_MELHOR_LANCE = 1D;
    private static final Double UPDATED_MELHOR_LANCE = 2D;

    private static final Double DEFAULT_MELHOR_PROPOSTA = 1D;
    private static final Double UPDATED_MELHOR_PROPOSTA = 2D;

    private static final Double DEFAULT_VARIACAO = 1D;
    private static final Double UPDATED_VARIACAO = 2D;

    private static final Integer DEFAULT_DURACAO = 1;
    private static final Integer UPDATED_DURACAO = 2;

    @Autowired
    private DisputaRepository disputaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDisputaMockMvc;

    private Disputa disputa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DisputaResource disputaResource = new DisputaResource(disputaRepository);
        this.restDisputaMockMvc = MockMvcBuilders.standaloneSetup(disputaResource)
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
    public static Disputa createEntity(EntityManager em) {
        Disputa disputa = new Disputa()
            .melhorLance(DEFAULT_MELHOR_LANCE)
            .melhorProposta(DEFAULT_MELHOR_PROPOSTA)
            .variacao(DEFAULT_VARIACAO)
            .duracao(DEFAULT_DURACAO);
        return disputa;
    }

    @Before
    public void initTest() {
        disputa = createEntity(em);
    }

    @Test
    @Transactional
    public void createDisputa() throws Exception {
        int databaseSizeBeforeCreate = disputaRepository.findAll().size();

        // Create the Disputa
        restDisputaMockMvc.perform(post("/api/disputas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(disputa)))
            .andExpect(status().isCreated());

        // Validate the Disputa in the database
        List<Disputa> disputaList = disputaRepository.findAll();
        assertThat(disputaList).hasSize(databaseSizeBeforeCreate + 1);
        Disputa testDisputa = disputaList.get(disputaList.size() - 1);
        assertThat(testDisputa.getMelhorLance()).isEqualTo(DEFAULT_MELHOR_LANCE);
        assertThat(testDisputa.getMelhorProposta()).isEqualTo(DEFAULT_MELHOR_PROPOSTA);
        assertThat(testDisputa.getVariacao()).isEqualTo(DEFAULT_VARIACAO);
        assertThat(testDisputa.getDuracao()).isEqualTo(DEFAULT_DURACAO);
    }

    @Test
    @Transactional
    public void createDisputaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = disputaRepository.findAll().size();

        // Create the Disputa with an existing ID
        disputa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDisputaMockMvc.perform(post("/api/disputas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(disputa)))
            .andExpect(status().isBadRequest());

        // Validate the Disputa in the database
        List<Disputa> disputaList = disputaRepository.findAll();
        assertThat(disputaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDisputas() throws Exception {
        // Initialize the database
        disputaRepository.saveAndFlush(disputa);

        // Get all the disputaList
        restDisputaMockMvc.perform(get("/api/disputas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disputa.getId().intValue())))
            .andExpect(jsonPath("$.[*].melhorLance").value(hasItem(DEFAULT_MELHOR_LANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].melhorProposta").value(hasItem(DEFAULT_MELHOR_PROPOSTA.doubleValue())))
            .andExpect(jsonPath("$.[*].variacao").value(hasItem(DEFAULT_VARIACAO.doubleValue())))
            .andExpect(jsonPath("$.[*].duracao").value(hasItem(DEFAULT_DURACAO)));
    }

    @Test
    @Transactional
    public void getDisputa() throws Exception {
        // Initialize the database
        disputaRepository.saveAndFlush(disputa);

        // Get the disputa
        restDisputaMockMvc.perform(get("/api/disputas/{id}", disputa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(disputa.getId().intValue()))
            .andExpect(jsonPath("$.melhorLance").value(DEFAULT_MELHOR_LANCE.doubleValue()))
            .andExpect(jsonPath("$.melhorProposta").value(DEFAULT_MELHOR_PROPOSTA.doubleValue()))
            .andExpect(jsonPath("$.variacao").value(DEFAULT_VARIACAO.doubleValue()))
            .andExpect(jsonPath("$.duracao").value(DEFAULT_DURACAO));
    }

    @Test
    @Transactional
    public void getNonExistingDisputa() throws Exception {
        // Get the disputa
        restDisputaMockMvc.perform(get("/api/disputas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDisputa() throws Exception {
        // Initialize the database
        disputaRepository.saveAndFlush(disputa);
        int databaseSizeBeforeUpdate = disputaRepository.findAll().size();

        // Update the disputa
        Disputa updatedDisputa = disputaRepository.findOne(disputa.getId());
        // Disconnect from session so that the updates on updatedDisputa are not directly saved in db
        em.detach(updatedDisputa);
        updatedDisputa
            .melhorLance(UPDATED_MELHOR_LANCE)
            .melhorProposta(UPDATED_MELHOR_PROPOSTA)
            .variacao(UPDATED_VARIACAO)
            .duracao(UPDATED_DURACAO);

        restDisputaMockMvc.perform(put("/api/disputas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDisputa)))
            .andExpect(status().isOk());

        // Validate the Disputa in the database
        List<Disputa> disputaList = disputaRepository.findAll();
        assertThat(disputaList).hasSize(databaseSizeBeforeUpdate);
        Disputa testDisputa = disputaList.get(disputaList.size() - 1);
        assertThat(testDisputa.getMelhorLance()).isEqualTo(UPDATED_MELHOR_LANCE);
        assertThat(testDisputa.getMelhorProposta()).isEqualTo(UPDATED_MELHOR_PROPOSTA);
        assertThat(testDisputa.getVariacao()).isEqualTo(UPDATED_VARIACAO);
        assertThat(testDisputa.getDuracao()).isEqualTo(UPDATED_DURACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingDisputa() throws Exception {
        int databaseSizeBeforeUpdate = disputaRepository.findAll().size();

        // Create the Disputa

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDisputaMockMvc.perform(put("/api/disputas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(disputa)))
            .andExpect(status().isCreated());

        // Validate the Disputa in the database
        List<Disputa> disputaList = disputaRepository.findAll();
        assertThat(disputaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDisputa() throws Exception {
        // Initialize the database
        disputaRepository.saveAndFlush(disputa);
        int databaseSizeBeforeDelete = disputaRepository.findAll().size();

        // Get the disputa
        restDisputaMockMvc.perform(delete("/api/disputas/{id}", disputa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Disputa> disputaList = disputaRepository.findAll();
        assertThat(disputaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Disputa.class);
        Disputa disputa1 = new Disputa();
        disputa1.setId(1L);
        Disputa disputa2 = new Disputa();
        disputa2.setId(disputa1.getId());
        assertThat(disputa1).isEqualTo(disputa2);
        disputa2.setId(2L);
        assertThat(disputa1).isNotEqualTo(disputa2);
        disputa1.setId(null);
        assertThat(disputa1).isNotEqualTo(disputa2);
    }
}
