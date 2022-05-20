interface OwnProps {
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

type GoogleMarkerProps = OwnProps & google.maps.MarkerOptions;

export function initGoogleMarker({ onMouseOver, onMouseOut, onClick, ...options }: GoogleMarkerProps) {
  // create google marker
  const marker = new google.maps.Marker();

  // Clear existing listeners when a handler passed as a prop has been updated
  google.maps.event.clearInstanceListeners(marker);

  // add marker event listners
  if (onMouseOver) marker.addListener('mouseover', onMouseOver);
  if (onMouseOut) marker.addListener('mouseout', onMouseOut);
  if (onClick) marker.addListener('click', onClick);

  marker.setOptions(options);

  return marker;
}
