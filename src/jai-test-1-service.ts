import { Construct } from '@aws-cdk/core';
import { RestApi, LambdaIntegration, MethodLoggingLevel } from '@aws-cdk/aws-apigateway';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from '@aws-cdk/aws-lambda';
import { SubnetType, Vpc } from '@aws-cdk/aws-ec2';

export class SomeService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new NodejsFunction(this, 'lambda-1', {
      runtime: Runtime.NODEJS_14_X,
      entry: `${__dirname}/jai-test-1-lambda.ts`,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE,
      },
      vpc: new Vpc(this, 'VPC', {
        cidr: '10.0.0.0/16',
        maxAzs: 1,
        subnetConfiguration: [
          {
            name: 'Public',
            subnetType: SubnetType.PUBLIC,
          },
          {
            name: 'Private',
            subnetType: SubnetType.PRIVATE,
          },
        ],
        natGateways: 1,
      }),
    });

    const api = new RestApi(this, 'lambda-1-api', {
      deployOptions: {
        loggingLevel: MethodLoggingLevel.INFO,
      },
    });

    api.root.addMethod(
      'GET',
      new LambdaIntegration(handler, {
        requestTemplates: { 'application/json': `{ 'statusCode': '200' }` },
      })
    );
  }
}
