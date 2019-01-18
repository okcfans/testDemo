import { NgModule } from '@angular/core';
import { EmptyStringPipe } from './empty-string/empty-string';
import { FormatDatePipe } from './format-date/format-date';
import { FormatEngineeringPipe } from './format-engineering/format-engineering';
import {FormatAmountPipe} from "./format-amount/format-amount";
import { FormatAddressPipe } from './format-address/format-address';
import { FormatTimePipe } from './format-time/format-time';
import {FormatReceiptTypePipe} from "./format-receipt-type/format-receipt-type";
import {FormatExpenseStatusPipe} from "./format-expense-status/format-expense-status";
import {FormatReceiptSaleMethod} from "./format-receipt-sale-method/format-receipt-sale-method";
import { FormatMoneyPipe } from './format-money/format-money';
import { FormatMoneyNullPipe } from './format-money-null/format-money-null';
import { FormatExpenseTypePipe } from './format-expense-type/format-expense-type';
import { FormatERSubmitStatePipe } from './format-er-submit-state/format-er-submit-state';
import { FormatCostTypePipe } from './format-cost-type/format-cost-type';
import { FormatCreditReportStatusPipe } from './format-credit-report-status/format-credit-report-status';
import { FormatAssignDutyStatePipe } from './format-assign-duty-state/format-assign-duty-state';
import { FormatProcessingTypePipe } from './format-processing-type/format-processing-type';
import { EveryFormatStatus } from './every-format-status/every-format-status';
import {FormatDateSecondPipe}from './format-date-second/format-date-second';

@NgModule({
	declarations: [
	  EmptyStringPipe,
    FormatDatePipe,
    FormatEngineeringPipe,
    FormatAmountPipe,
    FormatAddressPipe,
    FormatTimePipe,
    FormatReceiptTypePipe,
    FormatExpenseStatusPipe,
    FormatReceiptSaleMethod,
    FormatMoneyPipe,
    FormatMoneyNullPipe,
    FormatExpenseTypePipe,
    FormatERSubmitStatePipe,
    FormatCostTypePipe,
    FormatCreditReportStatusPipe,
    FormatAssignDutyStatePipe,
    FormatProcessingTypePipe,
    EveryFormatStatus,
    FormatDateSecondPipe,
  ],
	imports: [],
	exports: [
	  EmptyStringPipe,
    FormatDatePipe,
    FormatEngineeringPipe,
    FormatAmountPipe,
    FormatAddressPipe,
    FormatTimePipe,
    FormatReceiptTypePipe,
    FormatExpenseStatusPipe,
    FormatReceiptSaleMethod,
    FormatMoneyPipe,
    FormatMoneyNullPipe,
    FormatExpenseTypePipe,
    FormatERSubmitStatePipe,
    FormatCostTypePipe,
    FormatCreditReportStatusPipe,
    FormatAssignDutyStatePipe,
    FormatProcessingTypePipe,
    EveryFormatStatus,
    FormatDateSecondPipe
  ]
})
export class PipesModule {}
