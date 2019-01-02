package fr.jordanmarques.majorityjudgment.model

import java.util.*

data class Participant(
        var mail: String = "",
        var voteToken: String = UUID.randomUUID().toString(),
        var hasVoted: Boolean = false
)
