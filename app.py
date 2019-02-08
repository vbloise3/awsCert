import chalice
import boto3
import chalicelib.constants
import chalicelib.ca2Questions
import chalicelib.questions
from boto3.dynamodb.conditions import Key, Attr
import json


app = chalice.Chalice(app_name='awsCert')

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
ca2_table = dynamodb.Table('CA2QandA')


@app.route('/', cors=True)
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
def get_all_q_and_as_ca2():
    # FilterExpression specifies a condition that returns only items that
    #    satisfy the condition. All other items are discarded.
    fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    # ProjectionExpression specifies the attributes you want in the scan result.
    # pe = "#id, category, info.subcategory"
    # Expression Attribute Names for Projection Expression only.
    # ean = { "#id": "id", }
    esk = None
    # response = ca2_table.scan(
    #    FilterExpression=Attr('info.subcategory').eq('Define AWS Cloud') | Attr('info.subcategory').eq('EC2')
    # )
    response = ca2_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in response:
        response = ca2_table.scan(
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


@app.route('/getAllQandAs/{parameters}', cors=True)
def get_all_q_and_as_ca2(parameters):
    yose = parameters
    fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    response = ca2_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in response:
        response = ca2_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=response['LastEvaluatedKey']
        )
    items = response['Items']
    #return {
    #    'headers': {
    #        'Content-Type': 'application/json',
    #        'Access-Control-Allow-Origin': '*'
    #    },
    #    'body': items
    #}
    return items


def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
