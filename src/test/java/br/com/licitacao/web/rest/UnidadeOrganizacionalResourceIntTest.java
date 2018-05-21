package br.com.licitacao.web.rest;

import br.com.licitacao.LicitacaoApp;

import br.com.licitacao.domain.UnidadeOrganizacional;
import br.com.licitacao.repository.UnidadeOrganizacionalRepository;
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
 * Test class for the UnidadeOrganizacionalResource REST controller.
 *
 * @see UnidadeOrganizacionalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LicitacaoApp.class)
public class UnidadeOrganizacionalResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private UnidadeOrganizacionalRepository unidadeOrganizacionalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUnidadeOrganizacionalMockMvc;

    private UnidadeOrganizacional unidadeOrganizacional;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UnidadeOrganizacionalResource unidadeOrganizacionalResource = new UnidadeOrganizacionalResource(unidadeOrganizacionalRepository);
        this.restUnidadeOrganizacionalMockMvc = MockMvcBuilders.standaloneSetup(unidadeOrganizacionalResource)
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
    public static UnidadeOrganizacional createEntity(EntityManager em) {
        UnidadeOrganizacional unidadeOrganizacional = new UnidadeOrganizacional()
            .nome(DEFAULT_NOME);
        return unidadeOrganizacional;
    }

    @Before
    public void initTest() {
        unidadeOrganizacional = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnidadeOrganizacional() throws Exception {
        int databaseSizeBeforeCreate = unidadeOrganizacionalRepository.findAll().size();

        // Create the UnidadeOrganizacional
        restUnidadeOrganizacionalMockMvc.perform(post("/api/unidade-organizacionals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unidadeOrganizacional)))
            .andExpect(status().isCreated());

        // Validate the UnidadeOrganizacional in the database
        List<UnidadeOrganizacional> unidadeOrganizacionalList = unidadeOrganizacionalRepository.findAll();
        assertThat(unidadeOrganizacionalList).hasSize(databaseSizeBeforeCreate + 1);
        UnidadeOrganizacional testUnidadeOrganizacional = unidadeOrganizacionalList.get(unidadeOrganizacionalList.size() - 1);
        assertThat(testUnidadeOrganizacional.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createUnidadeOrganizacionalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeOrganizacionalRepository.findAll().size();

        // Create the UnidadeOrganizacional with an existing ID
        unidadeOrganizacional.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeOrganizacionalMockMvc.perform(post("/api/unidade-organizacionals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unidadeOrganizacional)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeOrganizacional in the database
        List<UnidadeOrganizacional> unidadeOrganizacionalList = unidadeOrganizacionalRepository.findAll();
        assertThat(unidadeOrganizacionalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUnidadeOrganizacionals() throws Exception {
        // Initialize the database
        unidadeOrganizacionalRepository.saveAndFlush(unidadeOrganizacional);

        // Get all the unidadeOrganizacionalList
        restUnidadeOrganizacionalMockMvc.perform(get("/api/unidade-organizacionals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidadeOrganizacional.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }

    @Test
    @Transactional
    public void getUnidadeOrganizacional() throws Exception {
        // Initialize the database
        unidadeOrganizacionalRepository.saveAndFlush(unidadeOrganizacional);

        // Get the unidadeOrganizacional
        restUnidadeOrganizacionalMockMvc.perform(get("/api/unidade-organizacionals/{id}", unidadeOrganizacional.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(unidadeOrganizacional.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUnidadeOrganizacional() throws Exception {
        // Get the unidadeOrganizacional
        restUnidadeOrganizacionalMockMvc.perform(get("/api/unidade-organizacionals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidadeOrganizacional() throws Exception {
        // Initialize the database
        unidadeOrganizacionalRepository.saveAndFlush(unidadeOrganizacional);
        int databaseSizeBeforeUpdate = unidadeOrganizacionalRepository.findAll().size();

        // Update the unidadeOrganizacional
        UnidadeOrganizacional updatedUnidadeOrganizacional = unidadeOrganizacionalRepository.findOne(unidadeOrganizacional.getId());
        // Disconnect from session so that the updates on updatedUnidadeOrganizacional are not directly saved in db
        em.detach(updatedUnidadeOrganizacional);
        updatedUnidadeOrganizacional
            .nome(UPDATED_NOME);

        restUnidadeOrganizacionalMockMvc.perform(put("/api/unidade-organizacionals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnidadeOrganizacional)))
            .andExpect(status().isOk());

        // Validate the UnidadeOrganizacional in the database
        List<UnidadeOrganizacional> unidadeOrganizacionalList = unidadeOrganizacionalRepository.findAll();
        assertThat(unidadeOrganizacionalList).hasSize(databaseSizeBeforeUpdate);
        UnidadeOrganizacional testUnidadeOrganizacional = unidadeOrganizacionalList.get(unidadeOrganizacionalList.size() - 1);
        assertThat(testUnidadeOrganizacional.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidadeOrganizacional() throws Exception {
        int databaseSizeBeforeUpdate = unidadeOrganizacionalRepository.findAll().size();

        // Create the UnidadeOrganizacional

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUnidadeOrganizacionalMockMvc.perform(put("/api/unidade-organizacionals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(unidadeOrganizacional)))
            .andExpect(status().isCreated());

        // Validate the UnidadeOrganizacional in the database
        List<UnidadeOrganizacional> unidadeOrganizacionalList = unidadeOrganizacionalRepository.findAll();
        assertThat(unidadeOrganizacionalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUnidadeOrganizacional() throws Exception {
        // Initialize the database
        unidadeOrganizacionalRepository.saveAndFlush(unidadeOrganizacional);
        int databaseSizeBeforeDelete = unidadeOrganizacionalRepository.findAll().size();

        // Get the unidadeOrganizacional
        restUnidadeOrganizacionalMockMvc.perform(delete("/api/unidade-organizacionals/{id}", unidadeOrganizacional.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UnidadeOrganizacional> unidadeOrganizacionalList = unidadeOrganizacionalRepository.findAll();
        assertThat(unidadeOrganizacionalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnidadeOrganizacional.class);
        UnidadeOrganizacional unidadeOrganizacional1 = new UnidadeOrganizacional();
        unidadeOrganizacional1.setId(1L);
        UnidadeOrganizacional unidadeOrganizacional2 = new UnidadeOrganizacional();
        unidadeOrganizacional2.setId(unidadeOrganizacional1.getId());
        assertThat(unidadeOrganizacional1).isEqualTo(unidadeOrganizacional2);
        unidadeOrganizacional2.setId(2L);
        assertThat(unidadeOrganizacional1).isNotEqualTo(unidadeOrganizacional2);
        unidadeOrganizacional1.setId(null);
        assertThat(unidadeOrganizacional1).isNotEqualTo(unidadeOrganizacional2);
    }
}
