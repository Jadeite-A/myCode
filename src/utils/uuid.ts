import Lodash from 'lodash';
import { v4  } from 'uuid';

export default {
  // normal
  uuid: () => {
    return v4();
  },
  uniqueId: (prefix: string = 'myId-test-') => Lodash.uniqueId(prefix)
};