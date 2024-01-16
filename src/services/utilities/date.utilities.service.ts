export class DateUtilities {

  /**
   * La función devuelve la fecha y hora actuales en la zona horaria "América/Nueva_York" como una
   * cadena.
   * @returns la fecha y hora actuales en el formato de una cadena.
   */
  public static getNow(): string {
    const nDate = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    return nDate;
  }
}
