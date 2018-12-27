package fr.jordanmarques.majorityjudgment

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping



@SpringBootApplication
@RestController
class MajorityJudgment

fun main(args: Array<String>) {
    runApplication<MajorityJudgment>(*args)
}
