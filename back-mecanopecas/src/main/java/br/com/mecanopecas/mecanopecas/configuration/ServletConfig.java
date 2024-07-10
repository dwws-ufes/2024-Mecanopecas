package br.com.mecanopecas.mecanopecas.configuration;

import br.com.mecanopecas.mecanopecas.persistence.PecaRepository;
import br.com.mecanopecas.mecanopecas.servlets.ListPecasRdfServlet;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ServletComponentScan
public class ServletConfig {
    private PecaRepository pecaRepository;
    public ServletConfig(PecaRepository pecaRepository) {
        this.pecaRepository = pecaRepository;
    }

    @Bean
    public ServletRegistrationBean<ListPecasRdfServlet> listPecasRdfServletRegistration() {
        ServletRegistrationBean<ListPecasRdfServlet> registrationBean = new ServletRegistrationBean<>(new ListPecasRdfServlet(pecaRepository), "/mecanopecas/data/pecas");
        return registrationBean;
    }
}
