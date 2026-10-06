package com.vivahjodi.search;

import com.vivahjodi.profile.Profile;

import java.util.List;

public interface ProfileSearchRepository {

    List<Profile> search(ProfileSearchRequest request);
}
