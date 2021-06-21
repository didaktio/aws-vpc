import { Stack, Construct, StackProps } from '@aws-cdk/core';
import { SomeService } from './jai-test-1-service';

export class JaiTest1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SomeService(this, 'Jai test 1');
  }
}
