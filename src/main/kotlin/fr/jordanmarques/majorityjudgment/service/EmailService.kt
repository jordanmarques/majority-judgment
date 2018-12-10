package fr.jordanmarques.majorityjudgment.service

import org.apache.commons.mail.DefaultAuthenticator
import org.apache.commons.mail.HtmlEmail
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class EmailService {

    @Value("\${email.sender}")
    lateinit var sender: String

    @Value("\${email.password}")
    lateinit var password: String

    @Value("\${application.address}")
    lateinit var address: String

    fun sendVoteInvitations(emails: List<String>, label: String, id: String) {
        emails.forEach {
            send("Majority Judgment - It's Time to Vote for $label !",
                    """
                        <html>
                            <body>
                                <h1>Vote for $label</h1>
                                <p>Someone just invite you to vote for $label.</p>
                                <p>You can access to the vote link at this address: <a href="${address}/proposal/vote/$id">${address}/proposal/vote/$id</a></p>
                            </body>
                        </html>
                    """.trimIndent(), it)
        }
    }

    fun sendVoteResultLink(adminEmail: String, label: String, id: String, token: String) {

        send("Majority Judgment - Just for You - ($label)",
                """
                        <html>
                            <body>
                                <h1>Result Link For $label</h1>
                                <p>As you are the admin of this vote, we provide you the result link of the vote.</p>
                                <p><a href="${address}/proposal/result/$id/$token">${address}/proposal/result/$id/token</a></p>
                            </body>
                        </html>
                    """.trimIndent(), adminEmail)

    }

    private fun send(subject: String, body: String, receiver: String) {
        val email = HtmlEmail()
        email.hostName = "smtp.gmail.com"
        email.setSmtpPort(465)
        email.isSSL = true
        email.setAuthenticator(DefaultAuthenticator(sender, password))
        email.setFrom(sender)
        email.addTo(receiver)
        email.subject = subject
        email.setHtmlMsg(body)
        email.send()
    }
}
