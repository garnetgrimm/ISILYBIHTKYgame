import serverside
import os
serverside.db.drop_all()
serverside.db.create_all()
print("db cleared")
os.system("pause")