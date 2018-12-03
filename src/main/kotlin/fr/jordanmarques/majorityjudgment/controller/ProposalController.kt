package fr.jordanmarques.majorityjudgment.controller

import fr.jordanmarques.majorityjudgment.dto.UserVoteDto
import fr.jordanmarques.majorityjudgment.model.Choice
import fr.jordanmarques.majorityjudgment.model.Proposal
import fr.jordanmarques.majorityjudgment.service.ProposalService
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestMethod.GET
import org.springframework.web.bind.annotation.RequestMethod.POST


@RestController
class ProposalController(
        private val proposalService: ProposalService
) {

    @RequestMapping(value= ["/proposal"], method = [POST])
    fun new(@RequestBody proposal: Proposal): HashMap<String, String> {
        val id = proposalService.save(proposal)
        val map = HashMap<String, String>()
        map["id"] = id
        return map
    }

    @RequestMapping(value= ["/proposal/{proposalId}/vote"], method = [POST])
    fun vote(@RequestBody userVote: UserVoteDto, @PathVariable("proposalId") proposalId: String) {
        proposalService.vote(proposalId, userVote)
    }

    @RequestMapping(value= ["/proposal/{proposalId}/choices"], method = [GET])
    fun choices(@PathVariable("proposalId") proposalId: String): List<Choice> {
        return proposalService.choices(proposalId)
    }

    @RequestMapping(value= ["/proposal/{proposalId}/name"], method = [GET])
    fun name(@PathVariable("proposalId") proposalId: String): String {
        return proposalService.name(proposalId)
    }
}
