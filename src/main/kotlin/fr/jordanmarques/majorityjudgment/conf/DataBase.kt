package fr.jordanmarques.majorityjudgment.conf

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import org.springframework.stereotype.Component
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import java.io.File
import java.io.FileInputStream



@Component
class DataBase {

    @Bean
    fun getFirestoreClient(): Firestore{

        val devAccess = javaClass.classLoader.getResourceAsStream("dev_firestore_access.json")
        val prodAccess = javaClass.classLoader.getResourceAsStream("firestore_access.json")

        val access = devAccess ?: prodAccess

        val credentials = GoogleCredentials.fromStream(access)
        val options = FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build()
        FirebaseApp.initializeApp(options)

        return FirestoreClient.getFirestore()
    }
}
