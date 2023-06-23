const DEVICES_SIZE = Object.freeze({
  MOBILE_MAX: '991px',
  DESKTOP_MIN: '992px',
  DESKTOP_MAX: '2560px',
});

export const DEVICES = Object.freeze({
  MOBILE: `max-width: ${DEVICES_SIZE.MOBILE_MAX}`,
  DESKTOP: `min-width: ${DEVICES_SIZE.DESKTOP_MIN}`,
});
