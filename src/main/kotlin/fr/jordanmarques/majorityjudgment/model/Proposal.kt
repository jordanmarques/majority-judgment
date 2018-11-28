package fr.jordanmarques.majorityjudgment.model

import java.util.*

data class Proposal(
        var id: String = UUID.randomUUID().toString(),
        var label: String = "",
        var creator: String = "",
        var choices: List<Choice> = mutableListOf(),
        var isClosed: Boolean = false,
        var participants: MutableList<Participant> = mutableListOf(),
        var votes: MutableList<Vote> = mutableListOf()
)
