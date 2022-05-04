import { getPreferenceValues } from '@raycast/api';

interface Preferences {
  clientId: string;
  clientSecret: string;
  organizationId: string;
  refreshToken: string;
  destPath: string;
}

export default (): Preferences => getPreferenceValues<Preferences>();
