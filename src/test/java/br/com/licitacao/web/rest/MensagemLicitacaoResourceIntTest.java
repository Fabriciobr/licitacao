package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.MensagemLicitacao;
import br.com.licitacao.repository.MensagemLicitacaoRepository;
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

/**
 * Test class for the MensagemLicitacaoResource REST controller.
 *
 * @see MensagemLicitacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class MensagemLicitacaoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MENSAGEM = "AAAAAAAAAA";
    private static final String UPDATED_MENSAGEM = "BBBBBBBBBB";

    @Autowired
    private MensagemLicitacaoRepository mensagemLicitacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMensagemLicitacaoMockMvc;

    private MensagemLicitacao mensagemLicitacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MensagemLicitacaoResource mensagemLicitacaoResource = new MensagemLicitacaoResource(mensagemLicitacaoRepository);
        this.restMensagemLicitacaoMockMvc = MockMvcBuilders.standaloneSetup(mensagemLicitacaoResource)
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
    public static MensagemLicitacao createEntity(EntityManager em) {
        MensagemLicitacao mensagemLicitacao = new MensagemLicitacao()
            .nome(DEFAULT_NOME)
            .dataHora(DEFAULT_DATA_HORA)
            .mensagem(DEFAULT_MENSAGEM);
        return mensagemLicitacao;
    }

    @Before
    public void initTest() {
        mensagemLicitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createMensagemLicitacao() throws Exception {
        int databaseSizeBeforeCreate = mensagemLicitacaoRepository.findAll().size();

        // Create the MensagemLicitacao
        restMensagemLicitacaoMockMvc.perform(post("/api/mensagem-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagemLicitacao)))
            .andExpect(status().isCreated());

        // Validate the MensagemLicitacao in the database
        List<MensagemLicitacao> mensagemLicitacaoList = mensagemLicitacaoRepository.findAll();
        assertThat(mensagemLicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        MensagemLicitacao testMensagemLicitacao = mensagemLicitacaoList.get(mensagemLicitacaoList.size() - 1);
        assertThat(testMensagemLicitacao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMensagemLicitacao.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testMensagemLicitacao.getMensagem()).isEqualTo(DEFAULT_MENSAGEM);
    }

    @Test
    @Transactional
    public void createMensagemLicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mensagemLicitacaoRepository.findAll().size();

        // Create the MensagemLicitacao with an existing ID
        mensagemLicitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensagemLicitacaoMockMvc.perform(post("/api/mensagem-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagemLicitacao)))
            .andExpect(status().isBadRequest());

        // Validate the MensagemLicitacao in the database
        List<MensagemLicitacao> mensagemLicitacaoList = mensagemLicitacaoRepository.findAll();
        assertThat(mensagemLicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMensagemLicitacaos() throws Exception {
        // Initialize the database
        mensagemLicitacaoRepository.saveAndFlush(mensagemLicitacao);

        // Get all the mensagemLicitacaoList
        restMensagemLicitacaoMockMvc.perform(get("/api/mensagem-licitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensagemLicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].mensagem").value(hasItem(DEFAULT_MENSAGEM.toString())));
    }

    @Test
    @Transactional
    public void getMensagemLicitacao() throws Exception {
        // Initialize the database
        mensagemLicitacaoRepository.saveAndFlush(mensagemLicitacao);

        // Get the mensagemLicitacao
        restMensagemLicitacaoMockMvc.perform(get("/api/mensagem-licitacaos/{id}", mensagemLicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mensagemLicitacao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.mensagem").value(DEFAULT_MENSAGEM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMensagemLicitacao() throws Exception {
        // Get the mensagemLicitacao
        restMensagemLicitacaoMockMvc.perform(get("/api/mensagem-licitacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMensagemLicitacao() throws Exception {
        // Initialize the database
        mensagemLicitacaoRepository.saveAndFlush(mensagemLicitacao);
        int databaseSizeBeforeUpdate = mensagemLicitacaoRepository.findAll().size();

        // Update the mensagemLicitacao
        MensagemLicitacao updatedMensagemLicitacao = mensagemLicitacaoRepository.findOne(mensagemLicitacao.getId());
        // Disconnect from session so that the updates on updatedMensagemLicitacao are not directly saved in db
        em.detach(updatedMensagemLicitacao);
        updatedMensagemLicitacao
            .nome(UPDATED_NOME)
            .dataHora(UPDATED_DATA_HORA)
            .mensagem(UPDATED_MENSAGEM);

        restMensagemLicitacaoMockMvc.perform(put("/api/mensagem-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMensagemLicitacao)))
            .andExpect(status().isOk());

        // Validate the MensagemLicitacao in the database
        List<MensagemLicitacao> mensagemLicitacaoList = mensagemLicitacaoRepository.findAll();
        assertThat(mensagemLicitacaoList).hasSize(databaseSizeBeforeUpdate);
        MensagemLicitacao testMensagemLicitacao = mensagemLicitacaoList.get(mensagemLicitacaoList.size() - 1);
        assertThat(testMensagemLicitacao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMensagemLicitacao.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testMensagemLicitacao.getMensagem()).isEqualTo(UPDATED_MENSAGEM);
    }

    @Test
    @Transactional
    public void updateNonExistingMensagemLicitacao() throws Exception {
        int databaseSizeBeforeUpdate = mensagemLicitacaoRepository.findAll().size();

        // Create the MensagemLicitacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMensagemLicitacaoMockMvc.perform(put("/api/mensagem-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensagemLicitacao)))
            .andExpect(status().isCreated());

        // Validate the MensagemLicitacao in the database
        List<MensagemLicitacao> mensagemLicitacaoList = mensagemLicitacaoRepository.findAll();
        assertThat(mensagemLicitacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMensagemLicitacao() throws Exception {
        // Initialize the database
        mensagemLicitacaoRepository.saveAndFlush(mensagemLicitacao);
        int databaseSizeBeforeDelete = mensagemLicitacaoRepository.findAll().size();

        // Get the mensagemLicitacao
        restMensagemLicitacaoMockMvc.perform(delete("/api/mensagem-licitacaos/{id}", mensagemLicitacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MensagemLicitacao> mensagemLicitacaoList = mensagemLicitacaoRepository.findAll();
        assertThat(mensagemLicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MensagemLicitacao.class);
        MensagemLicitacao mensagemLicitacao1 = new MensagemLicitacao();
        mensagemLicitacao1.setId(1L);
        MensagemLicitacao mensagemLicitacao2 = new MensagemLicitacao();
        mensagemLicitacao2.setId(mensagemLicitacao1.getId());
        assertThat(mensagemLicitacao1).isEqualTo(mensagemLicitacao2);
        mensagemLicitacao2.setId(2L);
        assertThat(mensagemLicitacao1).isNotEqualTo(mensagemLicitacao2);
        mensagemLicitacao1.setId(null);
        assertThat(mensagemLicitacao1).isNotEqualTo(mensagemLicitacao2);
    }
}
