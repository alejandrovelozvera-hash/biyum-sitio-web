"use client";

import { forwardRef } from "react";
import { Project } from "@/types";
import ExhibitFull from "./ExhibitFull";
import ExhibitSplit from "./ExhibitSplit";
import ExhibitDiptych from "./ExhibitDiptych";
import ExhibitFloating from "./ExhibitFloating";

interface Props {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}

const ExhibitPiece = forwardRef<HTMLElement, Props>(
  ({ project, index, onSelect }, ref) => {
    const pattern = index % 4;

    const layouts = {
      0: ExhibitFull,
      1: ExhibitSplit,
      2: ExhibitDiptych,
      3: ExhibitFloating,
    };

    const Component = layouts[pattern as keyof typeof layouts];

    return (
      <div ref={ref as any}>
        <Component project={project} index={index} onSelect={onSelect} />
      </div>
    );
  }
);

ExhibitPiece.displayName = "ExhibitPiece";

export default ExhibitPiece;
