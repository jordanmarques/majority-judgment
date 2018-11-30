package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
import fr.jordanmarques.majorityjudgment.dto.UserVoteDto
import fr.jordanmarques.majorityjudgment.model.Participant
import fr.jordanmarques.majorityjudgment.model.Proposal
import org.springframework.stereotype.Service

@Service
class ProposalService(
        private val proposalDao: ProposalDao
) {
    fun save(proposal: Proposal): String {

        proposal.participants.add(Participant(proposal.creator))

        proposalDao.upsert(proposal)

        return proposal.id
    }

    fun vote(proposalId: String, userVoteDto: UserVoteDto) {

        `check if more than one vote exist per proposition `(userVoteDto)

        proposalDao.byId(proposalId)
                ?.let { proposal ->

                    `check if vote is closed`(proposal)

                    proposal.participants
                            .find { participant -> participant.mail == userVoteDto.mail }
                            ?.let { participant ->

                                `check if user has already voted`(participant)
                                `A voté !`(proposal, participant)

                                proposal.votes.addAll(userVoteDto.votes)

                                proposalDao.upsert(proposal)

                            } ?: run { throw RuntimeException("This User is not permited to vote for this") }


                } ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }

    private fun `A voté !`(proposal: Proposal, participant: Participant) {
        val participantIdx = proposal.participants.indexOf(participant)
        proposal.participants[participantIdx].hasVoted = true
    }

    private fun `check if user has already voted`(participant: Participant) {
        if (participant.hasVoted) {
            throw RuntimeException("User ${participant.mail} has already voted")
        }
    }

    private fun `check if vote is closed`(proposal: Proposal) {
        if (proposal.isClosed) {
            throw RuntimeException("This Vote is closed")
        }
    }

    private fun `check if more than one vote exist per proposition `(userVoteDto: UserVoteDto) {
        userVoteDto.votes
                .groupBy { it.choice.label }
                .values
                .find { it.size > 1 }
                ?.let { throw RuntimeException("Only 1 vote per proposition is allowed, ${it.size} votes found for ${it[0].choice.label}") }
    }
}
