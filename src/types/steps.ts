export type TStepContent = {
  title: string;
  description: string;
};

export type TStep = {
  step: string;
  content: TStepContent[];
};

export type TSteps = {
  steps: TStep[];
};
