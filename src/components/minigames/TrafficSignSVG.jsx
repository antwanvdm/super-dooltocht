// Traffic sign SVG component using hand-crafted SVG files.
// Each sign key maps to an imported SVG file from /components/traffic-signs/.

import stop from '../traffic-signs/stop.svg';
import verbodeninrijden from '../traffic-signs/verbodeninrijden.svg';
import fietspad from '../traffic-signs/fietspad.svg';
import parkeren from '../traffic-signs/parkeren.svg';
import pasopKinderen from '../traffic-signs/pasop-kinderen.svg';
import pasopVoetgangers from '../traffic-signs/pasop-voetgangers.svg';
import pasopZebrapad from '../traffic-signs/pasop-zebrapad.svg';
import voetpad from '../traffic-signs/voetpad.svg';
import verbodenfietsen from '../traffic-signs/verbodenfietsen.svg';
import zone30 from '../traffic-signs/30zone.svg';
import eenrichtingsweg from '../traffic-signs/eenrichtingsweg.svg';
import voorrangGeven from '../traffic-signs/voorrang-geven.svg';
import voorrangsweg from '../traffic-signs/voorrangsweg.svg';
import eindeVoorrangsweg from '../traffic-signs/eindevoorrangsweg.svg';
import rotonde from '../traffic-signs/rotonde.svg';
import parkeerverbod from '../traffic-signs/parkeerverbod.svg';
import einde30zone from '../traffic-signs/einde30zone.svg';
import verbodenVoetgangers from '../traffic-signs/verboden-voetgangers.svg';
import geslotenVoorAlleVoertuigen from '../traffic-signs/gesloten-voor-alle-voertuigen.svg';
import fietsBromfietspad from '../traffic-signs/fiets-bromfietspad.svg';
import verbodenFietsBromfiets from '../traffic-signs/verbodenfiets-bromfiets.svg';
import ruiterpad from '../traffic-signs/ruiterpad.svg';
import spoorwegovergang from '../traffic-signs/spoorwegovergang.svg';

const SIGNS = {
  // Easy
  stop,
  verbodeninrijden,
  fietspad,
  parkeren,
  pasopKinderen,
  pasopVoetgangers,
  pasopZebrapad,
  voetpad,
  verbodenfietsen,
  zone30,
  eenrichtingsweg,
  // Medium
  voorrangGeven,
  voorrangsweg,
  eindeVoorrangsweg,
  rotonde,
  parkeerverbod,
  einde30zone,
  verbodenVoetgangers,
  geslotenVoorAlleVoertuigen,
  fietsBromfietspad,
  verbodenFietsBromfiets,
  ruiterpad,
  spoorwegovergang,
};

/**
 * Renders a traffic sign by key as an <img> referencing the SVG file.
 * @param {{ sign: string, size?: number, className?: string }} props
 */
export default function TrafficSignSVG({ sign, size = 80, className = '' }) {
  const src = SIGNS[sign];
  if (!src) return null;

  return (
    <img
      src={src}
      width={size}
      height={size}
      className={className}
      alt={sign}
      role="img"
    />
  );
}
