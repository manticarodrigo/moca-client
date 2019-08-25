// globals
import { get, SpacingProp } from './global/spacing';
import * as Alignment from './global/alignment';
import * as Typography from './global/typography';
import * as Colors from './global/colors';
import * as Shadows from './global/shadows';

// variants
import * as Views from './variants/views';
import * as Lists from './variants/lists';
import * as Buttons from './variants/buttons';
import * as Cards from './variants/cards';

// vendor
import * as Header from './vendor/header';
import * as Slides from './vendor/slides';

const Spacing = {
  get, // hack for bundling SpacingProp
};

export {
  Spacing,
  SpacingProp,
  Alignment,
  Typography,
  Colors,
  Shadows,
  Views,
  Lists,
  Buttons,
  Cards,
  Header,
  Slides,
};
