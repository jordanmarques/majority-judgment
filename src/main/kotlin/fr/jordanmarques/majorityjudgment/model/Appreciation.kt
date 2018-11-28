package fr.jordanmarques.majorityjudgment.model

enum class Appreciation(val weight: Int) {
    VERY_GOOD(6),
    GOOD(5),
    PRETTY_GOOD(4),
    FAIR(3),
    BAD(2),
    REJECT(1)
}
