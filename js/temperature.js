function Temperature() {
    this.kelvin = null;
    this.time = null;
    this.humidity = null;
}

Temperature.prototype.getFahrenheit = function () {
  return Math.round((this.kelvin * (9/5)) - 459.67);
};

Temperature.prototype.getCelsius = function () {
  return Math.round(this.kelvin - 273.15);
};

exports.temperatureModule = Temperature;
