import { TColorRecords, TSecondaryColorRecords } from "./color.type";
import { ColorRecords } from "./color.variables";
import { SecondaryColorRecords } from "./secondary.color";

export class ColorMethods {
    static GetColorFromColorCode(color: TColorRecords): string {
        return ColorRecords[color];
    }

    static GeSecondarytColorFromColorCode(color: TSecondaryColorRecords): string {
        return SecondaryColorRecords[color];
    }
}
