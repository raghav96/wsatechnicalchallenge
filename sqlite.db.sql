BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
	"user_id"	INTEGER NOT NULL,
	"registered_participant_id"	INTEGER NOT NULL,
	"non_registered_participant_id"	TEXT NOT NULL,
	"first_name"	TEXT NOT NULL,
	"middle_name"	TEXT,
	"last_name"	TEXT NOT NULL,
	"gender"	TEXT,
	"culture"	TEXT,
	"occupation"	TEXT,
	"external_user_id"	TEXT,
	"date_of_birth"	DATE,
	"email"	TEXT,
	"mobile_number"	TEXT,
	"postal_code"	TEXT,
	"street"	TEXT,
	"suburb"	TEXT,
	"state"	TEXT,
	"country"	TEXT,
	"emergency_first_name"	TEXT,
	"emergency_last_name"	TEXT,
	"emergency_contact_number"	TEXT,
	"marketing_opt_in"	BOOLEAN,
	"merged_user_id"	TEXT,
	"is_hidden"	BOOLEAN,
	"photography_consent"	BOOLEAN,
	"identify_as"	TEXT,
	"country_of_birth"	TEXT,
	"school"	TEXT,
	"school_grade"	INTEGER,
	"ssp"	BOOLEAN,
	"walking_spot_info"	TEXT,
	"do_not_send_email"	BOOLEAN,
	"favorite_team"	TEXT,
	"years_played"	INTEGER,
	PRIMARY KEY("user_id")
);
CREATE TABLE IF NOT EXISTS "Organisation" (
	"organisation_id"	INTEGER NOT NULL,
	"organisation_name"	TEXT NOT NULL,
	PRIMARY KEY("organisation_id")
);
CREATE TABLE IF NOT EXISTS "Competition" (
	"competition_id"	INTEGER NOT NULL,
	"competition_name"	TEXT NOT NULL,
	"competition_start_date"	DATE,
	"competition_end_date"	DATE,
	"competition_venue_id"	INTEGER,
	"competition_division"	TEXT,
	PRIMARY KEY("competition_id")
);
CREATE TABLE IF NOT EXISTS "CompetitionTeams" (
	"team_id"	INTEGER NOT NULL,
	"competition_id"	INTEGER NOT NULL,
	PRIMARY KEY("team_id","competition_id"),
	FOREIGN KEY("competition_id") REFERENCES "Competition"("competition_id"),
	FOREIGN KEY("team_id") REFERENCES "Team"("team_id")
);
CREATE TABLE IF NOT EXISTS "Venue" (
	"venue_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("venue_id")
);
CREATE TABLE IF NOT EXISTS "CompetitionVenues" (
	"venue_id"	INTEGER NOT NULL,
	"competition_id"	INTEGER NOT NULL,
	PRIMARY KEY("venue_id","competition_id"),
	FOREIGN KEY("venue_id") REFERENCES "Venue"("venue_id"),
	FOREIGN KEY("competition_id") REFERENCES "Competition"("competition_id")
);
CREATE TABLE IF NOT EXISTS "Membership" (
	"membership_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"membership_product"	TEXT NOT NULL,
	"membership_division"	TEXT NOT NULL,
	"preferred_position1"	TEXT NOT NULL,
	"preferred_position2"	TEXT NOT NULL,
	PRIMARY KEY("membership_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "Languages" (
	"language_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("language_id")
);
CREATE TABLE IF NOT EXISTS "UserLanguages" (
	"language_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("language_id","user_id"),
	FOREIGN KEY("language_id") REFERENCES "Languages"("language_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "UmpiringInfo" (
	"umpiring_info_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"is_new_to_umpiring"	BOOLEAN,
	PRIMARY KEY("umpiring_info_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "OtherSports" (
	"other_sports_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("other_sports_id")
);
CREATE TABLE IF NOT EXISTS "UserOtherSports" (
	"other_sports_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("other_sports_id","user_id"),
	FOREIGN KEY("other_sports_id") REFERENCES "OtherSports"("other_sports_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "Volunteer" (
	"volunteer_id"	INTEGER NOT NULL,
	"is_active"	BOOLEAN,
	"description"	TEXT,
	PRIMARY KEY("volunteer_id")
);
CREATE TABLE IF NOT EXISTS "UserVolunteer" (
	"volunteer_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("volunteer_id","user_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id"),
	FOREIGN KEY("volunteer_id") REFERENCES "Volunteer"("volunteer_id")
);
CREATE TABLE IF NOT EXISTS "PreferredPlay" (
	"preferred_play_id"	INTEGER NOT NULL,
	"day"	TEXT,
	PRIMARY KEY("preferred_play_id")
);
CREATE TABLE IF NOT EXISTS "UserPreferredPlay" (
	"preferred_play_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("preferred_play_id","user_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id"),
	FOREIGN KEY("preferred_play_id") REFERENCES "PreferredPlay"("preferred_play_id")
);
CREATE TABLE IF NOT EXISTS "MedicalInformation" (
	"medical_information_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"existing_medical_condition"	TEXT NOT NULL,
	"regular_medication"	TEXT NOT NULL,
	"has_disability"	BOOLEAN,
	"disability_care_number"	TEXT NOT NULL,
	"disability_type"	TEXT,
	"injury"	TEXT,
	"allergy"	TEXT,
	"ambulance_cover"	BOOLEAN,
	"chest_pain"	BOOLEAN,
	"heart_trouble"	BOOLEAN,
	"blood_pressure"	BOOLEAN,
	"faint_or_spells"	BOOLEAN,
	"lower_back_problem"	BOOLEAN,
	"physical_activity"	BOOLEAN,
	"joint_or_bone_problem"	BOOLEAN,
	"pregnant"	BOOLEAN,
	PRIMARY KEY("medical_information_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "Role" (
	"team_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"role"	TEXT NOT NULL,
	PRIMARY KEY("team_id","user_id"),
	FOREIGN KEY("team_id") REFERENCES "Team"("team_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "Team" (
	"team_id"	INTEGER NOT NULL,
	"organisation_id"	INTEGER NOT NULL,
	"name"	TEXT,
	PRIMARY KEY("team_id"),
	FOREIGN KEY("organisation_id") REFERENCES "Organisation"("organisation_id")
);
CREATE TABLE IF NOT EXISTS "CompetitionRegistration" (
	"competition_registration_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"heard_about_competition"	TEXT,
	"heard_by_other"	TEXT,
	"competition_id"	INTEGER,
	PRIMARY KEY("competition_registration_id"),
	FOREIGN KEY("competition_id") REFERENCES "Competition"("competition_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
CREATE TABLE IF NOT EXISTS "UserCredentials" (
	"user_credentials_id"	INTEGER NOT NULL,
	"user_id"	INTEGER NOT NULL,
	"accreditation_umpire_level"	TEXT,
	"accreditation_umpire_expiry_date"	DATE,
	"association_level"	TEXT,
	"accreditation_coach_level"	TEXT,
	"accreditation_coach_expiry_date"	DATE,
	"children_check_number"	TEXT,
	"children_check_expiry_date"	DATE,
	"is_umpire_prequisite_training_complete"	INTEGER,
	PRIMARY KEY("user_credentials_id"),
	FOREIGN KEY("user_id") REFERENCES "User"("user_id")
);
INSERT INTO "User" VALUES (1234,1234,'URE123','Joanna','Mary','Smith','Female','Maori','Tester','ABC123','2010-01-01','joanna@gmail.com','0400400400','ABC123','100 George Street','Sydney','NSW','Australia','Emily','Emerson','0400400400',1,NULL,0,1,'Aboriginal','Australia','Abbotsford Public School',3,1,'This is some information relating to walking sports',1,'Queensland Firebirds',2);
INSERT INTO "Organisation" VALUES (1,'Sports Queensland');
INSERT INTO "Competition" VALUES (1,'2023 Walking Netball Competition','2023-01-01','2023-12-01',NULL,'11s');
INSERT INTO "CompetitionTeams" VALUES (1,1);
INSERT INTO "Venue" VALUES (1,'Venue 1');
INSERT INTO "Venue" VALUES (2,'Venue 2');
INSERT INTO "CompetitionVenues" VALUES (1,1);
INSERT INTO "CompetitionVenues" VALUES (2,1);
INSERT INTO "Membership" VALUES (1,1234,'2023 Walking Netball','Junior','GS','GA');
INSERT INTO "Languages" VALUES (1,'Afrikaans');
INSERT INTO "Languages" VALUES (2,'Albanian');
INSERT INTO "UserLanguages" VALUES (1,1234);
INSERT INTO "UserLanguages" VALUES (2,1234);
INSERT INTO "UmpiringInfo" VALUES (1,1234,1);
INSERT INTO "OtherSports" VALUES (1,'Cricket');
INSERT INTO "OtherSports" VALUES (2,'Dancing');
INSERT INTO "UserOtherSports" VALUES (1,1234);
INSERT INTO "UserOtherSports" VALUES (2,1234);
INSERT INTO "Volunteer" VALUES (1,0,'Coaching');
INSERT INTO "Volunteer" VALUES (2,0,'Manager');
INSERT INTO "Volunteer" VALUES (3,0,'Fundraising / Committee Member');
INSERT INTO "Volunteer" VALUES (4,0,'Other');
INSERT INTO "UserVolunteer" VALUES (1,1234);
INSERT INTO "UserVolunteer" VALUES (2,1234);
INSERT INTO "UserVolunteer" VALUES (3,1234);
INSERT INTO "UserVolunteer" VALUES (4,1234);
INSERT INTO "PreferredPlay" VALUES (1,'Monday');
INSERT INTO "PreferredPlay" VALUES (2,'Tuesday');
INSERT INTO "UserPreferredPlay" VALUES (1,1234);
INSERT INTO "UserPreferredPlay" VALUES (2,1234);
INSERT INTO "MedicalInformation" VALUES (1,1234,'allergies','meds',1,'23234232','Intellectual/ Learning Impairment','injuries','',1,NULL,NULL,NULL,NULL,1,0,0,0);
INSERT INTO "Role" VALUES (1,1234,'Player');
INSERT INTO "Team" VALUES (1,1,'Team A');
INSERT INTO "CompetitionRegistration" VALUES (1,1234,'Website','School Poster',1);
INSERT INTO "UserCredentials" VALUES (1,1234,NULL,NULL,NULL,NULL,NULL,'ABC123','2023-12-01',NULL);
COMMIT;
