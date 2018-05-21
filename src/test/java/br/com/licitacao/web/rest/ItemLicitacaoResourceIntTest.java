package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.ItemLicitacao;
import br.com.licitacao.repository.ItemLicitacaoRepository;
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
 * Test class for the ItemLicitacaoResource REST controller.
 *
 * @see ItemLicitacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class ItemLicitacaoResourceIntTest {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private ItemLicitacaoRepository itemLicitacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restItemLicitacaoMockMvc;

    private ItemLicitacao itemLicitacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemLicitacaoResource itemLicitacaoResource = new ItemLicitacaoResource(itemLicitacaoRepository);
        this.restItemLicitacaoMockMvc = MockMvcBuilders.standaloneSetup(itemLicitacaoResource)
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
    public static ItemLicitacao createEntity(EntityManager em) {
        ItemLicitacao itemLicitacao = new ItemLicitacao()
            .numero(DEFAULT_NUMERO)
            .quantidade(DEFAULT_QUANTIDADE)
            .descricao(DEFAULT_DESCRICAO);
        return itemLicitacao;
    }

    @Before
    public void initTest() {
        itemLicitacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemLicitacao() throws Exception {
        int databaseSizeBeforeCreate = itemLicitacaoRepository.findAll().size();

        // Create the ItemLicitacao
        restItemLicitacaoMockMvc.perform(post("/api/item-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLicitacao)))
            .andExpect(status().isCreated());

        // Validate the ItemLicitacao in the database
        List<ItemLicitacao> itemLicitacaoList = itemLicitacaoRepository.findAll();
        assertThat(itemLicitacaoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemLicitacao testItemLicitacao = itemLicitacaoList.get(itemLicitacaoList.size() - 1);
        assertThat(testItemLicitacao.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testItemLicitacao.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testItemLicitacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createItemLicitacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemLicitacaoRepository.findAll().size();

        // Create the ItemLicitacao with an existing ID
        itemLicitacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemLicitacaoMockMvc.perform(post("/api/item-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLicitacao)))
            .andExpect(status().isBadRequest());

        // Validate the ItemLicitacao in the database
        List<ItemLicitacao> itemLicitacaoList = itemLicitacaoRepository.findAll();
        assertThat(itemLicitacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllItemLicitacaos() throws Exception {
        // Initialize the database
        itemLicitacaoRepository.saveAndFlush(itemLicitacao);

        // Get all the itemLicitacaoList
        restItemLicitacaoMockMvc.perform(get("/api/item-licitacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemLicitacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }

    @Test
    @Transactional
    public void getItemLicitacao() throws Exception {
        // Initialize the database
        itemLicitacaoRepository.saveAndFlush(itemLicitacao);

        // Get the itemLicitacao
        restItemLicitacaoMockMvc.perform(get("/api/item-licitacaos/{id}", itemLicitacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemLicitacao.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingItemLicitacao() throws Exception {
        // Get the itemLicitacao
        restItemLicitacaoMockMvc.perform(get("/api/item-licitacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemLicitacao() throws Exception {
        // Initialize the database
        itemLicitacaoRepository.saveAndFlush(itemLicitacao);
        int databaseSizeBeforeUpdate = itemLicitacaoRepository.findAll().size();

        // Update the itemLicitacao
        ItemLicitacao updatedItemLicitacao = itemLicitacaoRepository.findOne(itemLicitacao.getId());
        // Disconnect from session so that the updates on updatedItemLicitacao are not directly saved in db
        em.detach(updatedItemLicitacao);
        updatedItemLicitacao
            .numero(UPDATED_NUMERO)
            .quantidade(UPDATED_QUANTIDADE)
            .descricao(UPDATED_DESCRICAO);

        restItemLicitacaoMockMvc.perform(put("/api/item-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemLicitacao)))
            .andExpect(status().isOk());

        // Validate the ItemLicitacao in the database
        List<ItemLicitacao> itemLicitacaoList = itemLicitacaoRepository.findAll();
        assertThat(itemLicitacaoList).hasSize(databaseSizeBeforeUpdate);
        ItemLicitacao testItemLicitacao = itemLicitacaoList.get(itemLicitacaoList.size() - 1);
        assertThat(testItemLicitacao.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testItemLicitacao.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testItemLicitacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingItemLicitacao() throws Exception {
        int databaseSizeBeforeUpdate = itemLicitacaoRepository.findAll().size();

        // Create the ItemLicitacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restItemLicitacaoMockMvc.perform(put("/api/item-licitacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemLicitacao)))
            .andExpect(status().isCreated());

        // Validate the ItemLicitacao in the database
        List<ItemLicitacao> itemLicitacaoList = itemLicitacaoRepository.findAll();
        assertThat(itemLicitacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteItemLicitacao() throws Exception {
        // Initialize the database
        itemLicitacaoRepository.saveAndFlush(itemLicitacao);
        int databaseSizeBeforeDelete = itemLicitacaoRepository.findAll().size();

        // Get the itemLicitacao
        restItemLicitacaoMockMvc.perform(delete("/api/item-licitacaos/{id}", itemLicitacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ItemLicitacao> itemLicitacaoList = itemLicitacaoRepository.findAll();
        assertThat(itemLicitacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemLicitacao.class);
        ItemLicitacao itemLicitacao1 = new ItemLicitacao();
        itemLicitacao1.setId(1L);
        ItemLicitacao itemLicitacao2 = new ItemLicitacao();
        itemLicitacao2.setId(itemLicitacao1.getId());
        assertThat(itemLicitacao1).isEqualTo(itemLicitacao2);
        itemLicitacao2.setId(2L);
        assertThat(itemLicitacao1).isNotEqualTo(itemLicitacao2);
        itemLicitacao1.setId(null);
        assertThat(itemLicitacao1).isNotEqualTo(itemLicitacao2);
    }
}
