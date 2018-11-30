package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
import fr.jordanmarques.majorityjudgment.model.ChoiceAppreciationsCount
import fr.jordanmarques.majorityjudgment.model.MajorityAppreciation
import fr.jordanmarques.majorityjudgment.model.Result
import fr.jordanmarques.majorityjudgment.model.Appreciation
import fr.jordanmarques.majorityjudgment.model.Choice
import fr.jordanmarques.majorityjudgment.model.Vote
import io.mockk.MockKAnnotations
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import org.assertj.core.api.Assertions
import org.junit.Before
import org.junit.Test

class CountingServiceTest {

    @InjectMockKs
    lateinit var countingService: CountingService

    @MockK
    lateinit var proposalDao: ProposalDao

    @Before
    fun init() = MockKAnnotations.init(this)

    @Test
    fun `should compute the percentage of appreciation for each choice`() {
        val votes = mutableListOf(
                Vote(choice = Choice("KANA-BOON"), appreciation = Appreciation.VERY_GOOD),
                Vote(choice = Choice("KANA-BOON"), appreciation = Appreciation.BAD),
                Vote(choice = Choice("KANA-BOON"), appreciation = Appreciation.FAIR),
                Vote(choice = Choice("KANA-BOON"), appreciation = Appreciation.VERY_GOOD),
                Vote(choice = Choice("KANA-BOON"), appreciation = Appreciation.VERY_GOOD),
                Vote(choice = Choice("JUSTICE"), appreciation = Appreciation.BAD),
                Vote(choice = Choice("JUSTICE"), appreciation = Appreciation.REJECT),
                Vote(choice = Choice("JUSTICE"), appreciation = Appreciation.REJECT)
        )

        val excpectedCount = mutableListOf(
                ChoiceAppreciationsCount(
                        "KANA-BOON",
                        mutableListOf(
                                Result(Appreciation.VERY_GOOD, 60F),
                                Result(Appreciation.BAD, 20F),
                                Result(Appreciation.FAIR, 20F)
                        )),
                ChoiceAppreciationsCount(
                        "JUSTICE",
                        mutableListOf(
                                Result(Appreciation.BAD, 33.3F),
                                Result(Appreciation.REJECT, 66.7F)
                        ))
        )

        val counts = countingService.count(votes)

        Assertions.assertThat(excpectedCount).isEqualTo(counts)
    }

    @Test
    fun `should define the majoritary appreciation for a choice`() {
        val count = ChoiceAppreciationsCount(
                "KANA-BOON",
                mutableListOf(
                        Result(Appreciation.FAIR, 20F),
                        Result(Appreciation.VERY_GOOD, 60F),
                        Result(Appreciation.BAD, 20F)
                ))

        val expected = MajorityAppreciation("KANA-BOON", Result(Appreciation.VERY_GOOD, 60F))

        val result = countingService.defineMajoritaryAppreciation(count)

        Assertions.assertThat(result).isEqualTo(expected)
    }

    @Test
    fun `should find the winner`() {

        val majoritaryAppreciationsPerChoice = mutableListOf(
                MajorityAppreciation("KANA-BOON", Result(Appreciation.VERY_GOOD, 52F)),
                MajorityAppreciation("JUSTICE", Result(Appreciation.PRETTY_GOOD, 54F)),
                MajorityAppreciation("U2", Result(Appreciation.BAD, 64F))
        )

        val expected = MajorityAppreciation("KANA-BOON", Result(Appreciation.VERY_GOOD, 52F))

        val result = countingService.findWinner(majoritaryAppreciationsPerChoice)

        Assertions.assertThat(result).isEqualTo(expected)

    }

    @Test
    fun `should find the winner between 2 same appreciation`() {

        val majoritaryAppreciationsPerChoice = mutableListOf(
                MajorityAppreciation("KANA-BOON", Result(Appreciation.VERY_GOOD, 58F)),
                MajorityAppreciation("JUSTICE", Result(Appreciation.VERY_GOOD, 59F))
        )

        val expected = MajorityAppreciation("JUSTICE", Result(Appreciation.VERY_GOOD, 59F))

        val result = countingService.findWinner(majoritaryAppreciationsPerChoice)

        Assertions.assertThat(result).isEqualTo(expected)

    }
}
