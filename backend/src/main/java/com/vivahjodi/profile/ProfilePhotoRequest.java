package com.vivahjodi.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfilePhotoRequest {

    @NotBlank(message = "फोटो storage path आवश्यक आहे.")
    @Size(max = 500, message = "Storage path खूप मोठा आहे.")
    private String storagePath;

    @Size(max = 255, message = "File name खूप मोठे आहे.")
    private String originalFileName;

    @Size(max = 100, message = "MIME type खूप मोठा आहे.")
    private String mimeType;

    private Boolean primary;

    private Integer displayOrder;

    public String getStoragePath() {
        return storagePath;
    }

    public void setStoragePath(String storagePath) {
        this.storagePath = storagePath;
    }

    public String getOriginalFileName() {
        return originalFileName;
    }

    public void setOriginalFileName(String originalFileName) {
        this.originalFileName = originalFileName;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Boolean getPrimary() {
        return primary;
    }

    public void setPrimary(Boolean primary) {
        this.primary = primary;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}