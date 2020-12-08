import chalice
import boto3
import botocore
import chalicelib.constants
import chalicelib.ca2Questions
import chalicelib.ca220Questions
import chalicelib.questions
import chalicelib.cdaQuestions
import chalicelib.cdanQuestions
from boto3.dynamodb.conditions import Key, Attr
import json
#from urllib import unquote
from urllib.parse import unquote


app = chalice.Chalice(app_name='awsCert')

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
ca2_table = dynamodb.Table(chalicelib.constants.CA2QUESTIONS_TABLE_NAME)
ca220_table = dynamodb.Table(chalicelib.constants.CA220QUESTIONS_TABLE_NAME)
c2p_table = dynamodb.Table(chalicelib.constants.C2PQUESTIONS_TABLE_NAME)
cda_table = dynamodb.Table(chalicelib.constants.CDAQUESTIONS_TABLE_NAME)
cml_table = dynamodb.Table(chalicelib.constants.CMLQUESTIONS_TABLE_NAME)
cdan_table = dynamodb.Table(chalicelib.constants.CDANQUESTIONS_TABLE_NAME)



@app.route('/', cors=True)
def index():
    return {'hello': 'AWS Cert world'}


@app.route('/email/{email}/password/{password}', cors=True)
def hello_email_password(email, password):
    #bucketname = 's3-ats-migration-test.s3.eu-west-3.amazonaws.com'
    bucketname = 'atstestbucketvb'
    #itemname = 'test.jpg'
    itemname = 'notes.txt'
    s3 = boto3.resource('s3')
    obj = s3.Object(bucketname, itemname)
    data = obj.get()['Body'].read()
    print(data)
    return {'email': email, 'password': password}
    #return {'email': email, 'password': data}


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


@app.route('/getAllQandAsC2p/{parameters}', cors=True)
def get_all_q_and_as_c2p(parameters):
    # FilterExpression specifies a condition that returns only items that
    #    satisfy the condition. All other items are discarded.
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    # ProjectionExpression specifies the attributes you want in the scan result.
    # pe = "#id, category, info.subcategory"
    # Expression Attribute Names for Projection Expression only.
    # ean = { "#id": "id", }
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    esk = None
    # response = ca2_table.scan(
    #    FilterExpression=Attr('info.subcategory').eq('Define AWS Cloud') | Attr('info.subcategory').eq('EC2')
    # )
    responses = c2p_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = ca2_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items

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


@app.route('/getAllQandAsArch/{parameters}', cors=True)
def get_all_q_and_as_ca2(parameters):
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    responses = ca2_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = ca2_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items

@app.route('/getAllQandAs20Arch/{parameters}', cors=True)
def get_all_q_and_as_ca220(parameters):
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    responses = ca220_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = ca220_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items


@app.route('/getAllQandAsDev/{parameters}', cors=True)
def get_all_q_and_as_cda(parameters):
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    responses = cda_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = cda_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items

@app.route('/getAllQandAsML/{parameters}', cors=True)
def get_all_q_and_as_cml(parameters):
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    responses = cml_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = cml_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items

@app.route('/getAllQandAsDAN/{parameters}', cors=True)
def get_all_q_and_as_cdan(parameters):
    # now need to parse parameters and use in fe
    parameters = unquote(parameters)
    # print("splitting parameters: " + parameters[0] + ' ' + parameters[1])
    parsed_parameters = parameters.split(":")
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    # remove last empty list item
    del parsed_parameters[-1]
    # print("the parsed parameters " + parsed_parameters[0] + ' ' + parsed_parameters[1])
    print("parsed_parameters.length " + str(len(parsed_parameters)))
    # fe = Attr('info.subcategory').is_in(['Application Services', 'EC2', 'Test Example Questions'])
    fe = Attr('info.subcategory').is_in(parsed_parameters)
    responses = cdan_table.scan(
        Select='ALL_ATTRIBUTES',
        FilterExpression=fe,
        # ProjectionExpression=pe,
        # ExpressionAttributeNames=ean
    )
    while 'LastEvaluatedKey' in responses:
        responses = cdan_table.scan(
            # ProjectionExpression=pe,
            FilterExpression=fe,
            # ExpressionAttributeNames=ean,
            ExclusiveStartKey=responses['LastEvaluatedKey']
        )
    items = responses['Items']
    returned_items = json.dumps(items, separators=(',', ':'))
    return returned_items

def response(message, status_code):
    return {
        'statusCode': str(status_code),
        'body': json.dumps(message),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
        }
