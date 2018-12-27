package fr.jordanmarques.majorityjudgment.conf

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter


@Configuration
class WebConfiguration : WebMvcConfigurerAdapter() {

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/{[path:[^\\.]*}")
                .setViewName("forward:/")
        registry.addViewController("/**/{[path:[^\\.]*}")
                .setViewName("forward:/")
        registry.addViewController("/{[path:[^\\.]*}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/")
    }
}
