const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: './sqlite.db',
        driver: sqlite3.Database
    });
}

async function retrieveAllUserData() {
    const db = await openDb();

    try {
        // Fetch user id for each user
        const users = await db.all(`SELECT * FROM User`);

        let results = [];
        
        for (const user of users) {
            const userId = user.user_id;

            // Competition venues fetch from db
            const competitionVenues = await db.all(`
                SELECT v.name
                FROM CompetitionVenues cv
                JOIN Venue v ON cv.venue_id = v.venue_id
                JOIN CompetitionRegistration cr ON cv.competition_id = cr.competition_id
                WHERE cr.user_id = ?;
            `, userId);

            // Languages user speaks fetch from db
            const languages = await db.all(`
                SELECT l.name
                FROM UserLanguages ul
                JOIN Languages l ON ul.language_id = l.language_id
                WHERE ul.user_id = ?;
            `, userId);

            // Other sports user plays fetch from db
            const otherSports = await db.all(`
                SELECT os.name
                FROM UserOtherSports uos
                JOIN OtherSports os ON uos.other_sports_id = os.other_sports_id
                WHERE uos.user_id = ?;
            `, userId);

            // Fetch volunteer details
            const volunteers = await db.all(`
                SELECT v.volunteer_id as id, v.description, v.is_active
                FROM UserVolunteer uv
                JOIN Volunteer v ON uv.volunteer_id = v.volunteer_id
                WHERE uv.user_id = ?;
            `, userId);

            // Fetch preferred play days
            const preferredPlays = await db.all(`
                SELECT pp.day
                FROM UserPreferredPlay upp
                JOIN PreferredPlay pp ON upp.preferred_play_id = pp.preferred_play_id
                WHERE upp.user_id = ?;
            `, userId);

            // Gettting all the data from each table in a big join query
            const overallData = await db.all(`
                SELECT 
                u.*,
                uc.*, 
                o.organisation_name, 
                c.competition_name, 
                c.competition_start_date, 
                c.competition_end_date, 
                c.competition_division,
                m.membership_product, 
                m.membership_division,
                t.name,
                r.role,
                m.preferred_position1, 
                m.preferred_position2, 
                cr.heard_about_competition, 
                cr.heard_by_other,
                mi.*,
                ui.is_new_to_umpiring
                FROM User u
                LEFT JOIN UserCredentials uc ON u.user_id = uc.user_id
                LEFT JOIN Membership m ON u.user_id = m.user_id
                LEFT JOIN UmpiringInfo ui ON u.user_id = ui.user_id
                LEFT JOIN CompetitionRegistration cr ON u.user_id = cr.user_id
                LEFT JOIN Competition c ON cr.competition_registration_id = c.competition_id
                LEFT JOIN CompetitionTeams ct ON c.competition_id = ct.competition_id
                LEFT JOIN Team t ON ct.team_id = t.team_id
                LEFT JOIN Role r ON u.user_id = r.user_id
                LEFT JOIN Organisation o ON t.organisation_id = o.organisation_id
                LEFT JOIN MedicalInformation mi ON u.user_id = mi.user_id
                WHERE u.user_id = ?`, userId);
            
            const data = overallData[0];

            // Assemble the final JSON object for the user
            const result =  {
                competitionName: data.competition_name,
                competitionStartDate: data.competition_start_date,
                competitionEndDate: data.competition_end_date,
                competitionDivision: data.competition_division,
                membershipProduct: data.membership_product,
                membershipDivision: data.membership_division,
                preferredPosition1: data.preferred_position1,
                preferredPosition2: data.preferred_position2,
                organisation: data.organisation_name,
                role: data.role, 
                team: data.name,
                competitionVenues: competitionVenues.map(cv => ({ name: cv.name })),
                registeredParticipantId: data.registered_participant_id,
                nonRegisteredParticipantId: data.non_registered_participant_id,
                userId: data.user_id,
                firstName: data.first_name,
                middleName: data.middle_name,
                lastName: data.last_name,
                gender: data.gender,
                languages: languages.map(l => ({ name: l.name })),
                culture: data.culture,
                occupation: data.occupation,
                externalUserId: data.external_user_id,
                dateOfBirth: data.date_of_birth,
                email: data.email,
                mobileNumber: data.mobile_number,
                postalCode: data.postal_code,
                street1: data.street,
                suburb: data.suburb,
                state: data.state,
                country: data.country,
                isUmpirePrerequisiteTrainingComplete: data.is_umpire_prequisite_training_complete,
                accreditationUmpireLevel: data.accreditation_umpire_level,
                accreditationUmpireExpiryDate: data.accreditation_umpire_expiry_date,
                associationLevel: data.association_level,
                accreditationCoachLevel: data.accreditation_coach_level,
                accreditationCoachExpiryDate: data.accreditation_coach_expiry_date,
                childrenCheckNumber: data.children_check_number,
                childrenCheckExpiryDate: data.children_check_expiry_date,
                emergencyFirstName: data.emergency_first_name,
                emergencyLastName: data.emergency_last_name,
                emergencyContactNumber: data.emergency_contact_number,
                marketingOptIn: data.marketing_opt_in,
                mergedUserId: data.merged_user_id,
                isHidden: data.is_hidden,
                photographyConsent: data.photography_consent,
                identifyAs: data.identify_as,
                countryOfBirth: data.country_of_birth,
                umpireInfo: {
                    isNewToUmpiring: data.is_new_to_umpiring,
                },
                heardAboutCompetition: data.heard_about_competition,
                heardByOther: data.heard_by_other,
                favoriteTeam: data.favorite_team,
                yearsPlayed: data.years_played,
                otherSports: otherSports.map(os => ({ name: os.name })),
                volunteer: volunteers.map(v => ({ id: v.id, isActive: v.is_active, description: v.description })),
                school: data.school,
                schoolGrade: data.school_grade,
                SSP: data.ssp,
                preferredPlay: preferredPlays.map(pp => pp.day),
                existingMedicalConditions: data.existing_medical_condition,
                regularMedication: data.regular_medication,
                hasDisability: data.has_disability,
                disabilityCareNumber: data.disability_care_number,
                disabilityType: data.disability_type,
                injury: data.injury,
                allergy: data.allergy,
                ambulanceCover: data.ambulance_cover,
                healthIndicators: {
                  chestPain: data.chest_pain,
                  heartTrouble: data.heart_trouble,
                  bloodPressure: data.blood_pressure,
                  faintOrSpells: data.faint_or_spells,
                  lowerBackProblem: data.lower_back_problem,
                  physicalActivity: data.physical_activity,
                  jointOrBoneProblem: data.joint_or_bone_problem,
                  pregnant: data.pregnant
                },
                walkingSportInfo: data.walking_spot_info,
                doNotSendEmail: data.do_not_send_email,
            };

            console.log("The json required is: \n")
            console.log(JSON.stringify(result, null, 2));
            results.push(JSON.stringify(result, null, 2));
        }
        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await db.close();
    }
}



app.get('/', (req, res) => {
    let data = retrieveAllUserData();
    data.then(function(result) {
        res.send(result);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});