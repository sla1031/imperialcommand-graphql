import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema
} from 'graphql';
import Db from './db';


const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'This represents a person',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(person) {
					return person.id; //from sequelize
				}
			},
			first_name: {
				type: GraphQLString,
				resolve(person) {
					return person.first_name; //from sequelize
				}
			},
			last_name: {
				type: GraphQLString,
				resolve(person) {
					return person.last_name; //from sequelize
				}
			},
			position: {
				type: Position,
				resolve(person){
					return person.getPosition(); //from sequelize
				}
			},
			notices: {
				type: new GraphQLList(Notice),
				resolve(person) {
					return person.getNotices(); //from sequelize
				}
			}
		}
	}
});

const Notice = new GraphQLObjectType({
	name: 'Notice',
	description: 'This represents a notice',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(notice) {
					return notice.id; //from sequelize
				}
			},
			title: {
				type: GraphQLString,
				resolve(notice) {
					return notice.title; //from sequelize
				}
			},
			content: {
				type: GraphQLString,
				resolve(notice) {
					return notice.content; //from sequelize
				}
			},
			related_position: {
				type: Position,
				resolve(notice) {
					return notice.getPosition(); //from sequelize
				}
			}
		}
	}
});

const Position = new GraphQLObjectType({
	name: 'Position',
	description: 'This represents a position',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(position) {
					return position.id; //from sequelize
				}
			},
			position_name: {
				type: GraphQLString,
				resolve(position) {
					return position.position_name; //from sequelize
				}
			}
		}
	}
});

//root query
const rootQuery = new GraphQLObjectType({
		name: 'rootQuery',
		description: 'This is a root query',
		//root api methods
		fields: () => {
			return{
				people: {
					type: new GraphQLList(Person),
					args: { //restrict list of fields
						first_name: {
							type: GraphQLString
						},
						last_name: {
							type: GraphQLString
						}
					},
					resolve(root, args){
						return Db.models.person.findAll({where: args}); //connect graph to sequelize, returns promise
					}
				},
				notices: {
					type: new GraphQLList(Notice),
					args: { //restrict list of fields
						title: {
							type: GraphQLString
						},
						author: {
							type: GraphQLString
						}
					},
					resolve(root, args){
						return Db.models.notice.findAll({where: args}); //connect graph to sequelize, returns promise
					}
				},
				positions: {
					type: new GraphQLList(Position),
					args: { //restrict list of fields
						id: {
							type: GraphQLInt
						},
						position_name: {
							type: GraphQLString
						}
					},
					resolve(root, args){
						return Db.models.position.findAll({where: args}); //connect graph to sequelize, returns promise
					}
				}
			}
		}
});


const Schema = new GraphQLSchema({
	//one root query
	query: rootQuery
});

export default Schema;
