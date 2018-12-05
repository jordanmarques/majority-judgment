package fr.jordanmarques.majorityjudgment.controller

import fr.jordanmarques.majorityjudgment.dto.CountingResultDto
import fr.jordanmarques.majorityjudgment.manager.CountingManager
import fr.jordanmarques.majorityjudgment.service.CountingService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class CountingController(
        private val countingManager: CountingManager
) {
    @RequestMapping(value = ["/counting/{proposalId}"], method = [RequestMethod.GET])
    fun counting(@PathVariable("proposalId") proposalId: String, @RequestParam("token") adminToken: String): CountingResultDto {
        return countingManager.counting(proposalId, adminToken)
    }
}
