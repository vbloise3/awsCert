from collections import namedtuple

from chalicelib.constants import CA220QUESTIONS_TABLE_NAME
from chalicelib.constants import QUESTIONS_TABLE_KEY_NAME
from chalicelib.utils import DynamoDBTable


CA220Question = namedtuple(
    'CA220Question', ['id', 'category', 'info'])


class CA220QuestionsTable(DynamoDBTable):
    def __init__(self,
                 table_name=CA220QUESTIONS_TABLE_NAME,
                 key_name=QUESTIONS_TABLE_KEY_NAME):
        super(CA220QuestionsTable, self).__init__(table_name, key_name)

    def get_question(self, id):
        data = self.get_value_from_db(id)
        if data:
            return CA220Question(
                id=data['id'],
                category=data['category'],
                info=data['info']
            )