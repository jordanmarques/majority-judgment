package fr.jordanmarques.majorityjudgment.model

data class Vote(
        var choice: Choice = Choice(""),
        var appreciation: Appreciation
)
