package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.model.ChoiceAppreciationsCount
import fr.jordanmarques.majorityjudgment.model.MajorityAppreciation
import fr.jordanmarques.majorityjudgment.model.Result
import fr.jordanmarques.majorityjudgment.model.Vote
import org.springframework.stereotype.Service
import java.math.RoundingMode

@Service
class CountingService(
) {
    fun count(votes: MutableList<Vote>): List<ChoiceAppreciationsCount> {
        return votes.groupBy { it.choice.label }
                .entries
                .map { entry ->
                    val notes = entry.value
                            .groupingBy { it.appreciation }
                            .eachCount()
                            .map { Result(it.key, roundToOneDecimal((it.value * 100) / entry.value.size.toFloat())) }

                    ChoiceAppreciationsCount(entry.key, notes)
                }
    }

    fun findWinner( count: List<ChoiceAppreciationsCount>): MajorityAppreciation {

        val majoritaryAppreciationsPerChoice = count
                .map { defineMajoritaryAppreciation(it) }

        return majoritaryAppreciationsPerChoice.maxWith(compareBy({ it.note.appreciation.weight }, { it.note.note }))!!
    }

    fun defineMajoritaryAppreciation(count: ChoiceAppreciationsCount): MajorityAppreciation {
        val majoritaryAppreciation = count.results
                .sortedBy { it.appreciation.weight }
                .reversed()
                .reduce { accumulator, note ->
                    if (accumulator.note < 50) {
                        Result(note.appreciation, accumulator.note + note.note)
                    } else {
                        accumulator
                    }
                }

        return MajorityAppreciation(count.label, majoritaryAppreciation)
    }

    private fun roundToOneDecimal(number: Float): Float {
        return number.toBigDecimal().setScale(1, RoundingMode.HALF_UP).toFloat()
    }
}

