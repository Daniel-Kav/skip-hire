import React from "react";

export type ProgressBarStep = {
  icon: React.ElementType;
  label: string;
};

interface ProgressBarProps {
  steps: ProgressBarStep[];
  activeStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, activeStep }) => (
  <nav className="flex items-center justify-between space-x-0 overflow-x-auto pb-2">
    {steps.map((step, idx) => {
      const isCompleted = idx < activeStep;
      const isActive = idx === activeStep;
      const Icon = step.icon;
      return (
        <div key={step.label} className="flex items-center">
          <div className={`flex items-center space-x-2 ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`}>
            <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${isActive ? 'text-blue-500' : isCompleted ? 'text-blue-700' : 'text-gray-500'}`}>{step.label}</span>
          </div>
          {idx !== steps.length - 1 && (
            <div className={`mx-2 w-8 h-0.5 ${isCompleted ? 'bg-blue-700' : isActive ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
          )}
        </div>
      );
    })}
  </nav>
);

export default ProgressBar;
