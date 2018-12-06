package fr.jordanmarques.majorityjudgment.conf

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import org.springframework.stereotype.Component
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import org.springframework.context.annotation.Bean
import java.io.File
import java.io.FileInputStream



@Component
class DataBase {

    @Bean
    fun getFirestoreClient(): Firestore{

        val devAccess = javaClass.classLoader.getResource("dev_firestore_access.json")
        val prodAccess = javaClass.classLoader.getResource("firestore_access.json")

        val access = devAccess ?: prodAccess

        val serviceAccount = FileInputStream(access.file)
        val credentials = GoogleCredentials.fromStream(serviceAccount)
        val options = FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build()
        FirebaseApp.initializeApp(options)

        return FirestoreClient.getFirestore()
    }
}
