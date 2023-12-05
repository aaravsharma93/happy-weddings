// API_Call

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { BaseURL } from "../../API_config/BaseURL";
import { API_List } from "../API_List/API_List";
let SignupAuthToken = AsyncStorage.getItem('auth_token_registration');
let Auth_Token = AsyncStorage.getItem('access_token');

// Check Email Exists or Not
const checkEmailAlreadyExist = async (email) => {
    let data = new FormData();
    data.append('email', email)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.check_email_exists,
        headers: {
            // 'Authorization': JW_token,
        },
        data: data
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
        });
}

// Check Mobile Number Exist or Not
const checkMobileAlreadyExist = async (mobile) => {
    let data = new FormData();
    data.append('mobile', mobile)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.check_mobile_exists,
        headers: {
        },
        data: data
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
        });
}

// Get All Religion List
const GetAllReligionList = async () => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_all_religion,
        headers: {
        },
    };


    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
        });
}


// Few words Aboue
const FewWordsAbout = async (Few_words, token) => {
    let data = new FormData();
    data.append('words_about_me', Few_words);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Few_Words_About_me_API,
        headers: {
            'authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// add_about_family
const AddAboutFamily = async (about_family, token) => {
    let data = new FormData();
    data.append('about_family', about_family);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.add_about_family,
        headers: {
            'authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Get All Religion List
const GetMemberDetail = async (id, token) => {


    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_member_Detail + `/${id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
            }
            return response
        })
        .catch(error => {
            console.log("api not responding" + error);
            return Promise.reject(error);
        });
}

const GetPhotoRequestCheckBanner = async (id, token) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_photo_request_exists + `/${id}`,
        headers: {
            'Authorization': token,
        },
    };


    return axios(config)
        .then(response => {
            if (response.status == 200) {
            }
            return response
        })
        .catch(error => {
            console.log("api not responding" + error);
            return Promise.reject(error);
        });
}

//GetIntrestedRequestCheckBanner
const GetIntrestedRequestCheckBanner = async (id, token) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_interest_sent_by_other + `/${id}`,
        headers: {
            'Authorization': token,
        },
    };


    return axios(config)
        .then(response => {
            if (response.status == 200) {
            }
            return response
        })
        .catch(error => {
            console.log("api not responding" + error);
            return Promise.reject(error);
        });
}

//GetShortListedRequestCheckBanner
const GetShortListedRequestCheckBanner = async (id, token) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_shortlist_sent_from_other_member + `/${id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
            }
            return response
        })
        .catch(error => {
            console.log("api not responding" + error);
            return Promise.reject(error);
        });
}



// Get All Caste by Religion
const GetAllCasteListByReligion = async (religionValue) => {

    let data = new FormData();
    data.append('religion_ids', religionValue);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.get_all_caste_by_religion,
        headers: {
        },
        data: data
    };


    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
            console.log(error);
        });
}

// GetAllCountryCode
const GetAllCountryCode = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_All_Country_Code,
        headers: {
        },
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
            console.log(error);
        });
}

// Get All Caste by Religion
const GetAllSubCasteListByCast = async (casteValue) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_all_sub_castes_by_caste + `/${casteValue}`,
        headers: {
        },
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
            console.log(error);
        });
}

// Registration Step 1 
const RegistrationStep1 = async (reqObj) => {
    let data = new FormData();
    data.append('profile_created_for', Number(reqObj.profile_created_for))
    data.append('gender', Number(reqObj.gender))
    data.append('fullname', reqObj.fullname)
    data.append('email', reqObj.email)
    data.append('password', reqObj.password)
    data.append('mobile_code', reqObj.mobile_code)
    data.append('mobile', reqObj.mobile)
    data.append('date_of_birth', reqObj.date_of_birth)
    data.append('location', reqObj.location)
    data.append('religion', Number(reqObj.religion))
    data.append('caste', Number(reqObj.caste))
    data.append('alternate_mobile_code', reqObj.alternate_mobile_code)
    data.append('alternate_mobile', reqObj.alternate_mobile)
    data.append('is_current_location', reqObj.is_current_location)
    data.append('loc_latitude', reqObj.loc_latitude)
    data.append('loc_longitude', reqObj.loc_longitude)
    data.append('device_token', reqObj.device_token)

    console.log(data,"----------------------------------------------") 

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.registration_step_1,
        data: data
    };

    return axios(config)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(JSON.stringify(error))
        });
}

// Registration Step 2
const RegistrationStep2 = async (reqObj, token) => {
    let data = new FormData();
    data.append('nationality', reqObj.nationality);
    data.append('marital_status', reqObj.marital_status);
    data.append('mother_tongue', reqObj.mother_tongue);
    data.append('height', reqObj.height);
    data.append('weight', reqObj.weight);
    data.append('annual_income', reqObj.annual_income);
    data.append('number_of_children', reqObj.number_of_children)

    console.log(data)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.registration_step_2,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        });

}

// Registration Step 3
const RegistrationStep3 = async (reqObj, token) => {
    let data = new FormData();
    data.append('birthstar', reqObj.birthstar);
    data.append('time_of_birth', reqObj.time_of_birth);
    data.append('city_of_birth', reqObj.city_of_birth);
    data.append('u_manglik', reqObj.u_manglik);
    data.append('shudha_jathakam', reqObj.shudha_jathakam);
    data.append('matching_stars', reqObj.matching_stars);
    data.append('interested_in_astro', reqObj.interested_in_astro);
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.registration_step_3,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    console.log(data)

    return axios(config)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        });
}

// Upload Horoscope
const UploadHoroscope = async (token, req) => {

    let data = new FormData();
    data.append('horoscope', {
        uri: req.path,
        type: req.mime,
        name: 'horoscope.jpg'
    })

    return fetch(BaseURL.DemoURL_API + API_List.Upload_Horoscope, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        body: data
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Upload Profile Picture
const UploadProfilePictureAPI = async (req, token) => {
    let data = new FormData();
    data.append('profile_pic', {
        uri: req.path,
        type: req.mime,
        name: 'horoscope.jpg'
    })

    return fetch(BaseURL.DemoURL_API + API_List.Upload_Profile_Picture, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        body: (data)
    })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Upload Profile Picture
const UploadProfileVideoAPI = async (req,token) => {

    let data = new FormData();
    data.append('profile_video', {
        uri: req.path,
        type: req.mime,
        name: 'gallery_Video.mp4'
    })

    return fetch(BaseURL.DemoURL_API + API_List.Upload_Profile_Video, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        body: (data)
    })
        .then(res => res.json())
        .then(response => {
            return response
        })
        .catch(function (error) {
            return error
        });
}

const UploadGalleryVideos = async (req, token) => {
    let data = new FormData();
    console.log(req)
    req.map((el, i) => {
        data.append('gallery_videos[]', {
            uri: el.path,
            type: el.mime,
            name: 'gallery_Video.mp4'
        })
    })

    let config = {
        method: 'POST',
        url: BaseURL.DemoURL_API + API_List.Upload_gallery_Videos,
        data: data,
        headers: {
            'Authorization': token,
        },
    };
    console.log(JSON.stringify(data))

    return axios(config)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
        });
}

// Get All Gallery Videos
const GetAllGalleryVideos = async (token, member_id) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_member_all_gallery_videos + `/${member_id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            return response
        })
        .catch(error => {
        });
}

// Update New Mobile Number
const UpdateNewMobileNumber = async (token, req) => {

    let data = new FormData();
    data.append('mobile', req)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_New_Mobile,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }
        })
        .catch(error => {
            return error
        });

}

// Get All Nationality
const GetAllNationality = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_All_Nationality,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            return response.data
            // }

        })
        .catch(error => {
            return error
        });
}

// Get All Marital Status
const GetAllMaritalStatus = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_All_Marital_Status,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        });
}

// Get All Mother Tongue
const GetAllMotherTongue = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_All_Mother_Tongue,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            return response.data
            // }

        })
        .catch(error => {
            return error
        });
}

// Get_Annual_Income_Options 
const GetAnnualIncomeOptions = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Annual_Income_Options,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            if (response.status == 200) {
                return response.data
            }

        })
        .catch(error => {
            return error
        });
}

// Get Education Level
const GetEducationLevel = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Education_Level,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        });
}

// Get Field Of Study
const GetFieldOfStudy = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Field_Of_Study,
        headers: {
            'Authorization': isSignup ? token : await Auth_Token,
        },
    };

    return axios(config)
        .then(response => {
            return response.data
            // }

        })
        .catch(error => {
            return error
        });
}


// Update Career
const UpdateCareer = async (token, reqObj) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Career,
        headers: {
            'Authorization': token,
        },
        data: reqObj
    };

    console.log(reqObj)

    console.log(reqObj)

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Update Education
const UpdateEducation = async (token, reqObj) => {
    let data = new FormData();
    data.append('education_level', reqObj.education_level);
    data.append('field_of_study', reqObj.field_of_study);
    data.append('course_name', reqObj.course_name);
    data.append('college_name', reqObj.college);
    data.append('passing_year', reqObj.passing_year);
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Education,
        headers: {
            'Authorization': token,
        },
        data: data
    };
    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Upload Profile Picture
const UploadProfilePicture = async (profile_pic) => {
    let data = new FormData();
    data.append('profile_pic', profile_pic);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Upload_Profile_Picture,
        headers: {
            'Authorization': await SignupAuthToken,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Upload Profile Video
const UploadProfileVideo = async (profile_video) => {
    let data = new FormData();
    data.append('profile_video', profile_video);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Upload_Profile_Video,
        headers: {
            'Authorization': await SignupAuthToken,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// login with username and password
const LoginWithUsernamePassword = async (reqObj) => {
    let data = new FormData();
    data.append('username', reqObj.username);
    data.append('password', reqObj.password)
    data.append('device_token', reqObj.device_token)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.login_with_username,
        headers: {
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });

}

// Login With OTP
const LoginWithOTPAPI = async (mobile) => {
    let data = new FormData()
    data.append('mobile', mobile);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Login_With_OTP,
        headers: {
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Login With OTP Verification
const LoginWithOTPVerificationAPI = async (reqObj) => {
    let data = new FormData()
    data.append('otp_val_one', reqObj.otp_val_one);
    data.append('otp_val_two', reqObj.otp_val_two);
    data.append('otp_val_three', reqObj.otp_val_three);
    data.append('otp_val_four', reqObj.otp_val_four);
    data.append('mobile', reqObj.mobile);
    data.append('device_token', reqObj.device_token);
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Validate_Otp_For_Login,
        headers: {
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Resend OTP
const ResendOTP = async (token, mobile) => {
    let data = new FormData();
    data.append('mobile', mobile)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Resend_OTP,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}

// Forget Password
const ForgetPasswordAPI = async (email_mobile) => {
    let data = new FormData();
    data.append('email_mobile', email_mobile)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.forgot_password,
        headers: {
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });

}

// 
// 
// --------------- Auth Screen API call Start ------------------
// 
// 
// 
// Dashboard---------------
// 

// Preferance Member Listing
const PreferanceMemberListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Preferance_Member_Listing,
        headers: {
            'Authorization': token,
        },

    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Recommended Members Listings
const RecommendedMembersListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Recommended_Members_Listings,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Newly Joined Members
const NewlyJoinedMembers = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Newly_Joined_Members,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Member Listings Viewed By Me
const MemberListingsViewedByMe = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Member_Listings_Viewed_By_Me,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Premium Members Listings
const PremiumMembersListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Premium_Members_Listings,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Reverse Matches Listings
const ReverseMatchesListings = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Reverse_Matches_Listings,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Mutual Matches Listings
const MutualMatchesListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Mutual_Matches_Listings,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Matches For The Day
const MatchesForTheDay = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Matches_For_The_Day,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// View All API's--------------------------------------------------------
const ViewAllRecommendation = async (token) => {
    console.log("token", token)
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_recomendation_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const ViewAllMutualMatches = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_mutual_matches_viewall + `/30/1`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const ViewAllNewlyJoined = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_newly_joined_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const ViewAllViewedMe = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_viewed_me_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const ViewAllPreferences = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_preferance_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const ViewAllPremiumMatches = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_members_premium_matches_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const ViewAllSimilarProfiles = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_similar_profiles_viewall,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const ViewAllNearByMembers = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_nearby_members_viewal,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const Logout = async (token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Logout,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


//get diet listing
const GetDietListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_diet_listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetDrinkListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_drink_listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetSmokeListings = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Smoke_listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

//lifstyle API------------------
const GetBloodGrouplist = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Blood_group_Listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}



const GetComlexionList = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Complexion_list,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}



const GetBodylist = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Body_Type_Listings,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}



const GetDisabilitiesList = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Disabilities_List,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


//Astro star Api-------------

const GetAstroDetail = async (id, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Astro_Details_Api + `/${id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const GetAstroStarsList = async (isSignup, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Astro_Star_List,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const Getstarlist = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Astro_Star_List,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


// Members Viewed Me
const MembersViewedMe = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Members_Viewed_Me,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Add To Shortlist
const AddToShortlist = async (member_id, token) => {
    let data = new FormData();
    data.append('member_id', member_id)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.AddToShorlist,
        headers: {
            'Authorization': token ? token : await Auth_Token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Remove From Shortlist
const RemoveFromShortlist = async (member_id, token) => {
    let data = new FormData();
    data.append('member_id', member_id)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.RemoveShorlist,
        headers: {
            'Authorization': token ? token : await Auth_Token,
        },
        data: data,
    };
    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Send Interest
const SendInterest = async (member_id, token) => {
    let data = new FormData();
    data.append('member_id', member_id)
    data.append('message', '')
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.SendInterest,
        headers: {
            'Authorization': token ? token : await Auth_Token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Profile Viewers Count
const GetProfileViewersCount = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.ProfileViewersCount,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Yet To View Count
const GetYetToViewCount = async () => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.YetToViewCount,
        headers: {
            'Authorization': await Auth_Token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Matches For The Day
const GetMatchesForTheDay = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.MatchesForTheDay,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Mutual Matches
const GetMutualMatches = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.MutualMatches,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Reverse Matches
const GetReverseMatches = async (token) => {
    let config = {
        method: 'get',
        timeout: 1000,
        url: BaseURL.DemoURL_API + API_List.ReverseMatches,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Get Online Matches
const GetOnlineMatches = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.OnlineMatches,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const UploadGalleryPictures = async (Pics, token) => {
    let data = new FormData();
    Pics.map((el, i) => {
        return data.append('gallery_pics[]', {
            uri: el.path,
            type: 'image/jpg',
            name: 'GalleryImg.jpg'
        })
    })

    console.log(JSON.stringify(Pics))

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Upload_gallery_pictures,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const PrivacySettingsApi = async (Privacy) => {
    let data = new FormData();
    data.append('profile_pic_show', Privacy.profile_pic_show)
    data.append('gallery_show', Privacy.gallery_show)
    data.append('contact_show_privacy', Privacy.contact_show_privacy)
    data.append('connect_via_email', Privacy.connect_via_email)
    data.append('connect_via_sms', Privacy.connect_via_sms)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Privacy_Settings,
        headers: {
            'Authorization': await Auth_Token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

//get member all gallery pics

const GetMemberAllGalleryPics = async (token, member_id) => {
    let config = {
        method: 'get',
        url: member_id ? BaseURL.DemoURL_API + API_List.get_member_all_gallery_pics + `/${member_id}` : BaseURL.DemoURL_API + API_List.get_member_all_gallery_pics,
        headers: {
            'authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

//
//
// 
// --------------- Auth Screen API call end --------------------
//
// 

// Edit profile signup Api-----------
const EditProfileSignupDetails = async (Signup_Detail, token) => {

    console.log(Signup_Detail,"---------------------------------------------")

    let data = new FormData();
    data.append('marital_status', Signup_Detail.marital_status)
    data.append('mother_tongue', Signup_Detail.mother_tongue)
    data.append('nationality', Signup_Detail.nationality)
    data.append('location', Signup_Detail.location)
    data.append('religion', Signup_Detail.religion);
    data.append('caste', Signup_Detail.caste);
    data.append('residency_status', Signup_Detail.residency_status);
    data.append('is_current_location', Signup_Detail.is_current_location)
    data.append('loc_latitude', Signup_Detail.loc_latitude)
    data.append('loc_longitude', Signup_Detail.loc_longitude)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Edit_Profile_Signup_Details_API,
        headers: {
            'Authorization': token,
        },
        data: data
    };
    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error
        });
}


const EditPhysicalAttributeDetails = async (ReqObj, token) => {
    let data = new FormData();
    data.append('height', ReqObj.Height);
    data.append('weight', ReqObj.Weight);
    data.append('complexion', ReqObj.Complexion);
    data.append('blood_group', ReqObj.BloodGroup);
    data.append('body_type', ReqObj.BodyType);
    data.append('physical_disability', ReqObj.PhysicalDisability);
    data.append('health_conditions', ReqObj.HealthConditions);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Edit_Profile_Physical_Attribute_API,
        headers: {
            'authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error
        });
}



const UpdateLifeStyleDetails = async (LifeSTyle_Detail, token) => {
    let data = new FormData();
    data.append('diet', LifeSTyle_Detail.Diet);
    data.append('drink', LifeSTyle_Detail.Drink);
    data.append('smoke', LifeSTyle_Detail.Smoke);

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Life_Style,
        headers: {
            'authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error
        });
}


const GetLocationOptions = async (value) => {
    let data = new FormData();
    data.append('keyword', value)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.getLocationOnInput,
        headers: {
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const SearchUserById = async (token, member_profile_id) => {
    let data = new FormData();
    data.append('member_profile_id', member_profile_id)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.SearchById,
        headers: {
            'Authorization': token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const AdvanceSearch = async (token, reqObj) => {
    let data = new FormData();
    data.append('gender', reqObj.gender)
    data.append('marital_status', reqObj.marital_status)
    data.append('religion', reqObj.religion)
    data.append('caste', reqObj.caste)
    data.append('sub_caste', reqObj.sub_caste)
    data.append('language', reqObj.language)
    data.append('country', reqObj.country)
    data.append('manglik', reqObj.manglik)
    data.append('aged_from', reqObj.aged_from)
    data.append('aged_to', reqObj.aged_to)
    data.append('min_height', reqObj.min_height)
    data.append('state', reqObj.state)
    data.append('annual_income', reqObj.annual_income)
    data.append('family_status', reqObj.family_status)
    data.append('mother_tongue', reqObj.mother_tongue)
    data.append('max_height', reqObj.max_height)
    data.append('search_member_type', 'all')
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.AdvancedSearch,
        headers: {
            'Authorization': token,
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const QuickSearchAPI = async (token, reqObj) => {
    let data = new FormData();
    data.append('gender', reqObj.gender)
    data.append('marital_status', reqObj.marital_status)
    data.append('religion', reqObj.religion)
    data.append('caste', reqObj.caste)
    data.append('sub_caste', reqObj.sub_caste)
    data.append('language', reqObj.language)
    data.append('country', reqObj.country)
    data.append('manglik', reqObj.manglik)
    data.append('aged_from', reqObj.aged_from)
    data.append('aged_to', reqObj.aged_to)
    data.append('min_height', reqObj.min_height)
    data.append('max_height', reqObj.max_height)
    data.append('search_member_type', 'all')
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.QuickSearch,
        headers: {
            'Authorization': token,
        },
        data: data,
    };

    console.log(data)

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const KeywordSearchAPI = async (token, keyword) => {
    let data = new FormData();
    data.append('search_keyword', keyword)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.KeyWordSearch,
        headers: {
            'Authorization': token,
        },
        data: data,
    };

    console.log(data)

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const GetSimilarProfiles = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_similar_profile,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetNearbyMembers = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Nearby_members_API,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const MembersLookingForMe = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Members_Looking_For_Me,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetShortlistedProfiles = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Shortisted_Profiles,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const ChangePasswordAPI = async (token, passwordObj) => {
    let data = new FormData();
    data.append('password', passwordObj.newPassword)
    data.append('c_password', passwordObj.currentPassword)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.change_password,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetHeight = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Heights,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetEmploymentTypeListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Employment_Type_Listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetJobTypeListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Job_Type_Listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdateAstroDetails = async (reqObj, token) => {
    let data = new FormData();
    data.append('time_of_birth', reqObj.time_of_birth);
    data.append('birth_star', reqObj.birth_star);
    data.append('city_of_birth', reqObj.city_of_birth);
    data.append('chovva_dosham', reqObj.chovva_dosham);
    data.append('shudha_jathakam', reqObj.shudha_jathakam);
    data.append('sun_sign', reqObj.sun_sign);
    data.append('matching_stars', `[${reqObj.astro_stars}]`)
    console.log(data)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Astro_Details,
        headers: {
            'authorization': token,
        },
        data: data
    };

    console.log(data)

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetKnowMeBetter = async (token, member_id) => {
    let config = {
        method: 'get',
        url: member_id ? BaseURL.DemoURL_API + API_List.Get_Know_Me_Better + '/' + member_id : BaseURL.DemoURL_API + API_List.Get_Know_Me_Better,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdateKnowMeBetter = async (reqArr, token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Know_Me_Better,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify(reqArr)
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetFamilyDetailsOfMember = async (token, member_id) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Family_detail_of_member + `${member_id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetFamilyStatusListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Family_Status_List,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdateFamilyDetails = async (reqObj, token) => {
    let config = {
        method: 'post',
        url: reqObj[0][0].member_id ? BaseURL.DemoURL_API + API_List.Update_Family_Details + `/${reqObj[0][0].member_id}` : BaseURL.DemoURL_API + API_List.Update_Family_Details,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify({ parent_info: [{ name: reqObj[0][0].name, working_in: reqObj[0][0].working_in, member_type: reqObj[0][0].member_type.id ? reqObj[0][0].member_type.id : null, designation: reqObj[0][0].designation, work_status: reqObj[0][0].work_status.name ? reqObj[0][0].work_status.name : 0 }] })
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const EducationDetailsOfLoggedInUser = async (member_id, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Education_Details_of_Logged_in_User + `/${member_id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetMemberCareerDetails = async (member_id, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_career_Detail_of_member + `/${member_id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const IgnoreMember = async (member_id, token) => {
    let data = new FormData();
    data.append('member_id', member_id)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Ignore_Member,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetFamilyValuesListing = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Family_Values_Listing,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const getPackageList = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Package_List,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetPartnerPreferenceBasicDetails = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Partner_Preference_Basic_Details,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetStatesListFromCountries = async (token, countryIdArr) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.get_states_list_from_countries,
        headers: {
            'Authorization': token,
        },
        data: countryIdArr
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetPartnerPreferencePhysicalAttr = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Partner_Preference_Physical_Attr,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetPartnerPreferenceLifestyle = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Partner_Preference_Lifestyle,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetPartnerPreferenceHobbies = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Partner_Preference_Hobbies,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetPartnerPreferenceAstrodetails = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_Partner_Preference_Astrodetails,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdatePArtnerPreferenceAstroDetails = async (data, token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Partner_Preference_Astrodetails,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdatePArtnerPreferenceHobbiesAndInterest = async (data, token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Partner_Preference_Hobbies,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdatePArtnerPreferenceBasicDetails = async (data, token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Partner_Preference_Basic_Details,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdatePArtnerPreferencePhysicalAttr = async (data, token) => {
    let fData = new FormData()
    fData.append('partner_from_height', data.partner_from_height)
    fData.append('partner_to_height', data.partner_to_height)
    fData.append('partner_from_weight', data.partner_from_weight)
    fData.append('partner_to_weight', data.partner_to_weight)
    fData.append('partner_blood_group', data.partner_blood_group)
    fData.append('partner_body_type', data.partner_body_type)
    fData.append('partner_any_disability', data.partner_any_disability)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Partner_Preference_Physical_Attr,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdatePArtnerPreferenceLifeStyle = async (data, token) => {
    let fData = new FormData()
    fData.append('diet', data.diet)
    fData.append('drink', data.drink)
    fData.append('smoke', data.smoke)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.Update_Partner_Preference_Lifestyle,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Discover Matches API's----------

const DiscoverMemberBasedOnCity = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_City,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const DiscoverMemberBasedOnProfession = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_Profession,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const DiscoverMemberBasedOnBirthStar = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_BirthStar,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const DiscoverMemberBasedOnFeatured = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_Featured,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const DiscoverMemberBasedOnShortlisted = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_Shortlisted,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const DiscoverMemberBasedOnNearMe = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_NearMe,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const DiscoverMemberBasedOnWithPhoto = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Discover_Member_Based_On_WithPhoto,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const getYouAndHer = async (token, member_id) => {
    let config = {
        method: 'get',
        url: member_id ? BaseURL.DemoURL_API + API_List.get_you_and_Her_API + '/' + member_id : BaseURL.DemoURL_API + API_List.get_you_and_Her_API,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetUserHobbiesAndInterests = async (token, member_id) => {
    let config = {
        method: 'get',
        url: member_id ? BaseURL.DemoURL_API + API_List.get_user_hobbies_and_interests + '/' + member_id : BaseURL.DemoURL_API + API_List.get_user_hobbies_and_interests,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetCountViewedYou = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_count_viewed_you,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetHobbiesParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.Get_hobbies_params,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetInterestParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Interests_parameters,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetMusicParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_All_music_parameter,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetMoviesParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Movies_parameters,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetSportsParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Sports_parameters,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetCuisineParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_cuisine_params,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetDressParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_Dress_params,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetBooksParameters = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_all_books_params,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdateHobbiesAndInterest = async (data, token) => {
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.update_hobbies_and_interest,
        headers: {
            'Authorization': token,
        },
        data: JSON.stringify(data)
    };

    return axios(config)
        .then(function (response) {

            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const updateFamilyStatusValue = async (data, token) => {
    // console.log(data)
    let fData = new FormData();
    fData.append('family_status', data.family_status);
    fData.append('family_value', data.family_value)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.update_family_status_value,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {

            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetMailboxInterest = async (categoryFilter, token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_mailbox_interest + `/${categoryFilter}`,
        headers: {
            'Authorization': token,
        },
    };

    console.log(config)

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const getAllNotification = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_All_notification,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const NotificationSeen = async (member_id,token) => {
    console.log(member_id,token,"--------------member_id,token--------------")
        let data = {
                member_id: member_id,             
        }
        console.log(data)
        let config = {
            method: 'post',
            url:BaseURL.DemoURL_API + API_List.update_notification_viewed_status,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        return axios(config)
            .then(response => {
                return response
    
            })
            .catch(error => {

            });
}

const NotificationReject = async (notification_id,type,token) => {
    console.log("notification_id,type,token----------------------------",notification_id,type,token)
    let fData = new FormData()
    fData.append('notification_id',notification_id)
    fData.append('type',type)
    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.cancel_notification_item,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const checkAllTrustBadges = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_all_trust_badges,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const uploadProfilePictureBadge = async (badgeImg, token) => {
    let data = new FormData();
    data.append('profile_picture', {
        uri: badgeImg.path,
        type: badgeImg.mime,
        name: 'uploadProfilePictureBadge.jpg'
    });
    data.append('type', 'profile_picture');

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.upload_profile_picture_badge,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const uploadEducationSalaryBadge = async (badgeImg, token) => {
    let data = new FormData();
    data.append('education_badge', {
        uri: badgeImg.path,
        type: badgeImg.mime,
        name: 'education_badge.jpg'
    });
    data.append('type', 'education');

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.upload_education_salary_badge,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const uploadIdentityBadge = async (badgeImg, token) => {
    let data = new FormData();
    data.append('identity_badge', {
        uri: badgeImg.path,
        type: badgeImg.mime,
        name: 'identity_badge.jpg'
    });
    data.append('type', 'identity');

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.upload_identity_badge,
        headers: {
            'Authorization': token,
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
// update_facebook_badge
const UpdateFacebookBadge = async (UserFacebookURL, UserLinkedInURL, UserInstagramURL, access_token) => {

    let fData = new FormData();
    fData.append('facebook_badge', UserFacebookURL);
    fData.append('linkedin_badge', UserLinkedInURL);
    fData.append('instagram_badge', UserInstagramURL);

    console.log(fData,"fData")

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.update_facebook_badge,
        headers: {
            'Authorization': access_token,
        },
        data: fData
    };
    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const setProfilePic = async (imgName, token) => {
    let fData = new FormData()
    fData.append('image_name', imgName)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.set_profile_pic,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const UpdateAnnualIncome = async (value, token) => {
    let fData = new FormData()
    fData.append('annual_income', value)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.update_annual_income,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const UpdateNotWorking = async (value, token) => {
    let fData = new FormData()
    fData.append('working_status', value)

    let config = {
        method: 'post',
        url: BaseURL.DemoURL_API + API_List.update_not_working,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            console.log(response.data)
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetNotWorkingStatus = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_not_working_status,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const GetRemainingParamsToCompleteProfile = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_remaining_params_tocomplete_profile,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const checkPaymentStatusWebView = async (token, timeStamp) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_payment_status_web_view + `/${timeStamp}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

const checkShortlistInterestSent = async (token, member_id) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_shortlist_interest_sent + `/${member_id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// get_countof_diff_requests

const GetCountOfDiffRequests = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_countof_diff_requests,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// get_interested_me
const GetInterestedMe = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_interested_me,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// send_photo_request
const SendPhotoRequest = async (token, member_Id) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.send_photo_request +`/${member_Id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// claim_now_package
const ClaimNowPackage = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.claim_now_package,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// get_pending_requests
const GetPendingRequests = async (token,limit,offset ) => {

    let fData = new FormData()
    fData.append('limit', limit)
    fData.append('offset', offset)


    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_pending_requests,
        headers: {
            'Authorization': token,
        },
        data: fData
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}

// Checkphotorequest
const Checkphotorequest = async (token, user_Id) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.check_photo_request +`/${user_Id}`,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
 

// GetCountOfNotification
const GetCountOfNotification = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_all_notification_count ,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
 

// GetCountOfPendingContacts
const GetCountOfPendingContacts = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_count_of_pending_contacts ,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
 
const GetShortlistedMembers = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_shortlisted_members ,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}
const GetShortlistedOthersMembers = async (token) => {
    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_shortlisted_by_other_members ,
        headers: {
            'Authorization': token,
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });
}


const GetAllCast = async (religionValue) => {

    let config = {
        method: 'get',
        url: BaseURL.DemoURL_API + API_List.get_all_caste +`/${religionValue}`,
        headers: {
           
        },
    };

    return axios(config)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error.response
        });

   
}


// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// -------------------------------------------------------Export Functions ------------------------------------------------------//
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------

export {
    GetAllCast,
    checkEmailAlreadyExist,
    checkMobileAlreadyExist,
    GetAllReligionList,
    GetAllCasteListByReligion,
    GetAllSubCasteListByCast,
    RegistrationStep1,
    RegistrationStep2,
    RegistrationStep3,
    LoginWithUsernamePassword,
    ForgetPasswordAPI,
    GetAllNationality,
    GetAllMaritalStatus,
    GetAllMotherTongue,
    GetAnnualIncomeOptions,
    GetEducationLevel,
    GetFieldOfStudy,
    GetAstroStarsList,
    UpdateCareer,
    UpdateEducation,
    UploadProfilePicture,
    UploadProfileVideo,
    LoginWithOTPAPI,
    ResendOTP,
    UploadHoroscope,
    LoginWithOTPVerificationAPI,
    UpdateNewMobileNumber,
    UploadProfilePictureAPI,
    UploadProfileVideoAPI,
    // Home Screen
    PreferanceMemberListing,
    RecommendedMembersListings,
    NewlyJoinedMembers,
    MembersViewedMe,
    MemberListingsViewedByMe,
    PremiumMembersListings,
    ReverseMatchesListings,
    MutualMatchesListings,
    MatchesForTheDay,
    ViewAllRecommendation,
    ViewAllMutualMatches,
    ViewAllNewlyJoined,
    ViewAllViewedMe,
    ViewAllPreferences,
    ViewAllPremiumMatches,
    ViewAllSimilarProfiles,
    ViewAllNearByMembers,
    GetMemberDetail,
    FewWordsAbout,
    AddAboutFamily,
    Logout,
    GetDietListings,
    GetDrinkListings,
    GetSmokeListings,
    GetBloodGrouplist,
    GetComlexionList,
    GetBodylist,
    GetDisabilitiesList,
    GetAstroDetail,
    Getstarlist,
    AddToShortlist,
    RemoveFromShortlist,
    SendInterest,
    GetProfileViewersCount,
    GetYetToViewCount,
    GetMatchesForTheDay,
    GetMutualMatches,
    GetReverseMatches,
    GetOnlineMatches,
    GetLocationOptions,
    EditProfileSignupDetails,
    EditPhysicalAttributeDetails,
    UpdateLifeStyleDetails,
    UploadGalleryPictures,
    UploadGalleryVideos,
    GetAllGalleryVideos,
    PrivacySettingsApi,
    GetMemberAllGalleryPics,
    SearchUserById,
    AdvanceSearch,
    QuickSearchAPI,
    KeywordSearchAPI,
    GetSimilarProfiles,
    GetNearbyMembers,
    MembersLookingForMe,
    GetShortlistedProfiles,
    ChangePasswordAPI,
    GetHeight,
    GetEmploymentTypeListing,
    GetJobTypeListing,
    GetAllCountryCode,
    UpdateAstroDetails,
    GetKnowMeBetter,
    UpdateKnowMeBetter,
    GetFamilyDetailsOfMember,
    GetFamilyStatusListing,
    UpdateFamilyDetails,
    EducationDetailsOfLoggedInUser,
    GetMemberCareerDetails,
    IgnoreMember,
    GetFamilyValuesListing,
    getPackageList,
    GetPartnerPreferenceBasicDetails,
    GetPartnerPreferencePhysicalAttr,
    GetPartnerPreferenceLifestyle,
    GetPartnerPreferenceHobbies,
    GetPartnerPreferenceAstrodetails,
    UpdatePArtnerPreferenceAstroDetails,
    UpdatePArtnerPreferenceHobbiesAndInterest,
    UpdatePArtnerPreferencePhysicalAttr,
    UpdatePArtnerPreferenceLifeStyle,
    UpdatePArtnerPreferenceBasicDetails,
    DiscoverMemberBasedOnBirthStar,
    DiscoverMemberBasedOnWithPhoto,
    DiscoverMemberBasedOnShortlisted,
    DiscoverMemberBasedOnProfession,
    DiscoverMemberBasedOnNearMe,
    DiscoverMemberBasedOnFeatured,
    DiscoverMemberBasedOnCity,
    getYouAndHer,
    GetUserHobbiesAndInterests,
    GetHobbiesParameters,
    GetInterestParameters,
    GetMusicParameters,
    GetMoviesParameters,
    GetSportsParameters,
    GetCuisineParameters,
    GetDressParameters,
    GetBooksParameters,
    UpdateHobbiesAndInterest,
    updateFamilyStatusValue,
    GetMailboxInterest,
    getAllNotification,
    checkAllTrustBadges,
    uploadProfilePictureBadge,
    uploadEducationSalaryBadge,
    uploadIdentityBadge,
    UpdateFacebookBadge,
    setProfilePic,
    GetStatesListFromCountries,
    GetCountViewedYou,
    UpdateAnnualIncome,
    UpdateNotWorking,
    GetNotWorkingStatus,
    GetRemainingParamsToCompleteProfile,
    checkPaymentStatusWebView,
    checkShortlistInterestSent,
    GetCountOfDiffRequests,
    GetInterestedMe,
    SendPhotoRequest,
    ClaimNowPackage,
    GetPendingRequests,
    Checkphotorequest,
    GetCountOfNotification,
    GetCountOfPendingContacts,
    GetShortlistedMembers,
    GetShortlistedOthersMembers,
    GetPhotoRequestCheckBanner,
    GetIntrestedRequestCheckBanner,
    GetShortListedRequestCheckBanner,
    NotificationSeen,
    NotificationReject
}
