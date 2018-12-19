package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.dao.ProposalDao
import fr.jordanmarques.majorityjudgment.model.*
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

        val count = mutableListOf(
                ChoiceAppreciationsCount(
                "KANA-BOON",
                mutableListOf(
                        Result(Appreciation.VERY_GOOD, 60F),
                        Result(Appreciation.BAD, 20F)
                )),
                ChoiceAppreciationsCount(
                "Justice",
                mutableListOf(
                        Result(Appreciation.VERY_GOOD, 30F),
                        Result(Appreciation.PRETTY_GOOD, 20F)
                ))
        )

        val expected = MajorityAppreciation("KANA-BOON", Result(Appreciation.VERY_GOOD, 60F))

        val result = countingService.findWinner(count)

        Assertions.assertThat(result).isEqualTo(expected)

    }

    @Test
    fun `should find the winner between 2 same appreciation`() {

        val count = mutableListOf(
                ChoiceAppreciationsCount(
                        "JUSTICE",
                        mutableListOf(
                                Result(Appreciation.BAD, 20F),
                                Result(Appreciation.GOOD, 30F),
                                Result(Appreciation.VERY_GOOD, 36F)
                        )),
                ChoiceAppreciationsCount(
                        "U2",
                        mutableListOf(
                                Result(Appreciation.BAD, 20F),
                                Result(Appreciation.GOOD, 25F),
                                Result(Appreciation.VERY_GOOD, 49F)
                        ))
        )

        val expected = MajorityAppreciation("U2", Result(Appreciation.GOOD, 74F))

        val result = countingService.findWinner(count)

        Assertions.assertThat(result).isEqualTo(expected)

    }
}
