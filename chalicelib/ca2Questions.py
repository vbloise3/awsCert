from collections import namedtuple

from chalicelib.constants import CA2QUESTIONS_TABLE_NAME
from chalicelib.constants import QUESTIONS_TABLE_KEY_NAME
from chalicelib.utils import DynamoDBTable


CA2Question = namedtuple(
    'CA2Question', ['id', 'category', 'info'])


class CA2QuestionsTable(DynamoDBTable):
    def __init__(self,
                 table_name=CA2QUESTIONS_TABLE_NAME,
                 key_name=QUESTIONS_TABLE_KEY_NAME):
        super(CA2QuestionsTable, self).__init__(table_name, key_name)

    def get_question(self, id):
        data = self.get_value_from_db(id)
        if data:
            return CA2Question(
                id=data['id'],
                category=data['category'],
                info=data['info']
            )