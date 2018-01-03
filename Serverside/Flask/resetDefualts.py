from serverside import *
import os

db.drop_all()
db.create_all()

db.session.commit()

print("db reset.")

os.system("pause");