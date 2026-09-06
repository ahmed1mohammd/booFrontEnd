import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function OrderTimeline({ timeline = [] }) {
  const defaultSteps = [
    { title: 'Order Created', completed: true },
    { title: 'Payment Confirmed', completed: true },
    { title: 'Preparing Order', current: true },
    { title: 'Shipped', completed: false },
    { title: 'Delivered', completed: false }
  ];

  const steps = timeline.length > 0 ? timeline : defaultSteps;

  return (
    <div className="boo-timeline" aria-label="Order progress tracker">
      {steps.map((step, idx) => {
        const isCompleted = step.completed;
        const isCurrent = step.current;

        return (
          <div
            key={idx}
            className={`boo-timeline-step ${isCompleted ? 'is-completed' : ''} ${
              isCurrent ? 'is-current' : ''
            }`}
          >
            <div className="boo-timeline-node">
              {isCompleted ? (
                <Check size={18} />
              ) : isCurrent ? (
                <Clock size={18} />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <span className="boo-timeline-label">{step.title}</span>
            {step.time && (
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {step.time}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
