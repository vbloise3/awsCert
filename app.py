import chalice
import boto3
import chalicelib.constants
import chalicelib.c2pQuestions
import chalicelib.questions
from boto3.dynamodb.conditions import Key, Attr

app = chalice.Chalice(app_name='awsCert')

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
c2p_table = dynamodb.Table('C2PQandA')

@app.route('/')
def index():
    return {'hello': 'AWS Cert world'}


@app.route('/email/{email}/password/{password}', cors=True)
def hello_email_password(email, password):
    return {'email': email, 'password': password}


@app.route('/questions/{question_id}', cors=True)
def get_question(question_id):
    table = chalicelib.questions.QuestionsTable()
    question = table.get_question(question_id)
    if not question:
        raise chalice.NotFoundError('Requested resource does not exist')
    return {
        'question_id': question.question_id,
        'question': question.question,
        'possible_answers': question.possible_answers
    }


@app.route('/getAllQandAs', cors=True)
def get_all_q_and_as_c2p():
    # FilterExpression specifies a condition that returns only items that
    #    satisfy the condition. All other items are discarded.
    fe = Attr('info.subcategory').contains('Architecture') | Attr('info.subcategory').contains('Architecting')
    # ProjectionExpression specifies the attributes you want in the scan result.
    # pe = "#id, category, info.subcategory"
    # Expression Attribute Names for Projection Expression only.
    # ean = { "#id": "id", }
    esk = None
    # response = c2p_table.scan(
    #    FilterExpression=Attr('info.subcategory').eq('Define AWS Cloud') | Attr('info.subcategory').eq('EC2')
    # )
    response = c2p_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in response:
        response = c2p_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=response['LastEvaluatedKey']
        )
    items = response['Items']
    # return items

    # The scan method returns a subset of the items each time, called a page.
    #   The LastEvaluatedKey value in the response is then passed to the scan method via
    #   the ExclusiveStartKey parameter. When the last page is returned, LastEvaluatedKey is not part of the response.
    # Note
    #   ExpressionAttributeNames provides name substitution. We use this because
    #     id is a reserved word in DynamoDB, you can't use it directly in
    #     any expression, including KeyConditionExpression.
    #     You can use the expression attribute name #id to address this.
    #   ExpressionAttributeValues provides value substitution.
    #     You use this because you can't use literals in any expression, including
    #     KeyConditionExpression. You can use the expression attribute value :yyyy to address this.

    return items

# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#
