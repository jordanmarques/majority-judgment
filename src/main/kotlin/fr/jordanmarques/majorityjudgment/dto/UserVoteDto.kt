package fr.jordanmarques.majorityjudgment.dto

import fr.jordanmarques.majorityjudgment.model.Vote

data class UserVoteDto(
        var votes: MutableList<Vote> = mutableListOf(),
        var mail: String = "",
        var token: String = ""
)
