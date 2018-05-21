package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.LoteLicitacao;
import br.com.licitacao.repository.LoteLicitacaoRepository;
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

import br.com.licitacao.domain.enumeration.TipoDisputa;
import br.com.licitacao.domain.enumeration.CriterioSelecao;
import br.com.licitacao.domain.enumeration.SituacaoLote;
import br.com.licitacao.domain.enumeration.SituacaoFornecedor;
/**
 * Test class for the LoteLicitacaoResource REST controller.
 *
 * @see LoteLicitacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class LoteLicitacaoResourceIntTest {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final TipoDisputa DEFAULT_TIPO_DISPUTA = TipoDisputa.TIPO1;
    private static final TipoDisputa UPDATED_TIPO_DISPUTA = TipoDisputa.TIPO2;

    private static final CriterioSelecao DEFAULT_CRITERIO_SELECAO = CriterioSelecao.TIPO1;
    private static final CriterioSelecao UPDATED_CRITERIO_SELECAO = CriterioSelecao.TIPO2;

    private static final Boolean DEFAULT_TRATAMENTO_DIFERENCIADO_ME = false;
    private static final Boolean UPDATED_TRATAMENTO_DIFERENCIADO_ME = true;

    private static final Boolean DEFAULT_EXCLUSIVIDADE_ME = false;
    private static final Boolean UPDATED_EXCLUSIVIDADE_ME = true;

    private static final Integer DEFAULT_TEMPO_MINIMO_ENTRE_LANCES = 1;
    private static final Integer UPDATED_TEMPO_MINIMO_ENTRE_LANCES = 2;

    private static final Integer DEFAULT_TEMPO_MINIMO_MELHOR_LANCE = 1;
    private static final Integer UPDATED_TEMPO_MINIMO_MELHOR_LANCE = 2;

    private static final Double DEFAULT_VALOR_MINIMO_ENTRE_LANCES = 1D;
    private static final Double UPDATED_VALOR_MINIMO_ENTRE_LANCES = 2D;

    private static final Double DEFAULT_VALOR_MINIMO_MELHOR_LANCE = 1D;
    private static final Double UPDATED_VALOR_MINIMO_MELHOR_LANCE = 2D;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final SituacaoLote DEFAULT_SITUACAO = SituacaoLote.TIPO1;
    private static final SituacaoLote UPDATED_SITUACAO = SituacaoLote.TIPO2;

    private static final Double DEFAULT_VALOR_SELECIONADO = 1D;
    private static final Double UPDATED_VALOR_SELECIONADO = 2D;

    private static final Double DEFAULT_VALOR_ESTIMADO = 1D;
    private static final Double UPDATED_VALOR_ESTIMADO = 2D;

    private static final Double DEFAULT_VALOR_ADJUDCADO = 1D;
    private static final Double UPDATED_VALOR_ADJUDCADO = 2D;

    private static final SituacaoFornecedor DEFAULT_SITUACAO_FORNECEDOR = SituacaoFornecedor.TIPO1;
    private static final SituacaoFornecedor UPDATED_SITUACAO_FORNECEDOR = SituacaoFornecedor.TIPO2;

    @Autowired
    private LoteLicitacaoRepository loteLicitacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLoteLicitacaoMockMvc;

    private LoteLicitacao loteLicitacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoteLicitacaoResource loteLicitacaoResource = new LoteLicitacaoResource(loteLicitacaoRepository);
        this.restLoteLicitacaoMockMvc = MockMvcBuilders.standaloneSetup(loteLicitacaoResource)
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
    public static LoteLicitacao createEntity(EntityManager em) {
        LoteLicitacao loteLicitacao = new LoteLicitacao()
            .numero(DEFAULT_NUMERO)
            .tipoDisputa(DEFAULT_TIPO_DISPUTA)
            .criterioSelecao(DEFAULT_CRITERIO_SELECAO)
            .tratamentoDiferenciadoMe(DEFAULT_TRATAMENTO_DIFERENCIADO_ME)
            .exclusividadeMe(DEFAULT_EXCLUSIVIDADE_ME)
            .tempoMinimoEntreLances(DEFAULT_TEMPO_MINIMO_ENTRE_LANCES)
            .tempoMinimoMelhorLance(DEFAULT_TEMPO_MINIMO_MELHOR_LANCE)
            .valorMinimoEntreLances(DEFAULT_VALOR_MINIMO_ENTRE_LANCES)
            .valorMinimoMelhorLance(DEFAULT_VALOR_MINIMO_MELHOR_LANCE)
            .descricao(DEFAULT_DESCRICAO)
            .situacao(DEFAULT_SITUACAO)
            .valorSelecionado(DEFAULT_VALOR_SELECIONADO)
            .valorEstimado(DEFAULT_VALOR_ESTIMADO)
            .valorAdjudcado(DEFAULT_VALOR_ADJUDCADO)
            .situacaoFornecedor(DEFAULT_SITUACAO_FORNECEDOR);
        return loteLicitacao;
    }

    @Before
    public void initTest() {
        loteLicitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoteLicitacao() throws Exception {
        int databaseSizeBeforeCreate = loteLicitacaoRepository.findAll().size();

        // Create the LoteLicitacao
        restLoteLicitacaoMockMvc.perform(post("/api/lote-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loteLicitacao)))
            .andExpect(status().isCreated());

        // Validate the LoteLicitacao in the database
        List<LoteLicitacao> loteLicitacaoList = loteLicitacaoRepository.findAll();
        assertThat(loteLicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        LoteLicitacao testLoteLicitacao = loteLicitacaoList.get(loteLicitacaoList.size() - 1);
        assertThat(testLoteLicitacao.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testLoteLicitacao.getTipoDisputa()).isEqualTo(DEFAULT_TIPO_DISPUTA);
        assertThat(testLoteLicitacao.getCriterioSelecao()).isEqualTo(DEFAULT_CRITERIO_SELECAO);
        assertThat(testLoteLicitacao.isTratamentoDiferenciadoMe()).isEqualTo(DEFAULT_TRATAMENTO_DIFERENCIADO_ME);
        assertThat(testLoteLicitacao.isExclusividadeMe()).isEqualTo(DEFAULT_EXCLUSIVIDADE_ME);
        assertThat(testLoteLicitacao.getTempoMinimoEntreLances()).isEqualTo(DEFAULT_TEMPO_MINIMO_ENTRE_LANCES);
        assertThat(testLoteLicitacao.getTempoMinimoMelhorLance()).isEqualTo(DEFAULT_TEMPO_MINIMO_MELHOR_LANCE);
        assertThat(testLoteLicitacao.getValorMinimoEntreLances()).isEqualTo(DEFAULT_VALOR_MINIMO_ENTRE_LANCES);
        assertThat(testLoteLicitacao.getValorMinimoMelhorLance()).isEqualTo(DEFAULT_VALOR_MINIMO_MELHOR_LANCE);
        assertThat(testLoteLicitacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testLoteLicitacao.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
        assertThat(testLoteLicitacao.getValorSelecionado()).isEqualTo(DEFAULT_VALOR_SELECIONADO);
        assertThat(testLoteLicitacao.getValorEstimado()).isEqualTo(DEFAULT_VALOR_ESTIMADO);
        assertThat(testLoteLicitacao.getValorAdjudcado()).isEqualTo(DEFAULT_VALOR_ADJUDCADO);
        assertThat(testLoteLicitacao.getSituacaoFornecedor()).isEqualTo(DEFAULT_SITUACAO_FORNECEDOR);
    }

    @Test
    @Transactional
    public void createLoteLicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loteLicitacaoRepository.findAll().size();

        // Create the LoteLicitacao with an existing ID
        loteLicitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoteLicitacaoMockMvc.perform(post("/api/lote-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loteLicitacao)))
            .andExpect(status().isBadRequest());

        // Validate the LoteLicitacao in the database
        List<LoteLicitacao> loteLicitacaoList = loteLicitacaoRepository.findAll();
        assertThat(loteLicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLoteLicitacaos() throws Exception {
        // Initialize the database
        loteLicitacaoRepository.saveAndFlush(loteLicitacao);

        // Get all the loteLicitacaoList
        restLoteLicitacaoMockMvc.perform(get("/api/lote-licitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loteLicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].tipoDisputa").value(hasItem(DEFAULT_TIPO_DISPUTA.toString())))
            .andExpect(jsonPath("$.[*].criterioSelecao").value(hasItem(DEFAULT_CRITERIO_SELECAO.toString())))
            .andExpect(jsonPath("$.[*].tratamentoDiferenciadoMe").value(hasItem(DEFAULT_TRATAMENTO_DIFERENCIADO_ME.booleanValue())))
            .andExpect(jsonPath("$.[*].exclusividadeMe").value(hasItem(DEFAULT_EXCLUSIVIDADE_ME.booleanValue())))
            .andExpect(jsonPath("$.[*].tempoMinimoEntreLances").value(hasItem(DEFAULT_TEMPO_MINIMO_ENTRE_LANCES)))
            .andExpect(jsonPath("$.[*].tempoMinimoMelhorLance").value(hasItem(DEFAULT_TEMPO_MINIMO_MELHOR_LANCE)))
            .andExpect(jsonPath("$.[*].valorMinimoEntreLances").value(hasItem(DEFAULT_VALOR_MINIMO_ENTRE_LANCES.doubleValue())))
            .andExpect(jsonPath("$.[*].valorMinimoMelhorLance").value(hasItem(DEFAULT_VALOR_MINIMO_MELHOR_LANCE.doubleValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())))
            .andExpect(jsonPath("$.[*].valorSelecionado").value(hasItem(DEFAULT_VALOR_SELECIONADO.doubleValue())))
            .andExpect(jsonPath("$.[*].valorEstimado").value(hasItem(DEFAULT_VALOR_ESTIMADO.doubleValue())))
            .andExpect(jsonPath("$.[*].valorAdjudcado").value(hasItem(DEFAULT_VALOR_ADJUDCADO.doubleValue())))
            .andExpect(jsonPath("$.[*].situacaoFornecedor").value(hasItem(DEFAULT_SITUACAO_FORNECEDOR.toString())));
    }

    @Test
    @Transactional
    public void getLoteLicitacao() throws Exception {
        // Initialize the database
        loteLicitacaoRepository.saveAndFlush(loteLicitacao);

        // Get the loteLicitacao
        restLoteLicitacaoMockMvc.perform(get("/api/lote-licitacaos/{id}", loteLicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(loteLicitacao.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.tipoDisputa").value(DEFAULT_TIPO_DISPUTA.toString()))
            .andExpect(jsonPath("$.criterioSelecao").value(DEFAULT_CRITERIO_SELECAO.toString()))
            .andExpect(jsonPath("$.tratamentoDiferenciadoMe").value(DEFAULT_TRATAMENTO_DIFERENCIADO_ME.booleanValue()))
            .andExpect(jsonPath("$.exclusividadeMe").value(DEFAULT_EXCLUSIVIDADE_ME.booleanValue()))
            .andExpect(jsonPath("$.tempoMinimoEntreLances").value(DEFAULT_TEMPO_MINIMO_ENTRE_LANCES))
            .andExpect(jsonPath("$.tempoMinimoMelhorLance").value(DEFAULT_TEMPO_MINIMO_MELHOR_LANCE))
            .andExpect(jsonPath("$.valorMinimoEntreLances").value(DEFAULT_VALOR_MINIMO_ENTRE_LANCES.doubleValue()))
            .andExpect(jsonPath("$.valorMinimoMelhorLance").value(DEFAULT_VALOR_MINIMO_MELHOR_LANCE.doubleValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()))
            .andExpect(jsonPath("$.valorSelecionado").value(DEFAULT_VALOR_SELECIONADO.doubleValue()))
            .andExpect(jsonPath("$.valorEstimado").value(DEFAULT_VALOR_ESTIMADO.doubleValue()))
            .andExpect(jsonPath("$.valorAdjudcado").value(DEFAULT_VALOR_ADJUDCADO.doubleValue()))
            .andExpect(jsonPath("$.situacaoFornecedor").value(DEFAULT_SITUACAO_FORNECEDOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLoteLicitacao() throws Exception {
        // Get the loteLicitacao
        restLoteLicitacaoMockMvc.perform(get("/api/lote-licitacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoteLicitacao() throws Exception {
        // Initialize the database
        loteLicitacaoRepository.saveAndFlush(loteLicitacao);
        int databaseSizeBeforeUpdate = loteLicitacaoRepository.findAll().size();

        // Update the loteLicitacao
        LoteLicitacao updatedLoteLicitacao = loteLicitacaoRepository.findOne(loteLicitacao.getId());
        // Disconnect from session so that the updates on updatedLoteLicitacao are not directly saved in db
        em.detach(updatedLoteLicitacao);
        updatedLoteLicitacao
            .numero(UPDATED_NUMERO)
            .tipoDisputa(UPDATED_TIPO_DISPUTA)
            .criterioSelecao(UPDATED_CRITERIO_SELECAO)
            .tratamentoDiferenciadoMe(UPDATED_TRATAMENTO_DIFERENCIADO_ME)
            .exclusividadeMe(UPDATED_EXCLUSIVIDADE_ME)
            .tempoMinimoEntreLances(UPDATED_TEMPO_MINIMO_ENTRE_LANCES)
            .tempoMinimoMelhorLance(UPDATED_TEMPO_MINIMO_MELHOR_LANCE)
            .valorMinimoEntreLances(UPDATED_VALOR_MINIMO_ENTRE_LANCES)
            .valorMinimoMelhorLance(UPDATED_VALOR_MINIMO_MELHOR_LANCE)
            .descricao(UPDATED_DESCRICAO)
            .situacao(UPDATED_SITUACAO)
            .valorSelecionado(UPDATED_VALOR_SELECIONADO)
            .valorEstimado(UPDATED_VALOR_ESTIMADO)
            .valorAdjudcado(UPDATED_VALOR_ADJUDCADO)
            .situacaoFornecedor(UPDATED_SITUACAO_FORNECEDOR);

        restLoteLicitacaoMockMvc.perform(put("/api/lote-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoteLicitacao)))
            .andExpect(status().isOk());

        // Validate the LoteLicitacao in the database
        List<LoteLicitacao> loteLicitacaoList = loteLicitacaoRepository.findAll();
        assertThat(loteLicitacaoList).hasSize(databaseSizeBeforeUpdate);
        LoteLicitacao testLoteLicitacao = loteLicitacaoList.get(loteLicitacaoList.size() - 1);
        assertThat(testLoteLicitacao.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testLoteLicitacao.getTipoDisputa()).isEqualTo(UPDATED_TIPO_DISPUTA);
        assertThat(testLoteLicitacao.getCriterioSelecao()).isEqualTo(UPDATED_CRITERIO_SELECAO);
        assertThat(testLoteLicitacao.isTratamentoDiferenciadoMe()).isEqualTo(UPDATED_TRATAMENTO_DIFERENCIADO_ME);
        assertThat(testLoteLicitacao.isExclusividadeMe()).isEqualTo(UPDATED_EXCLUSIVIDADE_ME);
        assertThat(testLoteLicitacao.getTempoMinimoEntreLances()).isEqualTo(UPDATED_TEMPO_MINIMO_ENTRE_LANCES);
        assertThat(testLoteLicitacao.getTempoMinimoMelhorLance()).isEqualTo(UPDATED_TEMPO_MINIMO_MELHOR_LANCE);
        assertThat(testLoteLicitacao.getValorMinimoEntreLances()).isEqualTo(UPDATED_VALOR_MINIMO_ENTRE_LANCES);
        assertThat(testLoteLicitacao.getValorMinimoMelhorLance()).isEqualTo(UPDATED_VALOR_MINIMO_MELHOR_LANCE);
        assertThat(testLoteLicitacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testLoteLicitacao.getSituacao()).isEqualTo(UPDATED_SITUACAO);
        assertThat(testLoteLicitacao.getValorSelecionado()).isEqualTo(UPDATED_VALOR_SELECIONADO);
        assertThat(testLoteLicitacao.getValorEstimado()).isEqualTo(UPDATED_VALOR_ESTIMADO);
        assertThat(testLoteLicitacao.getValorAdjudcado()).isEqualTo(UPDATED_VALOR_ADJUDCADO);
        assertThat(testLoteLicitacao.getSituacaoFornecedor()).isEqualTo(UPDATED_SITUACAO_FORNECEDOR);
    }

    @Test
    @Transactional
    public void updateNonExistingLoteLicitacao() throws Exception {
        int databaseSizeBeforeUpdate = loteLicitacaoRepository.findAll().size();

        // Create the LoteLicitacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLoteLicitacaoMockMvc.perform(put("/api/lote-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loteLicitacao)))
            .andExpect(status().isCreated());

        // Validate the LoteLicitacao in the database
        List<LoteLicitacao> loteLicitacaoList = loteLicitacaoRepository.findAll();
        assertThat(loteLicitacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLoteLicitacao() throws Exception {
        // Initialize the database
        loteLicitacaoRepository.saveAndFlush(loteLicitacao);
        int databaseSizeBeforeDelete = loteLicitacaoRepository.findAll().size();

        // Get the loteLicitacao
        restLoteLicitacaoMockMvc.perform(delete("/api/lote-licitacaos/{id}", loteLicitacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LoteLicitacao> loteLicitacaoList = loteLicitacaoRepository.findAll();
        assertThat(loteLicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LoteLicitacao.class);
        LoteLicitacao loteLicitacao1 = new LoteLicitacao();
        loteLicitacao1.setId(1L);
        LoteLicitacao loteLicitacao2 = new LoteLicitacao();
        loteLicitacao2.setId(loteLicitacao1.getId());
        assertThat(loteLicitacao1).isEqualTo(loteLicitacao2);
        loteLicitacao2.setId(2L);
        assertThat(loteLicitacao1).isNotEqualTo(loteLicitacao2);
        loteLicitacao1.setId(null);
        assertThat(loteLicitacao1).isNotEqualTo(loteLicitacao2);
    }
}
