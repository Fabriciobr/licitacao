package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.Proposta;
import br.com.licitacao.repository.PropostaRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.licitacao.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.licitacao.domain.enumeration.SituacaoLicitacao;
/**
 * Test class for the PropostaResource REST controller.
 *
 * @see PropostaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class PropostaResourceIntTest {

    private static final Double DEFAULT_VALOR = 1D;
    private static final Double UPDATED_VALOR = 2D;

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final SituacaoLicitacao DEFAULT_SITUACAO = SituacaoLicitacao.SITUACAO;
    private static final SituacaoLicitacao UPDATED_SITUACAO = SituacaoLicitacao.SITU2;

    @Autowired
    private PropostaRepository propostaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPropostaMockMvc;

    private Proposta proposta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropostaResource propostaResource = new PropostaResource(propostaRepository);
        this.restPropostaMockMvc = MockMvcBuilders.standaloneSetup(propostaResource)
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
    public static Proposta createEntity(EntityManager em) {
        Proposta proposta = new Proposta()
            .valor(DEFAULT_VALOR)
            .dataHora(DEFAULT_DATA_HORA)
            .situacao(DEFAULT_SITUACAO);
        return proposta;
    }

    @Before
    public void initTest() {
        proposta = createEntity(em);
    }

    @Test
    @Transactional
    public void createProposta() throws Exception {
        int databaseSizeBeforeCreate = propostaRepository.findAll().size();

        // Create the Proposta
        restPropostaMockMvc.perform(post("/api/propostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isCreated());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeCreate + 1);
        Proposta testProposta = propostaList.get(propostaList.size() - 1);
        assertThat(testProposta.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testProposta.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testProposta.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    public void createPropostaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propostaRepository.findAll().size();

        // Create the Proposta with an existing ID
        proposta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropostaMockMvc.perform(post("/api/propostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isBadRequest());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPropostas() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        // Get all the propostaList
        restPropostaMockMvc.perform(get("/api/propostas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proposta.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.doubleValue())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())));
    }

    @Test
    @Transactional
    public void getProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);

        // Get the proposta
        restPropostaMockMvc.perform(get("/api/propostas/{id}", proposta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proposta.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.doubleValue()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProposta() throws Exception {
        // Get the proposta
        restPropostaMockMvc.perform(get("/api/propostas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);
        int databaseSizeBeforeUpdate = propostaRepository.findAll().size();

        // Update the proposta
        Proposta updatedProposta = propostaRepository.findOne(proposta.getId());
        // Disconnect from session so that the updates on updatedProposta are not directly saved in db
        em.detach(updatedProposta);
        updatedProposta
            .valor(UPDATED_VALOR)
            .dataHora(UPDATED_DATA_HORA)
            .situacao(UPDATED_SITUACAO);

        restPropostaMockMvc.perform(put("/api/propostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProposta)))
            .andExpect(status().isOk());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeUpdate);
        Proposta testProposta = propostaList.get(propostaList.size() - 1);
        assertThat(testProposta.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testProposta.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testProposta.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingProposta() throws Exception {
        int databaseSizeBeforeUpdate = propostaRepository.findAll().size();

        // Create the Proposta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPropostaMockMvc.perform(put("/api/propostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proposta)))
            .andExpect(status().isCreated());

        // Validate the Proposta in the database
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProposta() throws Exception {
        // Initialize the database
        propostaRepository.saveAndFlush(proposta);
        int databaseSizeBeforeDelete = propostaRepository.findAll().size();

        // Get the proposta
        restPropostaMockMvc.perform(delete("/api/propostas/{id}", proposta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Proposta> propostaList = propostaRepository.findAll();
        assertThat(propostaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proposta.class);
        Proposta proposta1 = new Proposta();
        proposta1.setId(1L);
        Proposta proposta2 = new Proposta();
        proposta2.setId(proposta1.getId());
        assertThat(proposta1).isEqualTo(proposta2);
        proposta2.setId(2L);
        assertThat(proposta1).isNotEqualTo(proposta2);
        proposta1.setId(null);
        assertThat(proposta1).isNotEqualTo(proposta2);
    }
}
