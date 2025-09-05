
export enum FeatureId {
    Seats = "seats",
    BallotType = "ballot-type",
    MajorityGuarantee = "majority-guarantee",
    Counting = "counting",
    Proportionality = "proportionality",
    VoterComplexity = "voter-complexity",
    TallyingComplexity = "tallying-complexity",
    BallotErrorHandling = "ballot-error-handling",
    SpoilerRisk = "spoiler-risk",
    StrategicPressure = "strategic-pressure",
    RepresentationStyle = "representation-style",
}

// === Item Enums for Each Feature Group ===
export enum SeatType {
    SingleWinner = "Single-winner",
    MultiWinner = "Multi-winner",
}

export enum BallotType {
    SingleChoice = "Single-choice",
    MultiChoice = "Multi-choice",
    Ranked = "Ranked",
    Scored = "Scored",
    Approval = "Approval",
    List = "List",
}

export enum MajorityGuarantee {
    Yes = "Yes",
    No = "No",
}

export enum CountingRule {
    Plurality = "Plurality",
    MajorityRunoff = "Majority runoff",
    Transferable = "Transferable",
    ProportionalFormula = "Proportional formula",
    PairwiseComparisons = "Pairwise comparisons",
    Scoring = "Scoring",
}

export enum Proportionality {
    Low = "Low",
    Medium = "Medium",
    High = "High",
}

export enum VoterComplexity {
    VeryLow = "Very low",
    Low = "Low",
    Moderate = "Moderate",
    High = "High",
}

export enum TallyingComplexity {
    Simple = "Simple",
    Moderate = "Moderate",
    Complex = "Complex",
}

export enum BallotErrorHandling {
    Strict = "Strict",
    Moderate = "Moderate",
    HighTolerance = "High tolerance",
}

export enum SpoilerRisk {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export enum StrategicPressure {
    High = "High",
    Medium = "Medium",
    Low = "Low",
}

export enum RepresentationStyle {
    Majoritarian = "Majoritarian",
    Proportional = "Proportional",
    Mixed = "Mixed",
}


export type FeatureItem = {
    label: string;   // could also be narrowed to specific enums
    detail?: string;
};

export type SystemFeature = {
    id: FeatureId;
    title: string;
    description?: string;
    items: FeatureItem[];
};


// A precise mapping from each FeatureId to the ONLY allowed enum for that feature.
export type FeatureChoices = {
    [FeatureId.Seats]: SeatType;
    [FeatureId.BallotType]: BallotType;
    [FeatureId.MajorityGuarantee]: MajorityGuarantee;
    [FeatureId.Counting]: CountingRule;
    [FeatureId.Proportionality]: Proportionality;
    [FeatureId.VoterComplexity]: VoterComplexity;
    [FeatureId.TallyingComplexity]: TallyingComplexity;
    [FeatureId.BallotErrorHandling]: BallotErrorHandling;
    [FeatureId.SpoilerRisk]: SpoilerRisk;
    [FeatureId.StrategicPressure]: StrategicPressure;
    [FeatureId.RepresentationStyle]: RepresentationStyle;
};
