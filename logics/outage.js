import Config from '../config/index.js';

export default class OutageLogic {
  static filterAndMapOutages({
    outages,
    devices,
  }) {
    const outagesDeviceMapping = {};
    outages
      .filter((outage) => (new Date(outage.begin) >= new Date(Config.limitDate)))
      .forEach((outage) => {
        if (outagesDeviceMapping[outage.id]) {
          outagesDeviceMapping[outage.id].push({
            begin: outage.begin,
            end: outage.end,
          });
        } else {
          outagesDeviceMapping[outage.id] = [{
            begin: outage.begin,
            end: outage.end,
          }];
        }
      });

    const deviceOutages = [];

    devices.forEach((device) => {
      const currentDeviceOutages = outagesDeviceMapping[device.id];

      if (currentDeviceOutages) {
        deviceOutages.push(...currentDeviceOutages.map((outage) => ({
          id: device.id,
          name: device.name,
          begin: outage.begin,
          end: outage.end,
        })));
      }
    });

    return deviceOutages;
  }
}
