from collections import namedtuple

from chalicelib.constants import C2PQUESTIONS_TABLE_NAME
from chalicelib.constants import QUESTIONS_TABLE_KEY_NAME
from chalicelib.utils import DynamoDBTable


C2PQuestion = namedtuple(
    'C2PQuestion', ['id', 'category', 'info'])


class C2PQuestionsTable(DynamoDBTable):
    def __init__(self,
                 table_name=C2PQUESTIONS_TABLE_NAME,
                 key_name=QUESTIONS_TABLE_KEY_NAME):
        super(C2PQuestionsTable, self).__init__(table_name, key_name)

    def get_question(self, id):
        data = self.get_value_from_db(id)
        if data:
            return C2PQuestion(
                id=data['id'],
                category=data['category'],
                info=data['info']
            )