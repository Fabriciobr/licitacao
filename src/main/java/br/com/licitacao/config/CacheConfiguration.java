package br.com.licitacao.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(br.com.licitacao.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(br.com.licitacao.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Proposta.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.TempoRandomico.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Operador.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Fornecedor.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Disputa.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Disputa.class.getName() + ".participantes", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Produto.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.UnidadeOrganizacional.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName() + ".lotes", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName() + ".documentos", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName() + ".alteracoes", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName() + ".interessados", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Licitacao.class.getName() + ".mensagens", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Anexo.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.Entidade.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.LoteLicitacao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.LoteLicitacao.class.getName() + ".itens", jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.ItemLicitacao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.MensagemLicitacao.class.getName(), jcacheConfiguration);
            cm.createCache(br.com.licitacao.domain.AlteracaoLicitacao.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
