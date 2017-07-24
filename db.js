import Sequelize from 'sequelize';

const Conn = new Sequelize(
	process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: 'mysql',

		pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
	}
);
const Person = Conn.define('person', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoincrement: true
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	position_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		foreignKey: true
	}
});

const Notice = Conn.define('notice',{
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoincrement: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	author: {
		type: Sequelize.INTEGER,
		allowNull: false,
		foreignKey: true
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	},
	related_position: {
		type: Sequelize.INTEGER,
		allowNull: false,
		foreignKey: true
	}
});

const Position = Conn.define('position', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoincrement: true
	},
	position_name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//relationships

Person.belongsTo(Position, {foreignKey: 'position_id'});
//Position.hasMany(Person, {foreignKey: 'position_id'});

//Notice.belongsTo(Person, {foreignKey: 'author'});
Person.hasMany(Notice, {foreignKey: 'author'});

Notice.belongsTo(Position, {foreignKey: 'related_position'});
//Position.hasMany(Notice, {foreignKey: 'related_position'});

Conn.sync();
export default Conn;
