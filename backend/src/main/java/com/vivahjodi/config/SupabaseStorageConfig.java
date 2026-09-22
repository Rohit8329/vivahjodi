package com.vivahjodi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "supabase")
public class SupabaseStorageConfig {

    private String url;
    private String serviceRoleKey;
    private Storage storage = new Storage();

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getServiceRoleKey() {
        return serviceRoleKey;
    }

    public void setServiceRoleKey(String serviceRoleKey) {
        this.serviceRoleKey = serviceRoleKey;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public static class Storage {

        private String profilePhotoBucket;

        public String getProfilePhotoBucket() {
            return profilePhotoBucket;
        }

        public void setProfilePhotoBucket(String profilePhotoBucket) {
            this.profilePhotoBucket = profilePhotoBucket;
        }
    }
}