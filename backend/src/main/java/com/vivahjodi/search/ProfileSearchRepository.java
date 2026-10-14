package com.vivahjodi.search;

import com.vivahjodi.profile.Profile;

import java.util.List;


/*  if you wants to lock visitors to filter profiles
 public interface ProfileSearchRepository {
    List<Profile> search(ProfileSearchRequest request);

    List<Profile> findPublicProfilesByGender(String gender);
}

*/

public interface ProfileSearchRepository {
    List<Profile> search(ProfileSearchRequest request);

    List<Profile> searchPublic(ProfileSearchRequest request);

    List<Profile> findPublicProfilesByGender(String gender);
}