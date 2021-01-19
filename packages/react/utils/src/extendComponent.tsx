import * as React from 'react';
import { getSelector } from '@radix-ui/utils';

import type * as Polymorphic from '@radix-ui/react-polymorphic';

function extendComponent<As extends Polymorphic.ForwardRefComponent<any, any>>(
  Comp: As extends Polymorphic.ForwardRefComponent<infer I, infer P>
    ? Polymorphic.ForwardRefComponent<I, P>
    : As,
  displayName: string
) {
  const Extended = React.forwardRef((props, forwardedRef) => {
    const As = Comp as any;
    return <As selector={getSelector(displayName)} {...props} ref={forwardedRef} />;
  }) as Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof Comp>,
    Polymorphic.OwnProps<typeof Comp>
  >;
  Extended.displayName = displayName;
  return Extended;
}

export { extendComponent };
