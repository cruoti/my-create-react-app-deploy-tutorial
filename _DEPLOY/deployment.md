# React App Deplyoment Strategies

1. Local development deployment
2. Local production
3. Docker deployment development
4. Docker deployment production
5. EC2 production
6. S3 production

# 0. Create-React-App Tutorial
https://create-react-app.dev/

## Node Install Instructions

- `npx create-react-app my-app`
- `cd my-app`
- `npm start`

TODO: List out the steps to isntall `Node` and `npm`

# 1. Local Development Deployment
1. `cd {app-dir}`
2. `npm start`


# 2. Local Production
It appears that any HTTP Static Web Server will do.  Start by _building_ the React App.  Then serve the build folder, which will contain an `index.html` file.  Loading the file in the browser directly will not work.  The server is necessary (however, unknown why).

## npm serve
1. `npm run build`
2. `npm install -g serve`
3. `serve -s build`

## python HTTP server
1. `npm run build`
2. `cd build`
3. `python -m http.server`


# 6. S3 production
Configure S3 bucket to host static website and upload files.

CloudFormation script to create S3 bucket with policy for static website (upload files after creation):
```yaml
AWSTemplateFormatVersion: "2010-09-09"

Description: Create an S3 bucket setup to host a static website.

Resources:

  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      AccessControl: PublicRead
      WebsiteConfiguration: 
        IndexDocument: index.html
      
  S3BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref S3Bucket
      PolicyDocument:
        Statement:
          - Action: s3:GetObject
            Effect: Allow
            Principal: "*"
            Resource: !Join
              - ""
              - - !GetAtt S3Bucket.Arn
                - /*
```

TODO:
- read route53 domains
- specify bucketname (base on route 53)
- or use random name
- create DNS record (for simple creation)
- cloudfront with certificate
- connect to GitHub repo
- specify config within repo or collection of files
- connect to DB


# OTHER - ReactApp Configuration
- https://create-react-app.dev/docs/adding-custom-environment-variables/
- Complex Env: https://www.opcito.com/blogs/managing-multiple-environment-configurations-in-react-app
- Simple Env: https://serverless-stack.com/chapters/environments-in-create-react-app.html
  - Edit `my_app/package.json` scripts with `REACT_APP_{VAR}` in command and then use in React App with `process.env.REACT_APP_{VAR}`.  Test out by doing local, dev, and prod releases.  Where Local is purely with local files and dev/prod are expected AWS deployments.
