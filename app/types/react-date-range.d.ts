declare module "react-date-range" {
  import * as React from "react";

  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key?: string;
  }

  export interface RangeKeyDict {
    [key: string]: Range;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange: (ranges: RangeKeyDict) => void;
    months?: number;
    direction?: "horizontal" | "vertical";
    moveRangeOnFirstSelection?: boolean;
    showSelectionPreview?: boolean;
    editableDateInputs?: boolean;
    dragSelectionEnabled?: boolean;
    className?: string;
    showMonthAndYearPickers?: boolean;
  }

  export class DateRange extends React.Component<DateRangePickerProps> {}
}
