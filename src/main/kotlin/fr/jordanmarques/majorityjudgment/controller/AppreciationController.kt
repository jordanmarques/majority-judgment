package fr.jordanmarques.majorityjudgment.controller

import fr.jordanmarques.majorityjudgment.model.Appreciation
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class AppreciationController {
    @RequestMapping(value = ["/appreciations"], method = [RequestMethod.GET])
    fun counting(): Array<Appreciation> {
        return Appreciation.values()
    }
}
