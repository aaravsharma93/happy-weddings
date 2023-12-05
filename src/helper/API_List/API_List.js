export const API_List = {
    // Signup API's
    check_email_exists: 'member/check_email_exists', // Complete
    check_mobile_exists: 'member/check_mobile_exists', // Complete
    get_all_religion: 'member/get_all_religion', // Complete
    get_all_caste_by_religion: 'member/get_all_castes_from_religions', // Complete
    get_all_sub_castes_by_caste: 'member/get_all_sub_castes', // Complete
    registration_step_1: 'member/registration', // Complete
    registration_step_2: 'member/registration_second', // Complete
    registration_step_3: 'member/registration_third', // Complete
    Get_All_Nationality: 'member/nationality', // Complete
    Get_All_Marital_Status: 'member/marital_status', // Complete
    Get_All_Mother_Tongue: 'member/get_mother_tongue', // Complete
    Get_Annual_Income_Options: 'member/get_annual_income_options', // Complete
    Get_Education_Level: 'member/get_education_level', // Complete
    Get_Field_Of_Study: 'member/get_field_of_study', // Complete
    Get_Astro_Stars_List: 'member/astro_stars_list', // Complete
    Upload_Profile_Picture: 'member/upload_profile_pic',
    Upload_Profile_Video: 'member/upload_profile_video',
    Update_Education: 'member/update_education', // Complete
    Update_Career: 'member/update_career', // Complete
    Upload_Horoscope: 'member/update_horoscope', // Complete
    Update_Astro_Details: 'member/update_astro_details', //Complete
    Update_New_Mobile: 'member/update_new_mobile', // Complete
    get_member_Detail: 'member/get_member_Details',//complete
    // Login with Username & Password

    login_with_username: 'member/member_login', // Complete

    // Forget Password
    forgot_password: 'member/forgot_password', // Complete
    change_password: 'member/change_password', // Complete

    // Login with OTP
    Login_With_OTP: 'member/login_with_otp', // Complete
    Validate_Otp_For_Login: 'member/validate_otp_for_login',  // Complete
    Resend_OTP: 'member/resend_otp', // Complete

    // Dashboard 

    Preferance_Member_Listing: 'member/get_members_preferance', // Complete
    Recommended_Members_Listings: 'member/get_members_recomendation',
    Newly_Joined_Members: 'member/get_members_newly_joined',
    Members_Viewed_Me: 'member/get_members_viewed_me',
    Member_Listings_Viewed_By_Me: 'member/get_members_viewed_me',
    Premium_Members_Listings: 'member/get_members_premium_matches',
    Reverse_Matches_Listings: 'member/get_members_reverse_match',
    Mutual_Matches_Listings: 'member/get_members_mutual_matches',
    Matches_For_The_Day: 'member/get_members_matches_forthe_day',



    get_members_recomendation_viewall : 'member/get_members_recomendation_viewall',
    get_members_mutual_matches_viewall : 'member/get_members_mutual_matches_viewall',
    get_members_newly_joined_viewall : 'member/get_members_newly_joined_viewall',
    get_members_viewed_me_viewall : 'member/get_members_viewed_me_viewall',
    get_members_preferance_viewall : 'member/get_members_preferance_viewall',
    get_members_premium_matches_viewall : 'member/get_members_premium_matches_viewall',
    get_similar_profiles_viewall : 'member/get_similar_profiles_viewall',
    get_nearby_members_viewal : 'member/get_nearby_members_viewall',

    // 
    get_you_and_Her_API: 'member/you_and_her',//complete		
    get_Basic_detail_of_member: 'member/Basic_detail_of_member',//complete	

    get_Contact_detail_API: 'member/Contact_detail_API',//complete	
    get_Astro_detail_API: 'member/Astro_detail_API',//complete	
    get_Matching_criteria_Expectation: 'member/Matching_criteria_Expectation',//complete	
    get_similar_profile: 'member/get_similar_profiles',//complete	
    get_Nearby_members_API: 'member/get_nearby_members',//complete	
    get_Send_photo_request_API: 'member/Send_photo_request_API',//complete	
    get_mailbox_interest : 'member/mailbox_interest',//complete		
    get_All_notification: 'member/get_all_notification',//complete	
    get_member_Detail_from_notification: 'member/member_Detail_from_notification',//complete	
    get_Trust_Badges_status: 'member/Trust_Badges_status',//complete	
    get_All_galary_pictures: 'member/All_galary_pictures',//complete	
    get_Package_List: 'member/package_list',//complete	
    get_Nationality_listings: 'member/Nationality_listings',//complete	
    get_Martial_status_listings: 'member/Martial_status_listings',//complete	
    get_Employment_Type_listings: 'member/Employment_Type_listings',//complete	
    get_All_job_Type_listings_API: 'member/All_job_Type_listings_API',//complete	
    get_logout_API: 'member/Logout_API',//complete	
    Few_Words_About_me_API: 'member/edit_profile_few_words',//complete	
    get_Blood_group_Listing: 'member/get_blood_groups',//complete	
    get_diet_listing: 'member/get_diet_listing',//complete	
    get_drink_listing: 'member/get_drink_listing',//complete	
    get_Smoke_listing: 'member/get_smoke_listing',//complete	
    get_Complexion_list: 'member/get_complexion_list',//complete	
    get_Blood_Group_Listing: 'member/get_blood_groups',//complete	
    get_Body_Type_Listings: 'member/get_body_type_list',//complete	
    get_Disabilities_List: 'member/get_disabilities_list',//complete	
    get_Astro_Details_Api: 'member/get_astro_details',//complete	
    get_Astro_Star_List: 'member/astro_stars_list',//complete
    // 
    // Shorlist/Remove Shortlisted User
    AddToShorlist: 'member/shortlist_member',
    RemoveShorlist: 'member/remove_shortlist',

    // Send Interest Send Interest
    SendInterest: 'member/send_interest',

    // Profile Viewers Count
    ProfileViewersCount: 'member/get_members_viewed',

    // Yet to view Count
    YetToViewCount: 'member/get_members_yettoview',

    // Matches for the Day
    // MatchesForTheDay: 'member/get_members_matches_forthe_day',
    MatchesForTheDay: 'member/get_members_matches_forthe_day_viewall',


    MutualMatches: 'member/get_members_mutual_matches',
    // Reverse Matches
    ReverseMatches: 'member/get_members_reverse_match',
    // Online Matches
    OnlineMatches: 'member/get_match_members_online',
    // Get_Members_Looking_Forme
    Members_Looking_For_Me: 'member/get_members_looking_forme',
    // member/get_location_from_search
    getLocationOnInput: 'member/get_location_from_search',
    // Shortisted Profiles
    Shortisted_Profiles: 'member/get_shortlisted_members',

    // Search User
    SearchById: 'member/search_by_member_id',
    QuickSearch: 'member/quick_search',
    AdvancedSearch: 'member/advanced_search',
    KeyWordSearch: 'member/search_by_keyword',
    Edit_Profile_Signup_Details_API: 'member/edit_profile_signup_details',//complete
    Edit_Profile_Physical_Attribute_API: 'member/edit_profile_physical_attribute',//complete
    Update_Life_Style: 'member/update_life_style',//complete
    Upload_gallery_pictures: 'member/upload_gallery_pics',//complete
    Upload_gallery_Videos: 'member/upload_gallery_videos',//complete
    Privacy_Settings: 'member/privacy_settings',//complete
    get_member_all_gallery_pics: 'member/get_member_all_gallery_pics',//complete
    get_member_all_gallery_videos : 'member/get_member_all_gallery_videos',

    Get_Heights: 'member/get_heights',

    // Employment Get Listing 
    Job_Type_Listing: 'member/get_job_type_listing',
    Employment_Type_Listing: 'member/get_employment_type_listing',

    // Country Code
    Get_All_Country_Code: 'member/get_country_phone_code ',

    // Get Know me better Data of member
    Get_Know_Me_Better: 'member/know_me_better', //complete
    Update_Know_Me_Better: 'member/update_know_me_better', //complete
    get_Family_detail_of_member: 'member/get_family_details/',//complete
    get_Family_Status_List: 'member/get_family_status_listings', //Complete
    Update_Family_Details: 'member/update_family_details', //complete
    get_Education_Details_of_Logged_in_User: 'member/get_education_details',//complete	
    get_career_Detail_of_member: 'member/get_career_details',//complete

    // Ignore Member
    Ignore_Member: 'member/ignore_member', //complete 
    Get_Family_Values_Listing: 'member/get_family_values_listings',

    // Log Out
    Logout: 'member/logout',

    // Edit preferences
    Get_Partner_Preference_Basic_Details: 'member/get_partner_preference_basic',
    Get_Partner_Preference_Physical_Attr: 'member/get_partner_preference_physical_attr',
    Get_Partner_Preference_Lifestyle: 'member/get_partner_preference_lifestyle',
    Get_Partner_Preference_Astrodetails: 'member/get_partner_preference_astrodetails',
    Get_Partner_Preference_Hobbies: 'member/get_partner_preference_hobbies',

    Update_Partner_Preference_Basic_Details: 'member/update_preference_basic', //complete
    Update_Partner_Preference_Physical_Attr: 'member/update_partner_preferance_physical', //complete
    Update_Partner_Preference_Lifestyle: 'member/update_partner_preferance_lifestyle',  //complete
    Update_Partner_Preference_Astrodetails: 'member/update_partner_preferance_astro_details', //complete
    Update_Partner_Preference_Hobbies: 'member/update_partner_preferance_hobbies_interests', //complete

    get_states_list_from_countries : 'member/get_states_list_from_countries',
    
    // Discover Matches
    Discover_Member_Based_On_City : 'member/discover_members_basedon_city',
    Discover_Member_Based_On_Profession : 'member/discover_members_basedon_profession',
    Discover_Member_Based_On_BirthStar : 'member/discover_members_basedon_birthstar',
    Discover_Member_Based_On_Featured : 'member/discover_members_basedon_featured',
    Discover_Member_Based_On_Shortlisted : 'member/discover_members_basedon_shortlisted',
    Discover_Member_Based_On_NearMe : 'member/discover_members_basedon_nearme',
    Discover_Member_Based_On_WithPhoto : 'member/discover_members_basedon_withphoto',

    // Hobbies and Interest
    Get_hobbies_params: 'member/get_hobbies_params', //complete
    get_Interests_parameters: 'member/get_interests_params',//complete	
    get_All_music_parameter: 'member/get_all_music_params',//complete	
    get_Movies_parameters: 'member/get_movies_params',//complete	
    get_Sports_parameters: 'member/get_sports_params',//complete	
    get_cuisine_params: 'member/get_cuisines_params',//complete	
    get_Dress_params: 'member/get_dress_params',//complete
    get_all_books_params : 'member/get_all_books_params',//complete	
    get_Hobbies_and_interests_main_lables: 'member/Hobbies_and_interests_main_lables',//complete	
    get_Hobbies_and_interests_sub_lables: 'member/Hobbies_and_interests_sub_lables',//complete
    
    get_user_hobbies_and_interests : 'member/get_hobbies_and_interest',//complete
    update_hobbies_and_interest : 'member/update_hobbies_and_interest', //complete

    update_family_status_value : "member/update_family_status_value",
    check_all_trust_badges : "member/check_all_trust_badges",
    upload_profile_picture_badge : "member/upload_profile_picture_badge",
    upload_education_salary_badge : "member/upload_education_salary_badge",
    upload_identity_badge : "member/upload_identity_badge",
    update_facebook_badge : 'member/update_facebook_badge',
    set_profile_pic : "member/set_profile_pic",
    get_count_viewed_you : 'member/get_count_viewed_you',
    update_annual_income : 'member/update_annual_income',
    update_not_working : 'member/update_not_working',
    get_not_working_status : 'member/get_not_working_status',
    get_remaining_params_tocomplete_profile : 'member/get_remaining_params_tocomplete_profile', 
    check_payment_status_web_view : "member/check_payment_status_web_view",
    check_shortlist_interest_sent : "member/check_shortlist_interest_sent",
    get_countof_diff_requests : "member/get_countof_diff_requests",
    add_about_family : 'member/add_about_family',

    get_interested_me : 'member/get_interested_me',
    send_photo_request : 'member/send_photo_request',
    check_photo_request : 'member/check_photo_request_from_loggedin_member',
    claim_now_package : 'member/claim_now_package',
    get_pending_requests : 'member/get_pending_requests',
    
    get_all_notification_count : 'member/get_all_notification_count',
    get_count_of_pending_contacts : 'member/get_count_of_pending_contacts',

    get_shortlisted_by_other_members : 'member/get_shortlisted_by_other_members',
    get_shortlisted_members : 'member/get_shortlisted_members',

    //Check_Banners_API
    check_interest_sent_by_other : 'member/check_interest_sent_by_other',
    check_photo_request_exists : 'member/check_photo_request_exists',
    check_shortlist_sent_from_other_member : 'member/check_shortlist_sent_from_other_member',

    //member_details_all_cast
    get_all_caste : 'member/get_all_caste',
    cancel_notification_item : 'member/cancel_notification_item',
    update_notification_viewed_status : 'member/update_notification_viewed_status',
  
}