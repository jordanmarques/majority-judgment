package fr.jordanmarques.majorityjudgment.dto

import fr.jordanmarques.majorityjudgment.model.ChoiceAppreciationsCount
import fr.jordanmarques.majorityjudgment.model.MajorityAppreciation

data class CountingResultDto(val winner: MajorityAppreciation, val result: List<ChoiceAppreciationsCount>)
