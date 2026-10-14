package com.vivahjodi.profile;

import java.util.List;

public class ProfileViewResponse {

    private ProfileViewProfileResponse profile;
    private List<ProfileViewPhotoResponse> photos;

    public ProfileViewResponse() {
    }

    public ProfileViewProfileResponse getProfile() {
        return profile;
    }

    public void setProfile(ProfileViewProfileResponse profile) {
        this.profile = profile;
    }

    public List<ProfileViewPhotoResponse> getPhotos() {
        return photos;
    }

    public void setPhotos(List<ProfileViewPhotoResponse> photos) {
        this.photos = photos;
    }
}