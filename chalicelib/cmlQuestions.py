from collections import namedtuple

from chalicelib.constants import CMLQUESTIONS_TABLE_NAME
from chalicelib.constants import QUESTIONS_TABLE_KEY_NAME
from chalicelib.utils import DynamoDBTable


CMLQuestion = namedtuple(
    'CMLQuestion', ['id', 'category', 'info'])


class CMLQuestionsTable(DynamoDBTable):
    def __init__(self,
                 table_name=CMLQUESTIONS_TABLE_NAME,
                 key_name=QUESTIONS_TABLE_KEY_NAME):
        super(CMLQuestionsTable, self).__init__(table_name, key_name)

    def get_question(self, id):
        data = self.get_value_from_db(id)
        if data:
            return CMLQuestion(
                id=data['id'],
                category=data['category'],
                info=data['info']
            )