package fr.jordanmarques.majorityjudgment.controller

import fr.jordanmarques.majorityjudgment.model.Proposal
import fr.jordanmarques.majorityjudgment.model.Vote
import fr.jordanmarques.majorityjudgment.service.ProposalService
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RequestMethod.POST


@RestController
class ProposalController(
        private val proposalService: ProposalService
) {

    @RequestMapping(value= ["/proposal"], method = [POST])
    fun new(@RequestBody proposal: Proposal) {
        proposalService.save(proposal)
    }

    @RequestMapping(value= ["/proposal/{proposalId}/vote"], method = [POST])
    fun vote(@RequestBody vote: Vote, @PathVariable("proposalId") proposalId: String) {
        proposalService.vote(proposalId, vote)
    }
}
