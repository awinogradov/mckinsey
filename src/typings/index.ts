export enum reportState {
  open = 'OPEN',
  closed = 'CLOSED'
}

export enum reportType {
  spam = 'SPAM',
  property = 'INFRINGES_PROPERTY',
  policy = 'VIOLATES_POLICIES'
}

export type ReportMessage = null | string;

export interface ReportReflection {
  id: string;
  state: reportState;
  blocked?: boolean;
  payload: {
    reportId: string;
    reportType: reportType;
    message: ReportMessage;
  };
  created: string;
}

export interface FSReflection {
  size: number;
  elements: Array<ReportReflection>;
}

export interface DBNormalized {
  reports: Record<string, ReportReflection>
}
