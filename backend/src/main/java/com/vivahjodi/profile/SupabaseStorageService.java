package com.vivahjodi.profile;

import com.vivahjodi.config.SupabaseStorageConfig;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

@Service
public class SupabaseStorageService {

    private final SupabaseStorageConfig supabaseStorageConfig;
    private final HttpClient httpClient;

    public SupabaseStorageService(
            SupabaseStorageConfig supabaseStorageConfig
    ) {
        this.supabaseStorageConfig = supabaseStorageConfig;
        this.httpClient = HttpClient.newHttpClient();
    }

    public String uploadProfilePhoto(
            UUID profileId,
            MultipartFile file
    ) {
        validateFile(file);

        String originalFileName =
                file.getOriginalFilename() != null
                        ? file.getOriginalFilename()
                        : "profile-photo";

        String extension =
                extractExtension(originalFileName);

        String storagePath =
                profileId
                        + "/"
                        + UUID.randomUUID()
                        + extension;

        String bucket =
                supabaseStorageConfig
                        .getStorage()
                        .getProfilePhotoBucket();

        String uploadUrl =
                supabaseStorageConfig.getUrl()
                        + "/storage/v1/object/"
                        + bucket
                        + "/"
                        + storagePath;

        try {
            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(uploadUrl))
                            
                            .header(
                                    "apikey",
                                    supabaseStorageConfig
                                            .getServiceRoleKey()
                            )
                            .header(
                                    "Content-Type",
                                    file.getContentType() != null
                                            ? file.getContentType()
                                            : "application/octet-stream"
                            )
                            .header(
                                    "x-upsert",
                                    "false"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofByteArray(
                                                    file.getBytes()
                                            )
                            )
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Supabase Storage upload failed: "
                                + response.body()
                );
            }

            return storagePath;

        } catch (IOException e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "फोटो Supabase Storage मध्ये अपलोड करता आला नाही.",
                    e
            );

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "फोटो अपलोड करताना request interrupted झाली.",
                    e
            );
        }
    }


        /**
     * Deletes a profile photo from Supabase Storage.
     */
    public void deleteProfilePhoto(
            String storagePath
    ) {
        if (storagePath == null
                || storagePath.isBlank()) {
            return;
        }

        String bucket =
                supabaseStorageConfig
                        .getStorage()
                        .getProfilePhotoBucket();

        String deleteUrl =
                supabaseStorageConfig.getUrl()
                        + "/storage/v1/object/"
                        + bucket
                        + "/"
                        + storagePath;

        try {
            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(deleteUrl))
                            
                            .header(
                                    "apikey",
                                    supabaseStorageConfig
                                            .getServiceRoleKey()
                            )
                            .DELETE()
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Supabase Storage delete failed: "
                                + response.body()
                );
            }

        } catch (IOException e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "फोटो Supabase Storage मधून delete करता आला नाही.",
                    e
            );

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "फोटो delete करताना request interrupted झाली.",
                    e
            );
        }
    }


    /**
     * Creates a temporary signed URL for a private profile photo.
     *
     * The returned URL is valid for 1 hour.
     */
    public String createSignedUrl(
            String storagePath
    ) {
        if (storagePath == null
                || storagePath.isBlank()) {

            return null;
        }

        String bucket =
                supabaseStorageConfig
                        .getStorage()
                        .getProfilePhotoBucket();

        String signUrl =
                supabaseStorageConfig.getUrl()
                        + "/storage/v1/object/sign/"
                        + bucket
                        + "/"
                        + storagePath;

        String requestBody =
                """
                {
                    "expiresIn": 3600
                }
                """;

        try {
            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(signUrl))
                            .header(
        "apikey",
        supabaseStorageConfig
                .getServiceRoleKey()
)
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofString(requestBody)
                            )
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Supabase Storage signed URL generation failed: "
                                + response.body()
                );
            }

                String signedUrl =
                        extractSignedUrl(response.body());

                if (signedUrl == null
                        || signedUrl.isBlank()) {

                System.err.println(
                        "Supabase Storage signed URL response status: "
                                + response.statusCode()
                );

                System.err.println(
                        "Supabase Storage signed URL response body: "
                                + response.body()
                );

                throw new ResponseStatusException(
                        HttpStatus.BAD_GATEWAY,
                        "Supabase Storage response मध्ये signed URL extract करता आला नाही."
                );
                }

                if (signedUrl.startsWith("/")) {

                if (signedUrl.startsWith("/storage/v1/")) {
                        return supabaseStorageConfig.getUrl()
                                + signedUrl;
                }

                return supabaseStorageConfig.getUrl()
                        + "/storage/v1"
                        + signedUrl;
                }

                return signedUrl;

        } catch (IOException e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Signed photo URL तयार करता आला नाही.",
                    e
            );

        } catch (InterruptedException e) {

            Thread.currentThread().interrupt();

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Signed photo URL request interrupted झाली.",
                    e
            );
        }
    }

    /**
     * Extracts signedURL from Supabase response JSON
     * without requiring an additional JSON library.
     */
    private String extractSignedUrl(
            String responseBody
    ) {
        if (responseBody == null
                || responseBody.isBlank()) {

            return null;
        }

        String marker = "\"signedURL\"";

        int keyIndex =
                responseBody.indexOf(marker);

        if (keyIndex < 0) {
            return null;
        }

        int colonIndex =
                responseBody.indexOf(
                        ':',
                        keyIndex + marker.length()
                );

        if (colonIndex < 0) {
            return null;
        }

        int firstQuote =
                responseBody.indexOf(
                        '"',
                        colonIndex + 1
                );

        if (firstQuote < 0) {
            return null;
        }

        int secondQuote =
                responseBody.indexOf(
                        '"',
                        firstQuote + 1
                );

        if (secondQuote < 0) {
            return null;
        }

        return responseBody.substring(
                firstQuote + 1,
                secondQuote
        );
    }

    private void validateFile(
            MultipartFile file
    ) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "फोटो फाइल आवश्यक आहे."
            );
        }

        String contentType =
                file.getContentType();

        if (!"image/jpeg".equalsIgnoreCase(contentType)
                && !"image/png".equalsIgnoreCase(contentType)
                && !"image/webp".equalsIgnoreCase(contentType)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "फक्त JPG, PNG किंवा WEBP फोटो अपलोड करता येतील."
            );
        }

        if (file.getSize() > 5L * 1024L * 1024L) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "फोटोचा आकार 5 MB पेक्षा जास्त असू शकत नाही."
            );
        }
    }

    private String extractExtension(
            String fileName
    ) {
        int lastDot =
                fileName.lastIndexOf('.');

        if (lastDot < 0) {
            return "";
        }

        String extension =
                fileName.substring(lastDot)
                        .toLowerCase();

        if (".jpeg".equals(extension)
                || ".jpg".equals(extension)
                || ".png".equals(extension)
                || ".webp".equals(extension)) {

            return extension;
        }

        return "";
    }
}