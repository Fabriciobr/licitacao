package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.AlteracaoLicitacao;
import br.com.licitacao.repository.AlteracaoLicitacaoRepository;
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

import br.com.licitacao.domain.enumeration.SituacaoLicitacao;
/**
 * Test class for the AlteracaoLicitacaoResource REST controller.
 *
 * @see AlteracaoLicitacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class AlteracaoLicitacaoResourceIntTest {

    private static final SituacaoLicitacao DEFAULT_SITUACAO = SituacaoLicitacao.SITUACAO;
    private static final SituacaoLicitacao UPDATED_SITUACAO = SituacaoLicitacao.SITU2;

    private static final String DEFAULT_MOTIVO = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO = "BBBBBBBBBB";

    @Autowired
    private AlteracaoLicitacaoRepository alteracaoLicitacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlteracaoLicitacaoMockMvc;

    private AlteracaoLicitacao alteracaoLicitacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlteracaoLicitacaoResource alteracaoLicitacaoResource = new AlteracaoLicitacaoResource(alteracaoLicitacaoRepository);
        this.restAlteracaoLicitacaoMockMvc = MockMvcBuilders.standaloneSetup(alteracaoLicitacaoResource)
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
    public static AlteracaoLicitacao createEntity(EntityManager em) {
        AlteracaoLicitacao alteracaoLicitacao = new AlteracaoLicitacao()
            .situacao(DEFAULT_SITUACAO)
            .motivo(DEFAULT_MOTIVO);
        return alteracaoLicitacao;
    }

    @Before
    public void initTest() {
        alteracaoLicitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlteracaoLicitacao() throws Exception {
        int databaseSizeBeforeCreate = alteracaoLicitacaoRepository.findAll().size();

        // Create the AlteracaoLicitacao
        restAlteracaoLicitacaoMockMvc.perform(post("/api/alteracao-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alteracaoLicitacao)))
            .andExpect(status().isCreated());

        // Validate the AlteracaoLicitacao in the database
        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        AlteracaoLicitacao testAlteracaoLicitacao = alteracaoLicitacaoList.get(alteracaoLicitacaoList.size() - 1);
        assertThat(testAlteracaoLicitacao.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
        assertThat(testAlteracaoLicitacao.getMotivo()).isEqualTo(DEFAULT_MOTIVO);
    }

    @Test
    @Transactional
    public void createAlteracaoLicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = alteracaoLicitacaoRepository.findAll().size();

        // Create the AlteracaoLicitacao with an existing ID
        alteracaoLicitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlteracaoLicitacaoMockMvc.perform(post("/api/alteracao-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alteracaoLicitacao)))
            .andExpect(status().isBadRequest());

        // Validate the AlteracaoLicitacao in the database
        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSituacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = alteracaoLicitacaoRepository.findAll().size();
        // set the field null
        alteracaoLicitacao.setSituacao(null);

        // Create the AlteracaoLicitacao, which fails.

        restAlteracaoLicitacaoMockMvc.perform(post("/api/alteracao-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alteracaoLicitacao)))
            .andExpect(status().isBadRequest());

        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAlteracaoLicitacaos() throws Exception {
        // Initialize the database
        alteracaoLicitacaoRepository.saveAndFlush(alteracaoLicitacao);

        // Get all the alteracaoLicitacaoList
        restAlteracaoLicitacaoMockMvc.perform(get("/api/alteracao-licitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alteracaoLicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())))
            .andExpect(jsonPath("$.[*].motivo").value(hasItem(DEFAULT_MOTIVO.toString())));
    }

    @Test
    @Transactional
    public void getAlteracaoLicitacao() throws Exception {
        // Initialize the database
        alteracaoLicitacaoRepository.saveAndFlush(alteracaoLicitacao);

        // Get the alteracaoLicitacao
        restAlteracaoLicitacaoMockMvc.perform(get("/api/alteracao-licitacaos/{id}", alteracaoLicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(alteracaoLicitacao.getId().intValue()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()))
            .andExpect(jsonPath("$.motivo").value(DEFAULT_MOTIVO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlteracaoLicitacao() throws Exception {
        // Get the alteracaoLicitacao
        restAlteracaoLicitacaoMockMvc.perform(get("/api/alteracao-licitacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlteracaoLicitacao() throws Exception {
        // Initialize the database
        alteracaoLicitacaoRepository.saveAndFlush(alteracaoLicitacao);
        int databaseSizeBeforeUpdate = alteracaoLicitacaoRepository.findAll().size();

        // Update the alteracaoLicitacao
        AlteracaoLicitacao updatedAlteracaoLicitacao = alteracaoLicitacaoRepository.findOne(alteracaoLicitacao.getId());
        // Disconnect from session so that the updates on updatedAlteracaoLicitacao are not directly saved in db
        em.detach(updatedAlteracaoLicitacao);
        updatedAlteracaoLicitacao
            .situacao(UPDATED_SITUACAO)
            .motivo(UPDATED_MOTIVO);

        restAlteracaoLicitacaoMockMvc.perform(put("/api/alteracao-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlteracaoLicitacao)))
            .andExpect(status().isOk());

        // Validate the AlteracaoLicitacao in the database
        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeUpdate);
        AlteracaoLicitacao testAlteracaoLicitacao = alteracaoLicitacaoList.get(alteracaoLicitacaoList.size() - 1);
        assertThat(testAlteracaoLicitacao.getSituacao()).isEqualTo(UPDATED_SITUACAO);
        assertThat(testAlteracaoLicitacao.getMotivo()).isEqualTo(UPDATED_MOTIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingAlteracaoLicitacao() throws Exception {
        int databaseSizeBeforeUpdate = alteracaoLicitacaoRepository.findAll().size();

        // Create the AlteracaoLicitacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlteracaoLicitacaoMockMvc.perform(put("/api/alteracao-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(alteracaoLicitacao)))
            .andExpect(status().isCreated());

        // Validate the AlteracaoLicitacao in the database
        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAlteracaoLicitacao() throws Exception {
        // Initialize the database
        alteracaoLicitacaoRepository.saveAndFlush(alteracaoLicitacao);
        int databaseSizeBeforeDelete = alteracaoLicitacaoRepository.findAll().size();

        // Get the alteracaoLicitacao
        restAlteracaoLicitacaoMockMvc.perform(delete("/api/alteracao-licitacaos/{id}", alteracaoLicitacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlteracaoLicitacao> alteracaoLicitacaoList = alteracaoLicitacaoRepository.findAll();
        assertThat(alteracaoLicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlteracaoLicitacao.class);
        AlteracaoLicitacao alteracaoLicitacao1 = new AlteracaoLicitacao();
        alteracaoLicitacao1.setId(1L);
        AlteracaoLicitacao alteracaoLicitacao2 = new AlteracaoLicitacao();
        alteracaoLicitacao2.setId(alteracaoLicitacao1.getId());
        assertThat(alteracaoLicitacao1).isEqualTo(alteracaoLicitacao2);
        alteracaoLicitacao2.setId(2L);
        assertThat(alteracaoLicitacao1).isNotEqualTo(alteracaoLicitacao2);
        alteracaoLicitacao1.setId(null);
        assertThat(alteracaoLicitacao1).isNotEqualTo(alteracaoLicitacao2);
    }
}
