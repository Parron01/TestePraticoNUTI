package com.projetoNuti.infra;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173"
                        , "https://teste-pratico-nuti.vercel.app"
                        ,"https://teste-pratico-nuti-git-main-andre-parrons-projects.vercel.app"
                        ,"https://teste-pratico-nuti-khe77y0wl-andre-parrons-projects.vercel.app"
                        ,"http://192.168.0.4")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
