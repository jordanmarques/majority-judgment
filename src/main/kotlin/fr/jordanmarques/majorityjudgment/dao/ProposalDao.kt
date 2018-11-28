package fr.jordanmarques.majorityjudgment.dao

import com.google.cloud.firestore.CollectionReference
import com.google.cloud.firestore.Firestore
import fr.jordanmarques.majorityjudgment.model.Proposal
import org.springframework.stereotype.Repository

@Repository
class ProposalDao(
        private val COLLECTION_NAME: String = "proposals",

        private val database: Firestore,
        private val collection: CollectionReference = database.collection(COLLECTION_NAME)
) {
    fun upsert(proposal: Proposal) {
        val docRef = collection.document(proposal.id)
        docRef.set(proposal)
    }

    fun byId(proposalId: String): Proposal? {
        val docRef = collection.document(proposalId)

        val response = docRef.get()

        return response.get().toObject(Proposal::class.java)
    }
}
