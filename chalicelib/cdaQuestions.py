from collections import namedtuple

from chalicelib.constants import CDAQUESTIONS_TABLE_NAME
from chalicelib.constants import QUESTIONS_TABLE_KEY_NAME
from chalicelib.utils import DynamoDBTable


CDAQuestion = namedtuple(
    'CDAQuestion', ['id', 'category', 'info'])


class CDAQuestionsTable(DynamoDBTable):
    def __init__(self,
                 table_name=CDAQUESTIONS_TABLE_NAME,
                 key_name=QUESTIONS_TABLE_KEY_NAME):
        super(CDAQuestionsTable, self).__init__(table_name, key_name)

    def get_question(self, id):
        data = self.get_value_from_db(id)
        if data:
            return CDAQuestion(
                id=data['id'],
                category=data['category'],
                info=data['info']
            )