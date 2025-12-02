from sqlmodel import create_engine, Session, SQLModel, select
from models import TodoList

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        existing = session.exec(select(TodoList).where(TodoList.id == 1)).first()
        if not existing:
            default_list = TodoList(id=1, name="タスク")
            session.add(default_list)
            session.commit()

def get_session():
    with Session(engine) as session:
        yield session
