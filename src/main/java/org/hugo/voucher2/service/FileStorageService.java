//package org.hugo.voucher2.service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//@Service
//public class FileStorageService {
//
//    private final Path rootLocation = Paths.get("uploads/empresas");
//
//    public String storeFile(MultipartFile file) throws IOException {
//        String fileName = file.getOriginalFilename();
//        Path destinationFile = this.rootLocation.resolve(fileName).normalize();
//        Files.copy(file.getInputStream(), destinationFile);
//        return destinationFile.toString();
//    }
//}
