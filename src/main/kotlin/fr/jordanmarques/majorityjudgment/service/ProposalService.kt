package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
import fr.jordanmarques.majorityjudgment.dto.UserVoteDto
import fr.jordanmarques.majorityjudgment.model.Proposal
import fr.jordanmarques.majorityjudgment.model.Vote
import org.springframework.stereotype.Service

@Service
class ProposalService(
        private val proposalDao: ProposalDao
) {
    fun save(proposal: Proposal) {
        proposalDao.upsert(proposal)
    }

    fun vote(proposalId: String, vote: UserVoteDto) {
        proposalDao.byId(proposalId)
                ?.let { proposal ->
                    proposal.participants
                            .find { it.mail == vote.mail }
                            ?.let { participant ->

                                if (participant.hasVoted) {
                                    throw RuntimeException("User ${participant.mail} has already Voted")
                                }

                                vote.votes.forEach { vote ->
                                    run {
                                        proposal.votes.add(Vote(choice = vote.choice, appreciation = vote.appreciation))
                                    }
                                }

                                participant.hasVoted = true

                                val participantIdx = proposal.participants.indexOf(participant)
                                proposal.participants[participantIdx] = participant

                                proposalDao.upsert(proposal)

                            } ?: run { throw RuntimeException("This User is not permited to vote for this") }


                } ?: run { throw RuntimeException("Unable to find a proposal with id $proposalId") }
    }
}
