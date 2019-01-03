package fr.jordanmarques.majorityjudgment.service

import fr.jordanmarques.majorityjudgment.model.Participant
import org.apache.commons.mail.DefaultAuthenticator
import org.apache.commons.mail.HtmlEmail
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.nio.charset.Charset
import java.util.concurrent.CompletableFuture

@Service
class EmailService {

    @Value("\${email.sender}")
    lateinit var sender: String

    @Value("\${email.password}")
    lateinit var password: String

    @Value("\${application.address}")
    lateinit var address: String

    fun sendVoteInvitations(attendees: MutableList<Participant>, label: String, id: String) {

        val title = "Vote for $label"
        val content = "<p>Someone just invite you to vote for $label.</p>"
        val btnLabel = "Vote"
        val btnLink = "$address/proposal/vote/$id"

        CompletableFuture.supplyAsync {
            attendees.forEach { send("Vote for $label !", emailBody(title, content, btnLabel, "$btnLink/${it.voteToken}"), mutableListOf(it.mail)) }
        }

    }

    fun sendVoteResultLink(adminEmail: String, label: String, id: String, token: String) {

        val title = "Result Link For $label"
        val content = "As you are the admin of this vote, we provide you the result link of the vote."
        val btnLabel = "Vote Results"
        val btnLink = "$address/proposal/result/$id/$token"

        send("Result Link for $label", emailBody(title, content, btnLabel, btnLink), mutableListOf(adminEmail))

    }

    fun sendReminder(emails: List<String>, label: String, id: String) {

        val title = "Don't forget to vote for $label"
        val content = "This is your last chance to vote for $label !"
        val btnLabel = "Vote"
        val btnLink = "$address/proposal/vote/$id"

        send("Don't forget to Vote for $label !", emailBody(title, content, btnLabel, btnLink), emails)
    }

    private fun send(subject: String, body: String, receivers: List<String>) {
        val email = HtmlEmail()

        receivers.forEach { email.addBcc(it) }

        email.hostName = "smtp.gmail.com"
        email.setSmtpPort(465)
        email.isSSL = true
        email.setAuthenticator(DefaultAuthenticator(sender, password))
        email.setFrom(sender)
        email.subject = subject
        email.setHtmlMsg(body)
        email.send()
    }

    private fun template(): String {
        return javaClass.classLoader.getResource("email_template.html").readText(Charset.defaultCharset())
    }

    private fun emailBody(title: String, content: String, btnLabel: String, btnLink: String): String {
        return template()
                .replace("|title|", title)
                .replace("|content|", content)
                .replace("|btn-label|", btnLabel)
                .replace("|btn-link|", btnLink)

    }
}
