package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
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

    fun vote(proposalId: String, vote: Vote) {
        proposalDao.byId(proposalId)
                ?.let {
                    it.votes.add(vote)
                    proposalDao.upsert(it)
                }
                ?: run {
                    throw RuntimeException("Unable to find a proposal with id $proposalId")
                }
    }
}
