package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.Entidade;
import br.com.licitacao.repository.EntidadeRepository;
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
 * Test class for the EntidadeResource REST controller.
 *
 * @see EntidadeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class EntidadeResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private EntidadeRepository entidadeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEntidadeMockMvc;

    private Entidade entidade;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntidadeResource entidadeResource = new EntidadeResource(entidadeRepository);
        this.restEntidadeMockMvc = MockMvcBuilders.standaloneSetup(entidadeResource)
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
    public static Entidade createEntity(EntityManager em) {
        Entidade entidade = new Entidade()
            .nome(DEFAULT_NOME);
        return entidade;
    }

    @Before
    public void initTest() {
        entidade = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidade() throws Exception {
        int databaseSizeBeforeCreate = entidadeRepository.findAll().size();

        // Create the Entidade
        restEntidadeMockMvc.perform(post("/api/entidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidade)))
            .andExpect(status().isCreated());

        // Validate the Entidade in the database
        List<Entidade> entidadeList = entidadeRepository.findAll();
        assertThat(entidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Entidade testEntidade = entidadeList.get(entidadeList.size() - 1);
        assertThat(testEntidade.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createEntidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadeRepository.findAll().size();

        // Create the Entidade with an existing ID
        entidade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadeMockMvc.perform(post("/api/entidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidade)))
            .andExpect(status().isBadRequest());

        // Validate the Entidade in the database
        List<Entidade> entidadeList = entidadeRepository.findAll();
        assertThat(entidadeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEntidades() throws Exception {
        // Initialize the database
        entidadeRepository.saveAndFlush(entidade);

        // Get all the entidadeList
        restEntidadeMockMvc.perform(get("/api/entidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidade.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getEntidade() throws Exception {
        // Initialize the database
        entidadeRepository.saveAndFlush(entidade);

        // Get the entidade
        restEntidadeMockMvc.perform(get("/api/entidades/{id}", entidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entidade.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntidade() throws Exception {
        // Get the entidade
        restEntidadeMockMvc.perform(get("/api/entidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidade() throws Exception {
        // Initialize the database
        entidadeRepository.saveAndFlush(entidade);
        int databaseSizeBeforeUpdate = entidadeRepository.findAll().size();

        // Update the entidade
        Entidade updatedEntidade = entidadeRepository.findOne(entidade.getId());
        // Disconnect from session so that the updates on updatedEntidade are not directly saved in db
        em.detach(updatedEntidade);
        updatedEntidade
            .nome(UPDATED_NOME);

        restEntidadeMockMvc.perform(put("/api/entidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntidade)))
            .andExpect(status().isOk());

        // Validate the Entidade in the database
        List<Entidade> entidadeList = entidadeRepository.findAll();
        assertThat(entidadeList).hasSize(databaseSizeBeforeUpdate);
        Entidade testEntidade = entidadeList.get(entidadeList.size() - 1);
        assertThat(testEntidade.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidade() throws Exception {
        int databaseSizeBeforeUpdate = entidadeRepository.findAll().size();

        // Create the Entidade

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEntidadeMockMvc.perform(put("/api/entidades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidade)))
            .andExpect(status().isCreated());

        // Validate the Entidade in the database
        List<Entidade> entidadeList = entidadeRepository.findAll();
        assertThat(entidadeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEntidade() throws Exception {
        // Initialize the database
        entidadeRepository.saveAndFlush(entidade);
        int databaseSizeBeforeDelete = entidadeRepository.findAll().size();

        // Get the entidade
        restEntidadeMockMvc.perform(delete("/api/entidades/{id}", entidade.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Entidade> entidadeList = entidadeRepository.findAll();
        assertThat(entidadeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entidade.class);
        Entidade entidade1 = new Entidade();
        entidade1.setId(1L);
        Entidade entidade2 = new Entidade();
        entidade2.setId(entidade1.getId());
        assertThat(entidade1).isEqualTo(entidade2);
        entidade2.setId(2L);
        assertThat(entidade1).isNotEqualTo(entidade2);
        entidade1.setId(null);
        assertThat(entidade1).isNotEqualTo(entidade2);
    }
}
