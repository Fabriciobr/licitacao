package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.Licitacao;
import br.com.licitacao.repository.LicitacaoRepository;
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

import br.com.licitacao.domain.enumeration.TipoCadastro;
import br.com.licitacao.domain.enumeration.ModalidadeLicitacao;
import br.com.licitacao.domain.enumeration.TipoParticipacaoFornecedor;
import br.com.licitacao.domain.enumeration.FormaConducao;
import br.com.licitacao.domain.enumeration.TipoLicitacao;
import br.com.licitacao.domain.enumeration.Moeda;
import br.com.licitacao.domain.enumeration.AbrangenciaDisputa;
import br.com.licitacao.domain.enumeration.TipoMoedaProposta;
import br.com.licitacao.domain.enumeration.TipoAliquotaDiferenciada;
import br.com.licitacao.domain.enumeration.SituacaoLicitacao;
/**
 * Test class for the LicitacaoResource REST controller.
 *
 * @see LicitacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class LicitacaoResourceIntTest {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final TipoCadastro DEFAULT_TIPO_CADASTRO = TipoCadastro.AQUISICAO;
    private static final TipoCadastro UPDATED_TIPO_CADASTRO = TipoCadastro.SIMULACAO;

    private static final String DEFAULT_EDITAL = "AAAAAAAAAA";
    private static final String UPDATED_EDITAL = "BBBBBBBBBB";

    private static final String DEFAULT_PROCESSO = "AAAAAAAAAA";
    private static final String UPDATED_PROCESSO = "BBBBBBBBBB";

    private static final ModalidadeLicitacao DEFAULT_MODALIDADE = ModalidadeLicitacao.TIPO1;
    private static final ModalidadeLicitacao UPDATED_MODALIDADE = ModalidadeLicitacao.TIPO2;

    private static final TipoParticipacaoFornecedor DEFAULT_TIPO_PARTICIPACAO_FORNECEDOR = TipoParticipacaoFornecedor.TIPO1;
    private static final TipoParticipacaoFornecedor UPDATED_TIPO_PARTICIPACAO_FORNECEDOR = TipoParticipacaoFornecedor.TIPO2;

    private static final FormaConducao DEFAULT_FORMA_CONDUCAO = FormaConducao.TIPO1;
    private static final FormaConducao UPDATED_FORMA_CONDUCAO = FormaConducao.TIPO2;

    private static final TipoLicitacao DEFAULT_TIPO = TipoLicitacao.TIPO1;
    private static final TipoLicitacao UPDATED_TIPO = TipoLicitacao.TIPO2;

    private static final Moeda DEFAULT_MOEDA = Moeda.REAL;
    private static final Moeda UPDATED_MOEDA = Moeda.DOLAR;

    private static final Integer DEFAULT_PRAZO_IMPUGNACAO = 1;
    private static final Integer UPDATED_PRAZO_IMPUGNACAO = 2;

    private static final Instant DEFAULT_INICIO_ACOLHIMENTO_PROPOSTAS = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INICIO_ACOLHIMENTO_PROPOSTAS = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_HORA_DISPUTA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_DISPUTA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_ABERTURA_PROPOSTAS = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ABERTURA_PROPOSTAS = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final AbrangenciaDisputa DEFAULT_ABRANGENCIA_DISPUTA = AbrangenciaDisputa.TIPO1;
    private static final AbrangenciaDisputa UPDATED_ABRANGENCIA_DISPUTA = AbrangenciaDisputa.TIPO2;

    private static final TipoMoedaProposta DEFAULT_TIPO_MOEDA_PROPOSTA = TipoMoedaProposta.MOEDA_DA_PROPOSTA;
    private static final TipoMoedaProposta UPDATED_TIPO_MOEDA_PROPOSTA = TipoMoedaProposta.MOEDA_DO_PAIS_DO_FORNECEDOR;

    private static final String DEFAULT_RESUMO = "AAAAAAAAAA";
    private static final String UPDATED_RESUMO = "BBBBBBBBBB";

    private static final TipoAliquotaDiferenciada DEFAULT_ALIQUOTA_DIFERENCIADA = TipoAliquotaDiferenciada.TIPO1;
    private static final TipoAliquotaDiferenciada UPDATED_ALIQUOTA_DIFERENCIADA = TipoAliquotaDiferenciada.TIPO2;

    private static final SituacaoLicitacao DEFAULT_SITUACAO = SituacaoLicitacao.SITUACAO;
    private static final SituacaoLicitacao UPDATED_SITUACAO = SituacaoLicitacao.SITU2;

    private static final Instant DEFAULT_DATA_HORA_PUBLICACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_PUBLICACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ATA = "AAAAAAAAAA";
    private static final String UPDATED_ATA = "BBBBBBBBBB";

    @Autowired
    private LicitacaoRepository licitacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLicitacaoMockMvc;

    private Licitacao licitacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LicitacaoResource licitacaoResource = new LicitacaoResource(licitacaoRepository);
        this.restLicitacaoMockMvc = MockMvcBuilders.standaloneSetup(licitacaoResource)
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
    public static Licitacao createEntity(EntityManager em) {
        Licitacao licitacao = new Licitacao()
            .numero(DEFAULT_NUMERO)
            .tipoCadastro(DEFAULT_TIPO_CADASTRO)
            .edital(DEFAULT_EDITAL)
            .processo(DEFAULT_PROCESSO)
            .modalidade(DEFAULT_MODALIDADE)
            .tipoParticipacaoFornecedor(DEFAULT_TIPO_PARTICIPACAO_FORNECEDOR)
            .formaConducao(DEFAULT_FORMA_CONDUCAO)
            .tipo(DEFAULT_TIPO)
            .moeda(DEFAULT_MOEDA)
            .prazoImpugnacao(DEFAULT_PRAZO_IMPUGNACAO)
            .inicioAcolhimentoPropostas(DEFAULT_INICIO_ACOLHIMENTO_PROPOSTAS)
            .dataHoraDisputa(DEFAULT_DATA_HORA_DISPUTA)
            .aberturaPropostas(DEFAULT_ABERTURA_PROPOSTAS)
            .abrangenciaDisputa(DEFAULT_ABRANGENCIA_DISPUTA)
            .tipoMoedaProposta(DEFAULT_TIPO_MOEDA_PROPOSTA)
            .resumo(DEFAULT_RESUMO)
            .aliquotaDiferenciada(DEFAULT_ALIQUOTA_DIFERENCIADA)
            .situacao(DEFAULT_SITUACAO)
            .dataHoraPublicacao(DEFAULT_DATA_HORA_PUBLICACAO)
            .ata(DEFAULT_ATA);
        return licitacao;
    }

    @Before
    public void initTest() {
        licitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createLicitacao() throws Exception {
        int databaseSizeBeforeCreate = licitacaoRepository.findAll().size();

        // Create the Licitacao
        restLicitacaoMockMvc.perform(post("/api/licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licitacao)))
            .andExpect(status().isCreated());

        // Validate the Licitacao in the database
        List<Licitacao> licitacaoList = licitacaoRepository.findAll();
        assertThat(licitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Licitacao testLicitacao = licitacaoList.get(licitacaoList.size() - 1);
        assertThat(testLicitacao.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testLicitacao.getTipoCadastro()).isEqualTo(DEFAULT_TIPO_CADASTRO);
        assertThat(testLicitacao.getEdital()).isEqualTo(DEFAULT_EDITAL);
        assertThat(testLicitacao.getProcesso()).isEqualTo(DEFAULT_PROCESSO);
        assertThat(testLicitacao.getModalidade()).isEqualTo(DEFAULT_MODALIDADE);
        assertThat(testLicitacao.getTipoParticipacaoFornecedor()).isEqualTo(DEFAULT_TIPO_PARTICIPACAO_FORNECEDOR);
        assertThat(testLicitacao.getFormaConducao()).isEqualTo(DEFAULT_FORMA_CONDUCAO);
        assertThat(testLicitacao.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testLicitacao.getMoeda()).isEqualTo(DEFAULT_MOEDA);
        assertThat(testLicitacao.getPrazoImpugnacao()).isEqualTo(DEFAULT_PRAZO_IMPUGNACAO);
        assertThat(testLicitacao.getInicioAcolhimentoPropostas()).isEqualTo(DEFAULT_INICIO_ACOLHIMENTO_PROPOSTAS);
        assertThat(testLicitacao.getDataHoraDisputa()).isEqualTo(DEFAULT_DATA_HORA_DISPUTA);
        assertThat(testLicitacao.getAberturaPropostas()).isEqualTo(DEFAULT_ABERTURA_PROPOSTAS);
        assertThat(testLicitacao.getAbrangenciaDisputa()).isEqualTo(DEFAULT_ABRANGENCIA_DISPUTA);
        assertThat(testLicitacao.getTipoMoedaProposta()).isEqualTo(DEFAULT_TIPO_MOEDA_PROPOSTA);
        assertThat(testLicitacao.getResumo()).isEqualTo(DEFAULT_RESUMO);
        assertThat(testLicitacao.getAliquotaDiferenciada()).isEqualTo(DEFAULT_ALIQUOTA_DIFERENCIADA);
        assertThat(testLicitacao.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
        assertThat(testLicitacao.getDataHoraPublicacao()).isEqualTo(DEFAULT_DATA_HORA_PUBLICACAO);
        assertThat(testLicitacao.getAta()).isEqualTo(DEFAULT_ATA);
    }

    @Test
    @Transactional
    public void createLicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = licitacaoRepository.findAll().size();

        // Create the Licitacao with an existing ID
        licitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLicitacaoMockMvc.perform(post("/api/licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licitacao)))
            .andExpect(status().isBadRequest());

        // Validate the Licitacao in the database
        List<Licitacao> licitacaoList = licitacaoRepository.findAll();
        assertThat(licitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLicitacaos() throws Exception {
        // Initialize the database
        licitacaoRepository.saveAndFlush(licitacao);

        // Get all the licitacaoList
        restLicitacaoMockMvc.perform(get("/api/licitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(licitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].tipoCadastro").value(hasItem(DEFAULT_TIPO_CADASTRO.toString())))
            .andExpect(jsonPath("$.[*].edital").value(hasItem(DEFAULT_EDITAL.toString())))
            .andExpect(jsonPath("$.[*].processo").value(hasItem(DEFAULT_PROCESSO.toString())))
            .andExpect(jsonPath("$.[*].modalidade").value(hasItem(DEFAULT_MODALIDADE.toString())))
            .andExpect(jsonPath("$.[*].tipoParticipacaoFornecedor").value(hasItem(DEFAULT_TIPO_PARTICIPACAO_FORNECEDOR.toString())))
            .andExpect(jsonPath("$.[*].formaConducao").value(hasItem(DEFAULT_FORMA_CONDUCAO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].moeda").value(hasItem(DEFAULT_MOEDA.toString())))
            .andExpect(jsonPath("$.[*].prazoImpugnacao").value(hasItem(DEFAULT_PRAZO_IMPUGNACAO)))
            .andExpect(jsonPath("$.[*].inicioAcolhimentoPropostas").value(hasItem(DEFAULT_INICIO_ACOLHIMENTO_PROPOSTAS.toString())))
            .andExpect(jsonPath("$.[*].dataHoraDisputa").value(hasItem(DEFAULT_DATA_HORA_DISPUTA.toString())))
            .andExpect(jsonPath("$.[*].aberturaPropostas").value(hasItem(DEFAULT_ABERTURA_PROPOSTAS.toString())))
            .andExpect(jsonPath("$.[*].abrangenciaDisputa").value(hasItem(DEFAULT_ABRANGENCIA_DISPUTA.toString())))
            .andExpect(jsonPath("$.[*].tipoMoedaProposta").value(hasItem(DEFAULT_TIPO_MOEDA_PROPOSTA.toString())))
            .andExpect(jsonPath("$.[*].resumo").value(hasItem(DEFAULT_RESUMO.toString())))
            .andExpect(jsonPath("$.[*].aliquotaDiferenciada").value(hasItem(DEFAULT_ALIQUOTA_DIFERENCIADA.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())))
            .andExpect(jsonPath("$.[*].dataHoraPublicacao").value(hasItem(DEFAULT_DATA_HORA_PUBLICACAO.toString())))
            .andExpect(jsonPath("$.[*].ata").value(hasItem(DEFAULT_ATA.toString())));
    }

    @Test
    @Transactional
    public void getLicitacao() throws Exception {
        // Initialize the database
        licitacaoRepository.saveAndFlush(licitacao);

        // Get the licitacao
        restLicitacaoMockMvc.perform(get("/api/licitacaos/{id}", licitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(licitacao.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.tipoCadastro").value(DEFAULT_TIPO_CADASTRO.toString()))
            .andExpect(jsonPath("$.edital").value(DEFAULT_EDITAL.toString()))
            .andExpect(jsonPath("$.processo").value(DEFAULT_PROCESSO.toString()))
            .andExpect(jsonPath("$.modalidade").value(DEFAULT_MODALIDADE.toString()))
            .andExpect(jsonPath("$.tipoParticipacaoFornecedor").value(DEFAULT_TIPO_PARTICIPACAO_FORNECEDOR.toString()))
            .andExpect(jsonPath("$.formaConducao").value(DEFAULT_FORMA_CONDUCAO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.moeda").value(DEFAULT_MOEDA.toString()))
            .andExpect(jsonPath("$.prazoImpugnacao").value(DEFAULT_PRAZO_IMPUGNACAO))
            .andExpect(jsonPath("$.inicioAcolhimentoPropostas").value(DEFAULT_INICIO_ACOLHIMENTO_PROPOSTAS.toString()))
            .andExpect(jsonPath("$.dataHoraDisputa").value(DEFAULT_DATA_HORA_DISPUTA.toString()))
            .andExpect(jsonPath("$.aberturaPropostas").value(DEFAULT_ABERTURA_PROPOSTAS.toString()))
            .andExpect(jsonPath("$.abrangenciaDisputa").value(DEFAULT_ABRANGENCIA_DISPUTA.toString()))
            .andExpect(jsonPath("$.tipoMoedaProposta").value(DEFAULT_TIPO_MOEDA_PROPOSTA.toString()))
            .andExpect(jsonPath("$.resumo").value(DEFAULT_RESUMO.toString()))
            .andExpect(jsonPath("$.aliquotaDiferenciada").value(DEFAULT_ALIQUOTA_DIFERENCIADA.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()))
            .andExpect(jsonPath("$.dataHoraPublicacao").value(DEFAULT_DATA_HORA_PUBLICACAO.toString()))
            .andExpect(jsonPath("$.ata").value(DEFAULT_ATA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLicitacao() throws Exception {
        // Get the licitacao
        restLicitacaoMockMvc.perform(get("/api/licitacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLicitacao() throws Exception {
        // Initialize the database
        licitacaoRepository.saveAndFlush(licitacao);
        int databaseSizeBeforeUpdate = licitacaoRepository.findAll().size();

        // Update the licitacao
        Licitacao updatedLicitacao = licitacaoRepository.findOne(licitacao.getId());
        // Disconnect from session so that the updates on updatedLicitacao are not directly saved in db
        em.detach(updatedLicitacao);
        updatedLicitacao
            .numero(UPDATED_NUMERO)
            .tipoCadastro(UPDATED_TIPO_CADASTRO)
            .edital(UPDATED_EDITAL)
            .processo(UPDATED_PROCESSO)
            .modalidade(UPDATED_MODALIDADE)
            .tipoParticipacaoFornecedor(UPDATED_TIPO_PARTICIPACAO_FORNECEDOR)
            .formaConducao(UPDATED_FORMA_CONDUCAO)
            .tipo(UPDATED_TIPO)
            .moeda(UPDATED_MOEDA)
            .prazoImpugnacao(UPDATED_PRAZO_IMPUGNACAO)
            .inicioAcolhimentoPropostas(UPDATED_INICIO_ACOLHIMENTO_PROPOSTAS)
            .dataHoraDisputa(UPDATED_DATA_HORA_DISPUTA)
            .aberturaPropostas(UPDATED_ABERTURA_PROPOSTAS)
            .abrangenciaDisputa(UPDATED_ABRANGENCIA_DISPUTA)
            .tipoMoedaProposta(UPDATED_TIPO_MOEDA_PROPOSTA)
            .resumo(UPDATED_RESUMO)
            .aliquotaDiferenciada(UPDATED_ALIQUOTA_DIFERENCIADA)
            .situacao(UPDATED_SITUACAO)
            .dataHoraPublicacao(UPDATED_DATA_HORA_PUBLICACAO)
            .ata(UPDATED_ATA);

        restLicitacaoMockMvc.perform(put("/api/licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLicitacao)))
            .andExpect(status().isOk());

        // Validate the Licitacao in the database
        List<Licitacao> licitacaoList = licitacaoRepository.findAll();
        assertThat(licitacaoList).hasSize(databaseSizeBeforeUpdate);
        Licitacao testLicitacao = licitacaoList.get(licitacaoList.size() - 1);
        assertThat(testLicitacao.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testLicitacao.getTipoCadastro()).isEqualTo(UPDATED_TIPO_CADASTRO);
        assertThat(testLicitacao.getEdital()).isEqualTo(UPDATED_EDITAL);
        assertThat(testLicitacao.getProcesso()).isEqualTo(UPDATED_PROCESSO);
        assertThat(testLicitacao.getModalidade()).isEqualTo(UPDATED_MODALIDADE);
        assertThat(testLicitacao.getTipoParticipacaoFornecedor()).isEqualTo(UPDATED_TIPO_PARTICIPACAO_FORNECEDOR);
        assertThat(testLicitacao.getFormaConducao()).isEqualTo(UPDATED_FORMA_CONDUCAO);
        assertThat(testLicitacao.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testLicitacao.getMoeda()).isEqualTo(UPDATED_MOEDA);
        assertThat(testLicitacao.getPrazoImpugnacao()).isEqualTo(UPDATED_PRAZO_IMPUGNACAO);
        assertThat(testLicitacao.getInicioAcolhimentoPropostas()).isEqualTo(UPDATED_INICIO_ACOLHIMENTO_PROPOSTAS);
        assertThat(testLicitacao.getDataHoraDisputa()).isEqualTo(UPDATED_DATA_HORA_DISPUTA);
        assertThat(testLicitacao.getAberturaPropostas()).isEqualTo(UPDATED_ABERTURA_PROPOSTAS);
        assertThat(testLicitacao.getAbrangenciaDisputa()).isEqualTo(UPDATED_ABRANGENCIA_DISPUTA);
        assertThat(testLicitacao.getTipoMoedaProposta()).isEqualTo(UPDATED_TIPO_MOEDA_PROPOSTA);
        assertThat(testLicitacao.getResumo()).isEqualTo(UPDATED_RESUMO);
        assertThat(testLicitacao.getAliquotaDiferenciada()).isEqualTo(UPDATED_ALIQUOTA_DIFERENCIADA);
        assertThat(testLicitacao.getSituacao()).isEqualTo(UPDATED_SITUACAO);
        assertThat(testLicitacao.getDataHoraPublicacao()).isEqualTo(UPDATED_DATA_HORA_PUBLICACAO);
        assertThat(testLicitacao.getAta()).isEqualTo(UPDATED_ATA);
    }

    @Test
    @Transactional
    public void updateNonExistingLicitacao() throws Exception {
        int databaseSizeBeforeUpdate = licitacaoRepository.findAll().size();

        // Create the Licitacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLicitacaoMockMvc.perform(put("/api/licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(licitacao)))
            .andExpect(status().isCreated());

        // Validate the Licitacao in the database
        List<Licitacao> licitacaoList = licitacaoRepository.findAll();
        assertThat(licitacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLicitacao() throws Exception {
        // Initialize the database
        licitacaoRepository.saveAndFlush(licitacao);
        int databaseSizeBeforeDelete = licitacaoRepository.findAll().size();

        // Get the licitacao
        restLicitacaoMockMvc.perform(delete("/api/licitacaos/{id}", licitacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Licitacao> licitacaoList = licitacaoRepository.findAll();
        assertThat(licitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Licitacao.class);
        Licitacao licitacao1 = new Licitacao();
        licitacao1.setId(1L);
        Licitacao licitacao2 = new Licitacao();
        licitacao2.setId(licitacao1.getId());
        assertThat(licitacao1).isEqualTo(licitacao2);
        licitacao2.setId(2L);
        assertThat(licitacao1).isNotEqualTo(licitacao2);
        licitacao1.setId(null);
        assertThat(licitacao1).isNotEqualTo(licitacao2);
    }
}
