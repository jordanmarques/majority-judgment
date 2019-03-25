package fr.jordanmarques.majorityjudgment.manager

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
import fr.jordanmarques.majorityjudgment.dto.CountingResultDto
import fr.jordanmarques.majorityjudgment.service.CountingService
import fr.jordanmarques.majorityjudgment.service.EmailService
import org.springframework.stereotype.Service

@Service
class CountingManager(
        private val countingService: CountingService,
        private val proposalDao: ProposalDao,
        private val emailService: EmailService
) {
    fun counting(proposalId: String, adminToken: String): CountingResultDto {
        proposalDao.byId(proposalId)
                ?.let { proposal ->
                    if (proposal.adminToken != adminToken) throw RuntimeException("Invalid Token")

                    val count = countingService.count(proposal.votes)

                    val winner = countingService.findWinner(count)

                    return CountingResultDto(winner, count)
                }
                ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }
    fun revival(proposalId: String, adminToken: String) {
        proposalDao.byId(proposalId)
                ?.let { proposal ->
                    if (proposal.adminToken != adminToken) throw RuntimeException("Token is not correct")

                    val missingVoters = proposal.participants
                            .filter { !it.hasVoted }

                    emailService.sendReminder(missingVoters, proposal.label, proposalId)
                }
                ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }
}
