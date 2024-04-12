// Correct implementation for this code would be to set up an ORM and get the values from the database in this manner,
// but in its current state, the code is not using an ORM. Was not able to implement the ORM in time for the submission.

const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sqlite.db');

const Competition = sequelize.define('Competition', {
    competition_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    competition_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    competition_start_date: {
        type: DataTypes.DATE
    },
    competition_end_date: {
        type: DataTypes.DATE
    },
    competition_venue_id: {
        type: DataTypes.INTEGER
    },
    competition_division: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Competition',
    timestamps: false
});

const CompetitionRegistration = sequelize.define('CompetitionRegistration', {
    competition_registration_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'user_id' }
    },
    heard_about_competition: {
        type: DataTypes.STRING
    },
    heard_by_other: {
        type: DataTypes.STRING
    },
    competition_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Competition', key: 'competition_id' }
    }
}, {
    tableName: 'CompetitionRegistration',
    timestamps: false
});

const CompetitionTeams = sequelize.define('CompetitionTeams', {
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Team', key: 'team_id' }
    },
    competition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Competition', key: 'competition_id' }
    }
}, {
    tableName: 'CompetitionTeams',
    timestamps: false
});

const CompetitionVenues = sequelize.define('CompetitionVenues', {
    venue_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Venue', key: 'venue_id' }
    },
    competition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Competition', key: 'competition_id' }
    }
}, {
    tableName: 'CompetitionVenues',
    timestamps: false
});

const Languages = sequelize.define('Languages', {
    language_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Languages',
    timestamps: false
});

const MedicalInformation = sequelize.define('MedicalInformation', {
    medical_information_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'user_id' }
    },
    existing_medical_condition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regular_medication: {
        type: DataTypes.STRING,
        allowNull: false
    },
    has_disability: {
        type: DataTypes.BOOLEAN
    },
    disability_care_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disability_type: {
        type: DataTypes.STRING
    },
    injury: {
        type: DataTypes.STRING
    },
    allergy: {
        type: DataTypes.STRING
    },
    ambulance_cover: {
        type: DataTypes.BOOLEAN
    },
    chest_pain: {
        type: DataTypes.BOOLEAN
    },
    heart_trouble: {
        type: DataTypes.BOOLEAN
    },
    blood_pressure: {
        type: DataTypes.BOOLEAN
    },
    faint_or_spells: {
        type: DataTypes.BOOLEAN
    },
    lower_back_problem: {
        type: DataTypes.BOOLEAN
    },
    physical_activity: {
        type: DataTypes.BOOLEAN
    },
    joint_or_bone_problem: {
        type: DataTypes.BOOLEAN
    },
    pregnant: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'MedicalInformation',
    timestamps: false
});

const Membership = sequelize.define('Membership', {
    membership_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'User', key: 'user_id' }
    },
    membership_product: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    membership_division: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preferred_position1: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preferred_position2: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Membership',
    timestamps: false
});

const Organisation = sequelize.define('Organisation', {
    organisation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    organisation_name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Organisation',
    timestamps: false
});

const OtherSports = sequelize.define('OtherSports', {
    other_sports_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'OtherSports',
    timestamps: false
});

const PreferredPlay = sequelize.define('PreferredPlay', {
    preferred_play_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    day: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'PreferredPlay',
    timestamps: false
});

const Role = sequelize.define('Role', {
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Team', key: 'team_id' }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'User', key: 'user_id' }
    },
    role: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Role',
    timestamps: false
});

const Team = sequelize.define('Team', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Organisation', key: 'organisation_id' }
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Team',
    timestamps: false
});

const Volunteer = sequelize.define('Volunteer', {
    volunteer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Volunteer',
    timestamps: false
});

const UserVolunteer = sequelize.define('UserVolunteer', {
    volunteer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'Volunteer', key: 'volunteer_id' }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'User', key: 'user_id' }
    }
}, {
    tableName: 'UserVolunteer',
    timestamps: false
});

const UserPreferredPlay = sequelize.define('UserPreferredPlay', {
    preferred_play_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'PreferredPlay', key: 'preferred_play_id' }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'User', key: 'user_id' }
    }
}, {
    tableName: 'UserPreferredPlay',
    timestamps: false
});




User.hasOne(UserCredentials, { foreignKey: 'user_id' });
User.hasMany(UserLanguages, { foreignKey: 'user_id' });
User.hasOne(UmpiringInfo, { foreignKey: 'user_id' });
User.hasMany(UserOtherSports, { foreignKey: 'user_id' });
User.hasMany(UserVolunteer, { foreignKey: 'user_id' });
User.hasMany(UserPreferredPlay, { foreignKey: 'user_id' });
User.hasOne(MedicalInformation, { foreignKey: 'user_id' });
User.hasMany(Role, { foreignKey: 'user_id' });
Role.belongsTo(Team, { foreignKey: 'team_id' });
CompetitionRegistration.belongsTo(Competition, { foreignKey: 'competition_id' });
Competition.belongsToMany(Venue, { through: CompetitionVenues });
User.belongsToMany(Languages, { through: UserLanguages });
User.belongsToMany(OtherSports, { through: UserOtherSports });
User.belongsToMany(Volunteer, { through: UserVolunteer });
User.belongsToMany(PreferredPlay, { through: UserPreferredPlay });