export class StartupPitch {
  ProblemStatement: string;
  ProposedSolution: string;
  ValueProposition: string;
  MarketPlan: string;
  StartupId: number;

  constructor(
    ProblemStatement: string,
    ProposedSolution: string,
    ValueProposition: string,
    MarketPlan: string,
    StartupId: number
  ) {
    this.MarketPlan = MarketPlan;
    this.ProblemStatement = ProblemStatement;
    this.StartupId = StartupId;
    this.ValueProposition = ValueProposition;
    this.ProposedSolution = ProposedSolution;
  }
}
