export const dimensions = Object.freeze({
  action: {
    state: 1,
    duration: 2,
    type: 3,
    correlationId: 4,
  },
  visit: {},
});

export const categories = Object.freeze({
  logistics: {
    $base: 'logistics',
    preferences: 'preferences',
    map: 'map',
  },
  vud: {
    $base: 'vud',
  },
  driverScoring: {
    $base: "driver-scoring"
  },
  reports: {
    $base: 'reports',
  },
  vehicles: {
    $base: 'vehicles',
  },
  unloads: {
    $base: 'unloads',
  },
  driversUnloads: {
    $base: 'drivers-unloads',
  },
});
