foot-steps
==========

Website usage tracking using 1px image generated in AWS Lambda, API Gateway and DynamoDB.


## How it works

AWS Lambda function available via API Gateway. The function will pull any data from request and pass to DynamoDB and then return an image/200 response.

Actual image is still kind of broken. Still needs some work.

## Configuration

Currently the following additional changes are not included in the serverless.yml configuration

### Integration Request

**Mapping Templates**

Add request details to headers passed to the function.

Content-Type: application/json

```
{
  "method": "$context.httpMethod",
  "body" : $input.json('$'),
  "headers": {
    #foreach($param in $input.params().header.keySet())
    "$param": "$util.escapeJavaScript($input.params().header.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "queryParams": {
    #foreach($param in $input.params().querystring.keySet())
    "$param": "$util.escapeJavaScript($input.params().querystring.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "pathParams": {
    #foreach($param in $input.params().path.keySet())
    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end

    #end
  }  
}
```

## Method Response

200
