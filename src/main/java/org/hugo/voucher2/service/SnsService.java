package org.hugo.voucher2.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;
import org.springframework.stereotype.Service;

@Service
public class SnsService {

    private final AmazonSNS snsClient;

    public SnsService() {
        // Configura suas credenciais AWS
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY");

        // Cria o cliente SNS
        this.snsClient = AmazonSNSClientBuilder.standard()
                .withRegion(Regions.US_EAST_1) // Escolha a região adequada
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

    // Método para enviar SMS
    public String sendSms(String phoneNumber, String message) {
        PublishRequest request = new PublishRequest()
                .withMessage(message)
                .withPhoneNumber(phoneNumber);

        PublishResult result = snsClient.publish(request);
        return result.getMessageId();
    }
}
