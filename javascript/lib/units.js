class Units {
  // Formats a value to be displayed with measurement units.
  // The units will have a superscript exponent if one is given.
  formatValue(value, units, exponent) {
    let displayValue = value;
    if (typeof value === "number") {
      const numberFormatter = new Intl.NumberFormat();
      displayValue = numberFormatter.format(value);
    }
    const exponentHtml = exponent ? `<sup>${exponent}</sup>` : "";
    return `${displayValue} ${units}${exponentHtml}`;
  }
}
