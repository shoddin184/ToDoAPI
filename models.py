from typing import Optional
from sqlmodel import SQLModel, Field

class TodoList(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

class Todo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    done: bool = False
    list_id: int = Field(default=1, foreign_key="todolist.id")