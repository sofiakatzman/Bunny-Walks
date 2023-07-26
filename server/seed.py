#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from sqlalchemy import func

# Local imports
from app import app
from config import db
from models import Walk, Bunny, Path


fake = Faker()

def delete_data():
    Walk.query.delete()
    Bunny.query.delete()
    Path.query.delete()

def create_fake_walk():
    date = fake.date()
    start_time = fake.time()
    end_time = fake.time()
    bunny_count = fake.random_int(min=1, max=10)
    walk_path = Path.query.order_by(func.random()).first().id

    walk = Walk(
        date=date,
        start_time=start_time,
        end_time=end_time,
        bunny_count=bunny_count,
        walk_path=walk_path,
    )

    return walk

def create_fake_bunny():

    name = fake.first_name()
    description = fake.sentence()

    bunny = Bunny(
        name=name,
        description=description,
        headshot="https://png.pngtree.com/element_our/png/20180929/rabbit-png_121076.jpg",
    )

    return bunny

def create_fake_path():
    name = fake.word()
    directions = fake.paragraph(nb_sentences=2)

    path = Path(
        name=name,
        directions=directions,
    )

    return path

def generate_fake_data():
    for _ in range(10):
        path = create_fake_path()
        db.session.add(path)
    
    for _ in range(20):
        bunny = create_fake_bunny()
        db.session.add(bunny)

    for _ in range(50):
        walk = create_fake_walk()
        db.session.add(walk)

    db.session.commit()

def generate_force_data():
    # random path
    path = Path(
            id = 0,
            name="Random",
            directions="-",
        )
    
    db.session.add(path)
    

    # random bunny
    bunny = Bunny(
        id=0,
        name="Random Bunny",
        description="-",
        headshot="https://img.freepik.com/free-vector/hand-drawn-bunny-outline-illustration_23-2149265219.jpg?w=360",
    )
    db.session.add(bunny)
    db.session.commit()
if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        delete_data()
        generate_fake_data()
        generate_force_data()
        print("... seed complete")