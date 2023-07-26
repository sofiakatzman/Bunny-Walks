from sqlalchemy_serializer import SerializerMixin

from config import db

# Models go here!

# join table to store sightings => walk id, walk path, bunny id
bunny_sightings = db.Table(
    'bunny_sightings', 
    db.Column('walk_id', db.Integer, db.ForeignKey('walks.id'), primary_key=True), 
    db.Column('bunny_id', db.Integer, db.ForeignKey('bunnies.id'), primary_key=True), 
)

# stores user walk metrics 
class Walk(db.Model, SerializerMixin): 
    __tablename__ = 'walks'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    bunny_count = db.Column(db.Integer)

    # example of a one to many relationship : one path to many walks 
    walk_path = db.Column(db.Integer, db.ForeignKey('paths.id'))

    # example of a many to many relationship : many bunnies to many walks 
    bunnies = db.relationship('Bunny', secondary=bunny_sightings, backref='walks')
    
    serialize_rules = (
        '-bunnies',  
    )

# stores different bunnies that have been discovered 
class Bunny(db.Model, SerializerMixin):
    __tablename__ = 'bunnies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    headshot = db.Column(db.String)

    


# stores different paths to 
class Path(db.Model, SerializerMixin):
    __tablename__ = 'paths'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    directions = db.Column(db.String, nullable=True)




